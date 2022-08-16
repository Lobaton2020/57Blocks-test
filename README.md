
# 57Blocks-test app
    This is an application of test for the position as a backend developer.
    This project is about basic CRUD of restaurants using the framework Nest Js as a API REST.

## Installation in the local machine

```bash
$ git clone https://github.com/Lobaton2020/57Blocks-test.git
```
```bash
$ npm i
```
## Set the file .env with the next varibles of enviroment and ask for the file

```env
HTTP_PORT=3000
JWT_SECRET_KEY=...
JWT_TIME_EXPIRES_SECONDS=1200

MONGODB_URI=mongodb+srv://.../?retryWrites=true&w=majority
MONGODB_USER=Test
MONGODB_PASSWORD=...
MONGODB_NAME=test

RANDOM_URL_API=https://randommer.io/Number?range=range&LowerRange=1&HigherRange=1000000&X-Requested-With=XMLHttpRequest
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Run pipeline Github Actions - AWS - ECS
    - You just need upload the new changes to the `master` branch with a PR or directly doing push
    - When you do a push contact to the owner to the the new IP public to access at the cointainer in AWS ECS.

## License

Nest is [MIT licensed](LICENSE).
