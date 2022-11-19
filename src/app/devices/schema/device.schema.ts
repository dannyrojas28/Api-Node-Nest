import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

interface DevicesAttrs {
  name: string;
  price: number;
  ip: string;
  os: string;
  ram: string;
  cpu: string;
  disk: string;
}

export interface DevicesDoc extends Document {
  name: string;
  price: number;
  ip: string;
  os: string;
  ram: string;
  cpu: string;
  disk: string;
}

export interface DevicesModel extends mongoose.Model<DevicesDoc> {
  build(attrs: DevicesAttrs, InstancedModel: DevicesModel): DevicesDoc;
}

@Schema({
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Devices {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  os: string;

  @Prop({ required: true })
  ram: string;

  @Prop({ required: true })
  cpu: string;

  @Prop({ required: true })
  disk: string;
}

export const DevicesSchema = SchemaFactory.createForClass(Devices);

DevicesSchema.statics.build = (
  attrs: DevicesAttrs,
  InstancedModel: DevicesModel,
) => {
  return new InstancedModel(attrs);
};
