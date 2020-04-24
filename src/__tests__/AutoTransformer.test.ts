import {ObjectTypeDefinitionNode, parse, Kind} from 'graphql'
import {GraphQLTransform} from 'graphql-transformer-core'
import {AwsUserPoolsTransformer} from '../AwsUserPoolsTransformer'
import {DynamoDBModelTransformer} from 'graphql-dynamodb-transformer'

function directiveNames(o: ObjectTypeDefinitionNode): string[] {
  return o.directives?.map((d) => d.name.value) ?? []
}

function expectDirective(o: ObjectTypeDefinitionNode): void {
  expect(directiveNames(o)).toEqual(expect.arrayContaining(['aws_cognito_user_pools']))
}

test('adds @aws_cognito_user_pools directive to every object in the final schema', () => {
  const validSchema = `
    type Post @model {
        id: ID!
        title: String!
        createdAt: String!
    }
    `

  const transformer = new GraphQLTransform({
    transformers: [new DynamoDBModelTransformer(), new AwsUserPoolsTransformer()],
  })

  const out = transformer.transform(validSchema)

  expect(out).toBeDefined()

  const schemaDoc = parse(out.schema)
  const objs = schemaDoc.definitions.filter((d) => d.kind === Kind.OBJECT_TYPE_DEFINITION) as ObjectTypeDefinitionNode[]
  objs.forEach(expectDirective)
})
