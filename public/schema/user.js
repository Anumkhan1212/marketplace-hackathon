export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'fullName',
        title: 'Full Name',
        type: 'string'
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'supabaseId',
        title: 'Supabase ID',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string'
      },
      {
        name: 'address',
        title: 'Address',
        type: 'object',
        fields: [
          {
            name: 'street',
            title: 'Street',
            type: 'string'
          },
          {
            name: 'city',
            title: 'City',
            type: 'string'
          },
          {
            name: 'state',
            title: 'State',
            type: 'string'
          },
          {
            name: 'zipCode',
            title: 'ZIP Code',
            type: 'string'
          },
          {
            name: 'country',
            title: 'Country',
            type: 'string'
          }
        ]
      }
    ]
  }