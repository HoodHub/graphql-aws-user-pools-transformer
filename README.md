graphql-aws-user-pools-transformer
========================

A custom graphql transformer for the amplify-cli. Adds the `@aws_cognito_user_pools` directive to
all objects in the output schema.

## Motivation

AppSync supports multiple authorization providers, but ino order to use a cognito user pool
as an additional authorization provider you must add the `@aws_cognito_user_pools` directive
to each object in the schema.

This can be a problem when using amplify-cli, since some of the default transformations
introduce new objects into the schema. The purpose of this transformer is to add the
`@aws_cognito_user_pools` directive to all the objects in the final schema.

## Usage

### 1. Install package

```
npm install graphql-aws-user-pools-transformer -D
```

or

```
yarn add graphql-aws-user-pools-transformer -D
```

### 2. Setup custom transformer

Edit `amplify/backend/api/<YOUR_API>/transform.conf.json` and append
`"./graphql-aws-user-pools-transformer"` to `transformers` field.

```
    "transformers": [
      "graphql-aws-user-pools-transformer"
    ]
```

### 3. Export NODE_PATH

This step isn't necessary once https://github.com/aws-amplify/amplify-cli/pull/3236 merged.

```
export NODE_PATH=./node_modules
```
