import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesDto } from './dto/devices.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() devicesDto: DevicesDto): object {
    return this.devicesService.create(devicesDto);
  }

  @Patch(':id')
  UpdateById(
    @Param(':id') _id: number,
    @Body() devicesDto: DevicesDto,
  ): object {
    return this.devicesService.update(_id, devicesDto);
  }

  @Get()
  GetAll(@Query() paginationDto: PaginationDto): object {
    return this.devicesService.GetAll(paginationDto);
  }

  @Get(':id')
  GetById(@Param(':id') _id: number): object {
    return this.devicesService.GetById(_id);
  }

  @Delete(':id')
  DeleteById(@Param('id') _id: string): object {
    return this.devicesService.DeleteById(_id);
  }
}
