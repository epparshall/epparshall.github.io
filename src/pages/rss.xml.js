import { getCollection } from 'astro:content';

const escapeXml = (value) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export async function GET(context) {
	const site = context.site ?? new URL('https://epparshall.github.io');
	const posts = (await getCollection('blog', ({ data }) => data.draft !== true)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	const items = posts
		.map((post) => {
			const link = new URL(`/blog/${post.id}`, site).toString();
			const categories = (post.data.tags ?? [])
				.map((tag) => `<category>${escapeXml(tag)}</category>`)
				.join('');
			return `<item><title>${escapeXml(post.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate><description>${escapeXml(post.data.description)}</description>${categories}</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Evan Parshall | Blog</title><link>${new URL('/blog', site)}</link><description>Writing on technology, health and wellness, finance, travel, and ideas worth sharing.</description><language>en-us</language>${items}</channel></rss>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
