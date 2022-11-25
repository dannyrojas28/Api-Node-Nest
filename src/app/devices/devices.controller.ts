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
  constructor(
    private readonly devicesService: DevicesService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Post()
  create(@Body() devicesDto: DevicesDto): object {
    return this.devicesService.create(devicesDto);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() devicesDto: DevicesDto): object {
    return this.devicesService.update(_id, devicesDto);
  }

  @Post('updateprice')
  getorupdate(@Body() { price, name }): object {
    return this.devicesService.updatePrice(price, name);
  }

  @Get()
  async findAll(
    @Query() query,
    @Query() paginationDto: PaginationDto,
  ): Promise<object> {
    let key = '';
    console.log(paginationDto?.limit);
    if (paginationDto?.limit) {
      key += '_limit' + paginationDto?.limit;
    }

    if (paginationDto?.skip) {
      key += '_skip' + paginationDto?.skip;
    }

    if (paginationDto?.name) {
      key += '_' + paginationDto?.name;
    }

    if (paginationDto?.cpu) {
      key += '_' + paginationDto?.cpu;
    }
    console.log(key);
    let data = await this.cache.get('getAll' + key);
    if (data) {
      return {
        data,
        FromRedis: 'this is loaded from redis cache',
      };
    } else {
      await this.cache.del('getAll');
    }
    if (!data) {
      data = await this.devicesService.GetAll(query, paginationDto);
      await this.cache.set('getAll' + key, data, 2000);
      return {
        data,
        FromRandomNumDbs: 'this is loaded from query',
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
