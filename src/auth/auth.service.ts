import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminService } from "src/admin/admin.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { LoginDto } from "src/admin/dto/login.dto";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { PassThrough } from "stream";
import { ref } from "process";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException(
        "Bunday email tizimdan ro'yxatdan o'tgan.Boshqa email kiriting"
      );
    }
    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin.id };
  }

  async login(loginDto: LoginDto) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki password xato");
    }
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Email yoki password xato");
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);

    // refresh_token ni alohida ustunga saqlash
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminRepo.save(admin);

    return {
      accessToken,
      refreshToken,
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
      },
    };
  }

  async refresh(req: Request, res: Response) {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY || "",
      });
      const admin = await this.adminService.findOne(payload.id);
      if (!admin || !admin.refresh_token) {
        throw new UnauthorizedException(
          "Admin topilmadi yoki refresh token yo'q"
        );
      }
      const isTokenValid = await bcrypt.compare(
        token,
        admin.refresh_token || ""
      );
      if (!isTokenValid) {
        throw new UnauthorizedException("Refresh token noto‘g‘ri");
      }
      const newAccessToken = await this.jwtService.signAsync(
        {
          id: admin.id,
          is_active: admin.is_active,
          is_creator: admin.is_creator,
        },
        {
          secret: process.env.ACCESS_TOKEN_KEY || "",
          expiresIn: process.env.ACCESS_TOKEN_TIME || "1d",
        }
      );
      const newRefreshToken = await this.jwtService.signAsync(
        {
          id: admin.id,
          is_active: admin.is_active,
          is_creator: admin.is_creator,
        },
        {
          secret: process.env.REFRESH_TOKEN_KEY || "",
          expiresIn: process.env.REFRESH_TOKEN_TIME || "7d",
        }
      );
      admin.refresh_token = await bcrypt.hash(newRefreshToken, 7);
      await this.adminRepo.save(admin);
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Refresh token noto‘g‘ri yoki eskirgan");
    }
  }

  async logout(refreshToken: string, res:Response){
    let adminData: any;
    try {
      adminData=await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
    }
    if(!adminData){
      throw new ForbiddenException("Admin not verified")
    }
    await this.adminService.updateRefreshToken(adminData.id, "")
    res.clearCookie("refreshToken");
    return {message: "Logged out successfully"}
  }

  async register(createUserDto: CreateUserDto){
    const candidate=await this.userRepo.findOneBy({email: createUserDto.email});
    if(candidate){
      throw new ConflictException("Bunday email mavjud")
    }
    const user=await this.userRepo.save(createUserDto)
    return {userId: user.id}
  }

  async userLogin(dto: LoginUserDto, res:Response){
    const user=await this.userRepo.findOneBy({
      email: dto.email
    })
    if(!user){
      throw new UnauthorizedException("Email topilmadi yoki noto'g'ri")
    }
    const isMatch=await bcrypt.compare(dto.password, 
      user.hashed_password
    );
    if(!isMatch){
      throw new UnauthorizedException("Email topilmadi yoki noto'g'ri");
    }
    const payload={
      id: user.id,
      email: user.email,
    }
    const accessToken=await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME
    })
    const refreshToken=await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY, 
      expiresIn: process.env.REFRESH_TOKEN_TIME
    })
    user.refresh_token=await bcrypt.hash(refreshToken, 7)
    await this.adminRepo.save(user)
    res.cookie("refreshToken", refreshToken, {httpOnly: true})
    return res.send({accessToken: accessToken, refreshToken: refreshToken})
  }

}
