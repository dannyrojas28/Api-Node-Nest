import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devices } from './schema/devices.seeder.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class DevicesSeeder implements Seeder {
  constructor(
    @InjectModel(Devices.name) private readonly device: Model<Devices>,
  ) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    const users = DataFactory.createForClass(Devices).generate(10);

    // Insert into the database.
    return this.device.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.device.deleteMany({});
  }
}
