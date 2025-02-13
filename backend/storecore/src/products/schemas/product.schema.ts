import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema'; 

export type ProductDocument = Product & Document;

@Schema({ timestamps: true }) 
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Buffer, required: false })
  photo: Buffer;


  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  user: Types.ObjectId | User; 
}

export const ProductSchema = SchemaFactory.createForClass(Product);