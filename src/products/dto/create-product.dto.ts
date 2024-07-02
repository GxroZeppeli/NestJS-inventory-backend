import { IsEnum, IsPositive, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(3, { message: 'Минимальная длина кода 3 символа' })
  code: string;

  @MinLength(3, { message: 'Минимальная длина названия 3 символа' })
  name: string;

  @Min(0, { message: 'Количество должно быть не меньше нуля' })
  amount: number;

  @IsPositive({ message: 'Вес должен быть больше нуля' })
  weight: number;

  @IsPositive({ message: 'Ширина должен быть больше нуля' })
  width: number;

  @IsPositive({ message: 'Глубина должна быть больше нуля' })
  depth: number;

  @IsPositive({ message: 'Высота должна быть больше нуля' })
  height: number;

  @IsEnum(['Болты', 'Шайбы', 'Трубы', 'Подшипники'], {
    message: 'Категорией может быть: Болты, Шайбы, Трубы, Подшипники',
  })
  category: string;

  material: string;
}
