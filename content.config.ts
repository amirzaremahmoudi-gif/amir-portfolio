import { join } from 'node:path'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const contentRoot = join(process.cwd(), 'content')

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
      source: { cwd: join(contentRoot, 'en/work'), include: 'toranj-insurance.md', prefix: '/work' },
      schema: workSchema
    }),
    work_fa: defineCollection({
      type: 'page',
      source: { cwd: join(contentRoot, 'fa/work'), include: 'toranj-insurance.md', prefix: '/work' },
      schema: workSchema
    })
  }
})
