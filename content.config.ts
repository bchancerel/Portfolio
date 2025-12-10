import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        intro: z.string().optional()
      })
    }),

    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        techs: z.array(z.string()).optional(),
        featured: z.boolean().default(false)
      })
    }),

    experience: defineCollection({
      type: 'page',
      source: 'experience/*.md',
      schema: z.object({
        title: z.string(),
        company: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        location: z.string().optional()
      })
    })
  }
})
