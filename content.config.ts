import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
      })
    }),

    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        techs: z.array(z.string()).optional(),
        images: z.string().optional(),
        date: z.string().optional(),
        links: z.object({
          demo: z.string().optional(),
          repo: z.string().optional()
        }).optional(),
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
    }),

    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        location: z.string().optional(),
        available: z.boolean().optional(),
        stack_dev: z.array(z.string()).optional(),
        stack_qa: z.array(z.string()).optional(),
        languages: z.array(z.string()).optional(),
        outils: z.array(z.string()).optional(),
        links: z.object({
          github: z.string().optional(),
          linkedin: z.string().optional(),
        }).optional(),
      }),
    }),

    contact: defineCollection({
      type: 'data',
      source: 'contact.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        email: z.string().email().optional(),
        links: z.object({
          github: z.string().url().optional(),
          linkedin: z.string().url().optional(),
        }).optional(),
      }),
    }),

    mentionsLegales: defineCollection({
      type: 'page',
      source: 'mentions-legales.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  }
})
