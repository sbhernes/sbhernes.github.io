import { defineCollection, z } from 'astro:content';
const blog = defineCollection({type:'content',schema:z.object({title:z.string(),description:z.string().optional(),cover:z.string().optional(),draft:z.boolean().default(false)})});
export const collections = {blog};
