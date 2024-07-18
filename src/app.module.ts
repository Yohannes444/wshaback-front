// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KenoModule } from './keno/keno.module';
import { AnimeHorsModule } from './anime-hors/anime-hors.module';
import { AnimeDogModule } from './anime-dog/anime-dog.module';
import { GrayhornModule } from './grayhorn/grayhorn.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { ResaltModule } from './resalt/resalt.module';
import { GrayhornResulatModule } from './grayhorn-resulat/grayhorn-resulat.module';
import { IpService } from './ip.service'; // Add this import
import { KenoRsultModule } from './keno-rsult/keno-rsult.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      }),
    }),
    GrayhornModule,
    AnimeDogModule,
    AnimeHorsModule,
    KenoModule,
    AuthModule,
    ResaltModule,
    GrayhornResulatModule,
    KenoRsultModule
  ],
  controllers: [AppController],
  providers: [AppService, IpService], // Add IpService to providers
})
export class AppModule {}
