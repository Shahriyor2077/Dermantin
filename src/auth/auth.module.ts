import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "src/admin/admin.module";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admin/entities/admin.entity";
import { User } from "../user/entities/user.entity";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User]),
    JwtModule.register({}),
    AdminModule,
    UserModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
