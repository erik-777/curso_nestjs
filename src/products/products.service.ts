import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import { ProductImage } from './entities/image.product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource

  ) {

  }
  async create(createProductDto: CreateProductDto) {

    try {
      const { images = [], ...productDetails } = createProductDto;
      // if (!createProductDto.slug) createProductDto.slug = createProductDto.title.toLowerCase().replaceAll(' ', '_');
      const product = this.productsRepository.create({
        ...productDetails, images: images.map(image => this.productImageRepository.create({ url: `http://10.0.102.9:3000/api/v1/files/product/${image}` }))
      });

      await this.productsRepository.save(product);

      return {
        ...product, images
      };

    } catch (error) {

      this.handleException(error);
    }


  }


  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {

      const products = await this.productsRepository.find({
        take: limit,
        skip: offset,
        relations: {
          images: true,
        }
      });

      return products.map(product => ({
        ...product, images: product.images.map(img => img.url)
      }));

    } catch (error) {

      this.handleException(error);

    }
  }

  async findOne(term: string) {

    let product: Product;

    if (isUUID(term)) {

      product = await this.productsRepository.findOneBy({ id: term });

    } else {

      const queryBuilder = this.productsRepository.createQueryBuilder('product');

      product = await queryBuilder.where(`UPPER(title) =:title or slug =:slug`, { title: term.toUpperCase(), slug: term.toLowerCase() }).leftJoinAndSelect('product.images', 'prodImages').getOne();

    }

    if (!product) throw new BadRequestException(`Product with  ${term} not found`);

    return product;


  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest, images: images.map(image => image.url)
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {


    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productsRepository.preload({
      id,
      ...toUpdate
    });

    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    //create query runner


    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } })

        product.images = images.map(image => this.productImageRepository.create({ url: image }))



      }
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
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

  async deletaAllProducts() {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    try {

      return await queryBuilder
        .delete()
        .where({})
        .execute();

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
