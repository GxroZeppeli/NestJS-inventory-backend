## Description

Simple backend on nestjs and sequelize for an inventory site with error-handling, filtering and sorting capabilities.

## Installation

```bash
$ npm install
```

Create `.env` file in root dir with _DB_USER_, _DB_PASSWORD_ and _DB_NAME_

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

`GET` _/products_ - returns a page of products, each page contains 10 products.

Query parameters:
- `page` - current page, 1 by default
- `sortColumn` - the column to sort by, one of: 'code', 'name', 'amount', 'weight', 'width', 'depth', 'height', 'category', 'material', '' by default
- `sortOrder` - sorting order, 'ASC' or 'DESC', 'ASC' by default
- `filterColumn` - the column to filter, one of: 'amount', 'weight', 'width', 'depth', 'height', '' by default
- `filterGtr` - greater than value for filtering, float min 0, 0 by default
- `filterLs` - less than value for filtering, float min 0, 0 by default
- `category` - filter by category, '' by default
- `search` - case-insensitive search for a substring in name or code, '' by default

`GET` _/products/pages_ - returns number of pages

Query parameters:
- `filterColumn` - the column to filter, one of: 'amount', 'weight', 'width', 'depth', 'height', '' by default
- `filterGtr` - greater than value for filtering, float min 0, 0 by default
- `filterLs` - less than value for filtering, float min 0, 0 by default
- `category` - filter by category, '' by default
- `search` - case-insensitive search for a substring in name or code, '' by default

`GET` _/products/id_ - returns product with specified id 

`POST` _/products_ - creates a new product, body should be an object with following properties:
```typescript
  @MinLength(3)
  code: string;

  @MinLength(3)
  name: string;

  @Min(0)
  amount: number;

  @IsPositive()
  weight: number;

  @IsPositive()
  width: number;

  @IsPositive()
  depth: number;

  @IsPositive()
  height: number;

  @IsEnum(categoryArray)
  category: string;

  material: string;
```

`PUT` _/products/id_ - updates an object with specified id, body should look like in POST 

`DELETE` _/products/id_ - removes a product with specified id from DB

## DB

Postgres query to create products table

```sql
create table products (
	id serial primary key,
	code varchar(64) unique,
	name varchar(128),
	amount integer,
	weight float,
	width float,
	depth float,
	height float,
	category varchar(64),
	material varchar(128)
);
```

