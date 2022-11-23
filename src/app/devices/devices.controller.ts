import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  CACHE_MANAGER,
  UseInterceptors,
  CacheInterceptor,
  Inject,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesDto } from './dto/devices.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Cache } from 'cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('devices')
export class DevicesController {
  //This would be our dummy database since we won't be connecting to a database in the article
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(
    private readonly devicesService: DevicesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body() devicesDto: DevicesDto): object {
    return this.devicesService.create(devicesDto);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() devicesDto: DevicesDto): object {
    return this.devicesService.update(_id, devicesDto);
  }

  @Get()
  async findAll(
    @Query() query,
    @Query() paginationDto: PaginationDto,
  ): Promise<object> {
    let data = await this.cacheManager.get('getAll');
    if (data) {
      return {
        data,
        FromRedis: 'this is loaded from redis cache',
      };
    }

    if (!data) {
      data = this.devicesService.GetAll(query, paginationDto);
      await this.cacheManager.set('getAll', data);
      return {
        data,
        FromRandomNumDbs: 'this is loaded from randomNumDbs',
      };
    }
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
