import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

@Schema()
export class Devices extends Document {
  @Factory((faker) => faker.name.fullName())
  @Prop()
  name: string;

  @Factory((faker) => faker.random.numeric(6))
  @Prop()
  price: number;

  @Factory((faker) => faker.random.numeric(8))
  @Prop()
  ip: string;

  @Factory((faker) => faker.name.fullName())
  @Prop()
  os: string;

  @Factory((faker) => faker.name.fullName())
  @Prop()
  ram: string;

  @Factory((faker) => faker.name.fullName())
  @Prop()
  cpu: string;

  @Factory((faker) => faker.name.fullName())
  @Prop()
  disk: string;
}

export const DevicesSchema = SchemaFactory.createForClass(Devices);
