import { defineConfig as composer } from '@prisma/composer/config';
import { prismaCloud, prismaState } from '@prisma/composer-prisma-cloud/control';
import { nextjsBuild } from '@prisma/composer/nextjs/control';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';
import { definePrismaConfig } from 'prisma/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: './src/prisma/contract.prisma',
    db: { connection: process.env.DATABASE_URL ?? '' },
    migrations: { dir: 'migrations' },
  }),
  composer: composer({
    entry: './module.mjs',
    extensions: [prismaCloud(), nextjsBuild()],
    state: prismaState(),
  }),
});
