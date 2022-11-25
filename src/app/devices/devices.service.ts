import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { DevicesDto } from './dto/devices.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Devices, DevicesDoc, DevicesModel } from './schema/device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Devices.name) private devicesModel: DevicesModel,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async GetById(_id: string): Promise<object> {
    return await this.devicesModel.findOne({ _id });
  }

  async updatePrice(price: number, name: string): Promise<object> {
    console.log(price);
    return await this.devicesModel.updateMany(
      { price: { $gt: price } },
      {
        $set: {
          name,
        },
      },
    );
  }

  async GetAll(
    queryParams: any,
    paginationDto: PaginationDto,
  ): Promise<Devices[]> {
    const limit = paginationDto.limit;
    const skip = paginationDto.skip;
    delete queryParams?.skip;
    delete queryParams?.limit;

    const query = await this.devicesModel
      .find(queryParams)
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip)
      .setOptions({ sanitizeFilter: true });

    return query;
  }

  async create(devicesDto: DevicesDto): Promise<object> {
    const deviceData = {
      ...devicesDto,
    };
    this.cache.del('getAll_' + devicesDto.name);
    const device = this.devicesModel.build(deviceData, this.devicesModel);
    return await device.save();
  }

  async update(_id: string, devicesDto: DevicesDto): Promise<object> {
    const device: DevicesDoc = await this.devicesModel.findOne({ _id });

    if (device) {
      device.name = devicesDto.name;
      device.ip = devicesDto.ip;
      device.disk = devicesDto.disk;
      device.os = devicesDto.os;
      device.price = devicesDto.price;
      device.cpu = devicesDto.cpu;
      device.ram = devicesDto.ram;
      return await device.save();
    }
    return device;
  }

  async DeleteById(_id): Promise<object> {
    const device = await this.devicesModel.deleteOne({
      _id: _id,
    });
    return device;
  }
}
