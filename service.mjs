import { compute } from '@prisma/composer-prisma-cloud';
import { dataContract, postgres } from '@prisma/composer-prisma-cloud/orm';
import nextjsBuild from '@prisma/composer/nextjs';
import contractJson from './src/prisma/contract.json' with { type: 'json' };

const orm = dataContract(contractJson);

const web = compute({
  name: 'web',
  deps: { db: postgres(orm) },
  build: nextjsBuild({ module: import.meta.url, appDir: '.' }),
});

export { orm };
export default web;
