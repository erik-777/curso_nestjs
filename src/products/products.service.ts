import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

  ) {

  }
  async create(createProductDto: CreateProductDto) {
    try {
     // if (!createProductDto.slug) createProductDto.slug = createProductDto.title.toLowerCase().replaceAll(' ', '_');
      const product = this.productsRepository.create(createProductDto);

      await this.productsRepository.save(product);

      return product;

    } catch (error) {

      this.handleException(error);
    }


  }


  async findAll() {
    try {
      const products = await this.productsRepository.find();
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Error getting products');
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product `;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  private handleException(error: any,) {



    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check service');
  }

}
