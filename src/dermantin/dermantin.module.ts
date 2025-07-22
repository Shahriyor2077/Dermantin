import { Module } from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { DermantinController } from "./dermantin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { Category } from "src/category/entities/category.entity";
import { DermantinImage } from "src/dermantin_image/entities/dermantin_image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dermantin, Category, DermantinImage])],
  controllers: [DermantinController],
  providers: [DermantinService],
})
export class DermantinModule {}
