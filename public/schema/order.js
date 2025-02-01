export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'orderNumber',
        title: 'Order Number',
        type: 'string',
      },
      {
        name: 'customer',
        title: 'Customer',
        type: 'reference',
        to: [{ type: 'user' }],
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'productId', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'quantity', type: 'number' },
              { name: 'price', type: 'number' },
              { name: 'selectedSize', type: 'string' },
              { name: 'selectedColor', type: 'string' }
            ]
          }
        ]
      },
      {
        name: 'shippingInfo',
        title: 'Shipping Information',
        type: 'object',
        fields: [
          { name: 'fullName', type: 'string' },
          { name: 'email', type: 'string' },
          { name: 'phone', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'city', type: 'string' },
          { name: 'postalCode', type: 'string' },
          { name: 'country', type: 'string' }
        ]
      },
      {
        name: 'total',
        title: 'Total Amount',
        type: 'number'
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: [
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
          ]
        },
        initialValue: 'pending'
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: (new Date()).toISOString()
      }
    ]
  }