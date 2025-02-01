import { defineType, Rule } from 'sanity'

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string'
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'defaultShipping',
      title: 'Default Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'string'
        },
        {
          name: 'city',
          title: 'City',
          type: 'string'
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string'
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string'
        }
      ]
    },
    {
      name: 'orders',
      title: 'Orders',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'order' }] }]
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email'
    }
  }
}) 