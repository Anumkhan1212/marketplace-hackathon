export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Order to display categories in'
      },
      {
        name: 'isActive',
        title: 'Active',
        type: 'boolean',
        description: 'Is this category currently active?',
        initialValue: true
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image'
      }
    }
  } 