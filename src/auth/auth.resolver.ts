import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { LoginDto } from "src/admin/dto/login.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { Response, Request } from "express";
import {
  AuthResponse,
  LoginAdminResponse,
  LoginUserResponse,
  MessageResponse,
  RegistrationResponse,
} from "./types/auth.types";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegistrationResponse)
  async registerAdmin(@Args("createAdminDto") createAdminDto: CreateAdminDto) {
    return this.authService.registration(createAdminDto);
  }

  @Mutation(() => LoginAdminResponse)
  async loginAdmin(
    @Args("loginDto") loginDto: LoginDto,
    @Context() context: { res: Response }
  ) {
    const result = await this.authService.login(loginDto, context.res);
    return result;
  }

  @Mutation(() => AuthResponse)
  async refreshAdmin(@Context() context: { req: Request; res: Response }) {
    return this.authService.refresh(context.req, context.res);
  }

  @Mutation(() => MessageResponse)
  async logoutAdmin(
    @Args("refreshToken") refreshToken: string,
    @Context() context: { res: Response }
  ) {
    return this.authService.logout(refreshToken, context.res);
  }

  @Mutation(() => RegistrationResponse)
  async registerUser(@Args("createUserDto") createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Mutation(() => LoginUserResponse)
  async loginUser(
    @Args("loginUserDto") loginUserDto: LoginUserDto,
    @Context() context: { res: Response }
  ) {
    const result = await this.authService.userLogin(loginUserDto, context.res);
    return result;
  }

  @Mutation(() => AuthResponse)
  async refreshUser(@Context() context: { req: Request; res: Response }) {
    return this.authService.userRefresh(context.req, context.res);
  }

  @Mutation(() => MessageResponse)
  async userLogout(
    @Args("refreshToken") refreshToken: string,
    @Context() context: { res: Response }
  ) {
    return this.authService.userLogout(refreshToken, context.res);
  }
}
