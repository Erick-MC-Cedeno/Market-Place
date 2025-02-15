import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create.product.dto';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const user = await this.userModel.aggregate([
        { $match: { email: createProductDto.email } },
        { $project: { _id: 1, email: 1 } },
      ]);
      if (!user || user.length === 0) {
        throw new NotFoundException('Usuario no encontrado.');
      }
      let base64Image: string;
      if (Buffer.isBuffer(createProductDto.photo)) {
        base64Image = createProductDto.photo.toString('base64');
      }
      else if (typeof createProductDto.photo === 'string') {
        base64Image = createProductDto.photo;
      } else {
        throw new InternalServerErrorException(
          'Formato de imagen no válido. La imagen debe ser un Buffer o una cadena en base64.'
        );
      }
      const product = new this.productModel({
        name: createProductDto.name,
        photo: base64Image,
        user: user[0]._id,
        category: createProductDto.category, 
      });
      await product.save();
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto: ' + error.message);
    }
  }

  async getAllProducts(): Promise<any[]> {
    try {
      const products = await this.productModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            name: 1,
            photo: 1,
            createdAt: 1,
            updatedAt: 1,
            category: 1, 
          },
        },
      ]);
      if (!products || products.length === 0) {
        return [{ message: 'Aún no hay productos.' }];
      }
      const productData = products.map((product) => ({
        name: product.name,
        photo: `data:image/jpeg;base64,${product.photo}`,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        category: product.category, 
      }));
      return productData;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos: ' + error.message);
    }
  }
}