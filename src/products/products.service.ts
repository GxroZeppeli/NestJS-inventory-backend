import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { GetProductsDto } from './dto/get-products.dto';
import { Op } from 'sequelize';
import { GetProductPagesDto } from './dto/get-product-pages.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  pageSize = 10;

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.findOne({
      where: { code: createProductDto.code },
    });

    if (product) {
      throw new BadRequestException('Изделие с таким кодом уже существует');
    }

    return this.productModel.create({
      ...createProductDto,
    });
  }

  findAll({
    page = 1,
    sortColumn = '',
    sortOrder = 'ASC',
    filterColumn = '',
    filterGtr = 0,
    filterLs = 0,
    category = '',
  }: GetProductsDto) {
    const query = {
      limit: this.pageSize,
      offset: (page - 1) * this.pageSize,
    };

    if (sortColumn) {
      query['order'] = [[sortColumn, sortOrder]];
    }

    if (filterColumn) {
      const filterOpts = {};
      if (filterGtr) filterOpts[Op.gt] = filterGtr;
      if (filterLs) filterOpts[Op.lt] = filterLs;
      query['where'] = {
        [filterColumn]: filterOpts,
      };
    }

    if (category) {
      query['where'] = { category };
    }

    return this.productModel.findAndCountAll(query);
  }

  async getProductPages({
    filterColumn = '',
    filterGtr = 0,
    filterLs = 0,
    category = '',
  }: GetProductPagesDto) {
    const query = {};

    if (filterColumn) {
      const filterOpts = {};
      if (filterGtr) filterOpts[Op.gt] = filterGtr;
      if (filterLs) filterOpts[Op.lt] = filterLs;
      query['where'] = {
        [filterColumn]: filterOpts,
      };
    }

    if (category) {
      query['where'] = { category };
    }

    return Math.ceil((await this.productModel.count(query)) / this.pageSize);
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOne({
      where: { code: updateProductDto.code },
    });

    if (product.id !== +id) {
      throw new BadRequestException('Изделие с таким кодом уже существует');
    }

    return this.productModel.update(updateProductDto, {
      where: { id },
    });
  }

  remove(id: string) {
    return this.productModel.destroy({ where: { id } });
  }
}
