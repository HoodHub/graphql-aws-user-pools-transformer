import {Kind, ObjectTypeDefinitionNode} from 'graphql'
import {Transformer, TransformerContext, gql} from 'graphql-transformer-core'
import {makeDirective} from 'graphql-transformer-common'

const userPoolDirective = makeDirective('aws_cognito_user_pools', [])

export class AwsUserPoolsTransformer extends Transformer {
  constructor() {
    super(
      'AwsUserPoolsTransformer',
      gql`
        directive @not_a_real_directive on OBJECT # dummy directive, we just process all objects
      `
    )
  }

  public after = (ctx: TransformerContext): void => {
    const objects = ctx.getTypeDefinitionsOfKind(Kind.OBJECT_TYPE_DEFINITION) as ObjectTypeDefinitionNode[]
    objects.forEach((o) => {
      const directives = o.directives || []
      if (!directives.find((d) => d.name.value === userPoolDirective.name.value)) {
        ctx.updateObject({
          ...o,
          directives: [...directives, userPoolDirective],
        })
      }
    })
  }
}
