import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() getProductsDto: GetProductsDto) {
    return this.productsService.findAll(getProductsDto);
  }

  @Get('pages')
  getProductPages() {
    return this.productsService.getProductPages();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    try {
      return this.productsService.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    try {
      return this.productsService.remove(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
