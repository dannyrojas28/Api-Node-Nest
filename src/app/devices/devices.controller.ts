import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesDto } from './dto/devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() devicesDto: DevicesDto): object {
    return this.devicesService.create(devicesDto);
  }

  @Put()
  update(@Body() devicesDto: DevicesDto): object {
    return this.devicesService.update(devicesDto);
  }

  @Get()
  getAll(): object {
    return this.devicesService.get();
  }

  @Get(':id')
  get(@Param(':id') _id: number): object {
    return this.devicesService.get();
  }

  @Delete(':id')
  delete(@Param('id') _id: string): object {
    return this.devicesService.delete(_id);
  }
}
