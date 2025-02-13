import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
import { Product } from '../../products/schemas/product.schema';


@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];

    _id?: string; 

    @Prop()
    token: string;

    @Prop({ default: false })
    isValid: boolean;

    @Prop({ default: false })
    isTokenEnabled: boolean;
    
}

export const UserSchema = SchemaFactory.createForClass(User);
