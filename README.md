# Musicmind backend v2

## Installation

```bash
#  install all required dependencies
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:development

# production mode
npm run start:production
```

## Linting

```bash
# run this to format code automatically
npm run lint
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Migrations

```bash
# Create a migration
npx prisma migrate dev --name "name of migration"

# Seed the database
npx prisma db seed

# Push the Prisma schema state to the database
npx prisma db push

# Browse your data
npx prisma studio

# Generate artifacts (e.g. Prisma Client)
npx prisma generate
```
