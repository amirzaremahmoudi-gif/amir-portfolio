import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
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
    })
  }
})
