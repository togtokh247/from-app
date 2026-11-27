import type { ComputeService } from '@prisma/composer-prisma-cloud';
import type { PostgresContract, postgres } from '@prisma/composer-prisma-cloud/orm';
import type { Contract } from './src/prisma/contract';

type Orm = PostgresContract<Contract>;

declare const web: ComputeService<
  { db: ReturnType<typeof postgres<Orm>> },
  undefined,
  Record<never, never>
>;

declare const orm: Orm;

export { orm };
export default web;
