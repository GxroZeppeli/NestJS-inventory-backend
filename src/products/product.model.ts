import { Column, DataType, Model, Unique, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @Unique
  @Column
  code: string;

  @Column
  name: string;

  @Column
  amount: number;

  @Column(DataType.FLOAT)
  weight: number;

  @Column(DataType.FLOAT)
  width: number;

  @Column(DataType.FLOAT)
  depth: number;

  @Column(DataType.FLOAT)
  height: number;

  @Column
  category: string;

  @Column
  material: string;
}
