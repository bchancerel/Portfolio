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

    experiences: defineCollection({
      type: 'page',
      source: 'experiences/*.md',
      schema: z.object({
        title: z.string(),
        company: z.string().optional(),
        logo: z.string().optional(),
        location: z.string().optional(),
        duration: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),      
        stack: z.array(z.string()).optional()
      })
    })
  }
})
