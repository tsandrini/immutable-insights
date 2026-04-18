import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image().optional(),
      columns: z.string().optional(),
      numberedHeadings: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      description: z.string().optional(),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      draft: z.boolean().default(false),
      columns: z.string().optional(),
      numberedHeadings: z.boolean().default(false),
    }),
});

export const collections = { pages, posts };
