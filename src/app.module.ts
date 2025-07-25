import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "process";
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CategoryModule } from "./category/category.module";
import { DermantinImageModule } from "./dermantin_image/dermantin_image.module";
import { HistoryModule } from "./history/history.module";
import { RequestModule } from "./request/request.module";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { DermantinModule } from "./dermantin/dermantin.module";
import { AdvertisementsModule } from "./advertisements/advertisements.module";
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { StoreModule } from './store/store.module';
import { SocialsModule } from './socials/socials.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<string>("DB_CONNECTION") as "postgres",
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    UserModule,
    CategoryModule,
    DermantinImageModule,
    HistoryModule,
    RequestModule,
    AuthModule,
    AdminModule,
    DermantinModule,
    AdvertisementsModule,
    ChatModule,
    MessageModule,
    StoreModule,
    SocialsModule,
    ReviewModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
