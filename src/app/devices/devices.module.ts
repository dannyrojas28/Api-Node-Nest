import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Devices, DevicesSchema } from './schema/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Devices.name, schema: DevicesSchema }]),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
