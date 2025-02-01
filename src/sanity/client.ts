import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'cgs9np6q',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
}) 