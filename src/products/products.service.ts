import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import { validate as isUUID } from 'uuid';

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


  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    
    try {
      
      const products = await this.productsRepository.find({
        take: limit,
        skip: offset
      });
      
      return products;
    
    } catch (error) {

      this.handleException(error);

    }
  }

  async findOne(term: string) {

    let product: Product;

    if (isUUID(term)) {

      product = await this.productsRepository.findOneBy({ id: term });

    } else {

      const queryBuilder = this.productsRepository.createQueryBuilder()

      product = await queryBuilder.where(`UPPER(title) =:title or slug =:slug`, { title: term.toUpperCase(), slug: term.toLowerCase() }).getOne();

    }

    if (!product) throw new BadRequestException(`Product with  ${term} not found`);

    return product;


  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto
    });

    if (!product) throw new NotFoundException(`Product with  ${id} not found`);

    try {
      await this.productsRepository.save(product);

      return product;

    } catch (error) {
      this.handleException(error);
    }


  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);

      await this.productsRepository.remove(product);

    } catch (error) {

      this.handleException(error);
    }
  }
  private handleException(error: any,) {

    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check service');
  }

}
