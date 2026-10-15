import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		tags: z.array(z.string()).optional(),
		seriesTitle: z.string().optional(),
		seriesPart: z.number().int().positive().optional(),
		seriesTotal: z.number().int().positive().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

const books = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/books" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		image: z.string().optional(),
		rating: z.number().min(1).max(5).optional(),
		finishDate: z.date().optional(),
	}),
});

const rankings = defineCollection({
	loader: glob({ pattern: 'rankings.json', base: "./src/content" }),
	schema: z.object({
		favoriteBooks: z.array(z.string()),
		honorableMentions: z.array(z.string()).optional(),
	})
});

const travel = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/travel" }),
	schema: z.object({
		destination: z.string(),
		date: z.date(),
		description: z.string(),
		image: z.string().optional(),
	}),
});

const publications = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/publications" }),
	schema: z.object({
		title: z.string(),
		publisher: z.string(),
		pubDate: z.date(),
		link: z.string().url(),
		linkLabel: z.string().optional(),
	}),
});

const travelResources = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/travelResources" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = {
	blog,
	books,
	rankings,
	travel,
	travelResources,
	publications,
};
