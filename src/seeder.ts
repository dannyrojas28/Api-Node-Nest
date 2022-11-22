import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Devices,
  DevicesSchema,
} from './app/seeders/schema/devices.seeder.schema';
import { DevicesSeeder } from './app/seeders/devices.seeder';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD + '@' + process.env.DB_HOST + process.env.DB
      }`,
    ),
    MongooseModule.forFeature([{ name: Devices.name, schema: DevicesSchema }]),
  ],
}).run([DevicesSeeder]);
