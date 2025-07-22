import { ObjectType, Field, InputType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class AdminData {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  full_name: string;

  @Field()
  is_active: boolean;

  @Field()
  is_creator: boolean;
}

@ObjectType()
export class UserData {
  @Field()
  id: number;

  @Field()
  email: string;
}

@ObjectType()
export class LoginAdminResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => AdminData)
  admin: AdminData;
}

@ObjectType()
export class LoginUserResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserData)
  user: UserData;
}

@ObjectType()
export class MessageResponse {
  @Field()
  message: string;
}

@ObjectType()
export class RegistrationResponse {
  @Field({ nullable: true })
  adminId?: number;

  @Field({ nullable: true })
  userId?: number;
}
