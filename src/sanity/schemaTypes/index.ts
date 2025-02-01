import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import category from './category'
import order from './order'
import customer from './customer'
import { deliverySchema } from './delivery'

export const schemaTypes = [product, category, order, customer, deliverySchema]
