import { defineType } from 'sanity'

export const deliverySchema = defineType({
  name: 'delivery',
  title: 'Delivery',
  type: 'document',
  fields: [
    { name: 'zoneName', title: 'Delivery Zone Name', type: 'string' },
    { name: 'coverageAreas', title: 'Coverage Areas', type: 'array', of: [{ type: 'string' }] },
    { name: 'assignedDrivers', title: 'Assigned Drivers', type: 'array', of: [{ type: 'string' }] },
    { name: 'driverContactNumber', title: 'Driver Contact Number', type: 'string' },
    { name: 'etaDeliveryTime', title: 'ETA Delivery Time', type: 'datetime' },
  ],
}) 