import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const workSchema = z.object({
  title: z.string(),
  description: z.string(),
  year: z.string(),
  role: z.string(),
  category: z.string(),
  order: z.number(),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  coverTone: z.enum(['clay', 'sage', 'cobalt', 'sand', 'graphite']),
  metric: z.string().optional(),
  timeline: z.string(),
  team: z.string(),
  industry: z.string(),
  responsibilities: z.array(z.string())
})

export default defineContentConfig({
  collections: {
    work_en: defineCollection({
      type: 'page',
      source: { include: 'en/work/*.md', prefix: '/work' },
      schema: workSchema
    }),
    work_fa: defineCollection({
      type: 'page',
      source: { include: 'fa/work/*.md', prefix: '/work' },
      schema: workSchema
    })
  }
})
