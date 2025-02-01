import { defineType } from 'sanity'

export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      readOnly: true,
      description: 'Unique identifier for the order'
    },
    {
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      readOnly: true
    },
    {
      name: 'customerInfo',
      title: 'Customer Info',
      type: 'object',
      fields: [
        { name: 'fullName', title: 'Full Name', type: 'string' },
        { name: 'email', title: 'E-Mail', type: 'string' },
        { name: 'phoneNumber', title: 'Phone Number', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' }
      ]
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'productId', title: 'Product ID', type: 'string' },
          { name: 'name', title: 'Product Name', type: 'string' },
          { name: 'quantity', title: 'Quantity', type: 'number' },
          { name: 'price', title: 'Price', type: 'number' },
          { name: 'selectedSize', title: 'Selected Size', type: 'string' },
          { name: 'selectedColor', title: 'Selected Color', type: 'string' }
        ]
      }]
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      description: 'Total order amount after discounts'
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'Card Payment', value: 'card' }
        ]
      }
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' }
        ]
      }
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime'
    },
    {
      name: 'cancelledAt',
      title: 'Cancelled At',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'cancelled'
    },
    {
      name: 'appliedPromo',
      title: 'Applied Promotion',
      type: 'object',
      fields: [
        {
          name: 'code',
          title: 'Promo Code',
          type: 'string'
        },
        {
          name: 'discount',
          title: 'Discount Percentage',
          type: 'number'
        }
      ]
    },
    {
      name: 'tracking',
      title: 'Tracking Information',
      type: 'object',
      fields: [
        {
          name: 'courier',
          title: 'Courier',
          type: 'string',
          options: {
            list: [
              { title: '17TRACK', value: '17track' },
              // Add other couriers as needed
            ]
          }
        },
        {
          name: 'trackingNumber',
          title: 'Tracking Number',
          type: 'string'
        },
        {
          name: 'shippedAt',
          title: 'Shipped At',
          type: 'datetime'
        }
      ]
    }
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerInfo.fullName',
      totalAmount: 'totalAmount',
      status: 'status',
      date: 'orderDate'
    },
    prepare(selection) {
      const { orderId, customerName, totalAmount, status, date } = selection;
      return {
        title: `Order ${orderId || 'Unknown'}`,
        subtitle: `${customerName} - PKR ${totalAmount?.toLocaleString()} - ${status}`,
        description: date ? new Date(date).toLocaleDateString() : 'No date'
      };
    }
  }
} 