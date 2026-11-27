import { appRoot } from '@prisma/composer';
import { postgres } from '@prisma/composer-prisma-cloud/orm';
import web, { orm } from './service.mjs';

export default appRoot('from-app', ({ provision }) => {
  const db = provision(postgres({ name: 'db', contract: orm, config: './prisma.config.ts' }));
  provision(web, { deps: { db } });
});
