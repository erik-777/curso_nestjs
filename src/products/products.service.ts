import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


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

    const product = await this.productsRepository.findOneBy({ term });
    if (!product) throw new BadRequestException(`Product with id: ${term} not found`);
    return product;


  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product `;
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
