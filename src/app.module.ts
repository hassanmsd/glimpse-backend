import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    // Step 1: Load .env file and make ConfigService globally available
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Step 2: Use async config to read env values
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          sslmode: 'require',
        },
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      }),
    }),

    LeadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
