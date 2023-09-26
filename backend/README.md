# Nest.js / GraphQL / Mongo

A nestjs server with the following features:
- `graph-ql` api
- `JWT` Authentication
- `Role` based Authorization
- `User` service
- `Asset` service

## Instructions
First create `.env` file
```bash
touch .env
```

Then, Fill it with the following:
```bash
DATABASE_URL=""
JWT_SECRET=""
JWT_EXPIRATION="24h"
SALT_ROUND="8"
```

## Run
```
npm run install
npm run start:dev
```

## Todo
- Add `refresh-token`

## License
This work belongs to Tomer Shalev. If you want to use it, you will have to
be granted a permission. Opinions are my own.