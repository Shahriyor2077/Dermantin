import { Module } from '@nestjs/common';
import { DermantinImageService } from './dermantin_image.service';
import { DermantinImageController } from './dermantin_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DermantinImage } from './entities/dermantin_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DermantinImage])],
  controllers: [DermantinImageController],
  providers: [DermantinImageService],
})
export class DermantinImageModule {}
