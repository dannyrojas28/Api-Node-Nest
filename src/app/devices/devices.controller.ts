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
  update(@Param('id') _id: string, @Body() devicesDto: DevicesDto): object {
    return this.devicesService.update(_id, devicesDto);
  }

  @Get()
  findAll(@Query() query, @Query() paginationDto: PaginationDto): object {
    return this.devicesService.GetAll(query, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): object {
    return this.devicesService.GetById(id);
  }

  @Delete(':id')
  remove(@Param('id') _id: string): object {
    return this.devicesService.DeleteById(_id);
  }
}
