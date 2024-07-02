import { IsInt, Min, IsOptional, IsEnum, IsDecimal } from 'class-validator';

const sortColumns = [
  'code',
  'name',
  'amount',
  'weight',
  'width',
  'depth',
  'height',
  'category',
  'material',
];
const filterColumns = ['amount', 'weight', 'width', 'depth', 'height'];
const categories = ['Болты', 'Шайбы', 'Трубы', 'Подшипники'];

export class GetProductsDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  page: number;

  @IsEnum(sortColumns)
  @IsOptional()
  sortColumn: string;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  sortOrder: string;

  @IsEnum(filterColumns)
  @IsOptional()
  filterColumn: string;

  @IsDecimal()
  @Min(0)
  @IsOptional()
  filterGtr: number;

  @IsDecimal()
  @Min(0)
  @IsOptional()
  filterLs: number;

  @IsOptional()
  @IsEnum(categories)
  category: string;
}
