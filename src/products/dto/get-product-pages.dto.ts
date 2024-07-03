import { Min, IsOptional, IsEnum, IsDecimal } from 'class-validator';

const filterColumns = ['amount', 'weight', 'width', 'depth', 'height'];
const categories = ['Болты', 'Шайбы', 'Трубы', 'Подшипники'];

export class GetProductPagesDto {
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

  @IsOptional()
  search: string;
}
