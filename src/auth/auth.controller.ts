import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { LoginDto } from "src/admin/dto/login.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin/register")
  registerAdmin(@Body() dto: CreateAdminDto) {
    return this.authService.registration(dto);
  }

  @Post("admin/login")
  loginAdmin(@Body() dto: LoginDto, @Res() res: Response) {
    return this.authService.login(dto, res);
  }

  @Post("admin/refresh")
  refreshAdmin(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post("admin/logout")
  logoutAdmin(
    @Body("refreshToken") refreshToken: string,
    @Res() res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @Post("user/register")
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post("user/login")
  loginUser(@Body() dto: LoginUserDto, @Res() res: Response) {
    return this.authService.userLogin(dto, res);
  }

  @Post("user/refresh")
  userRefresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.userRefresh(req, res);
  }

  @Post("user/logout")
  userLogout(@Body("refreshToken") refreshToken: string, @Res() res: Response) {
    return this.authService.userLogout(refreshToken, res);
  }
}
