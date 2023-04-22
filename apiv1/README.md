# TODO App API

version 1

## Environment variables

For development, place these in .env -file

INVITATION_CODE_SECRET

List of invitation codes for registering a new user, for exampmle: secret,password,silly

SECRET_COOKIE_KEY

Generate a secret used in cookie security

    npx fastify-secure-session > secret-key
    node session_key_to_env.js

## Development

    npm install
    npm run dev

Initial password for admin is ... admin

## Testing

test.http has sample requests for vscode rest client.

Turn cookies off or edit ~/.rest-client/cookie.json as you please.

# Fastify

https://www.youtube.com/watch?v=Lk-uVEVGxOA

## Plugins

https://github.com/fastify/fluent-json-schema

session https://github.com/fastify/fastify-secure-session
that uses this https://github.com/fastify/fastify-cookie

validate required environment variables
https://dev.to/olen_d/how-to-access-dotenv-variables-using-fastify-env-plugin-2i34

## Typescript, Nodemon

https://medium.com/sharenowtech/fastify-with-typescript-production-ready-integration-2303318ecd9e

# Other libraries

Safer password hash than bcrypt https://github.com/ranisalt/node-argon2

# Publishing

If using your own server, setup your environment variables, and

    npm install
    npm build
    docker-compose up --build -d

Other options

https://www.fastify.io/docs/latest/Guides/Serverless/#add-a-dockerfile
