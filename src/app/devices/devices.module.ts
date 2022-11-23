import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Devices, DevicesSchema } from './schema/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Devices.name, schema: DevicesSchema }]),
    CacheModule.register(),
  ],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class DevicesModule {}
