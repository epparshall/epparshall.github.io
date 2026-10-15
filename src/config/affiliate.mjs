// Affiliate and referral settings, in one place so content never hardcodes a tag.
//
// amazonTag: your Amazon Associates tracking ID (looks like "evanparshall-20").
// While it is empty, Amazon links are left untagged and no disclosure is shown.
// Once it is set, every amazon.com link in markdown gets the tag, is marked
// rel="sponsored", and the site footer shows the required Associates disclosure.
// Astro caches rendered markdown, so after changing the tag locally delete
// .astro/data-store.json before building; the GitHub deploy always builds fresh.
export const affiliate = {
	amazonTag: 'evanparshall-20',
};

// Amazon book search for a title and author, tagged when a tag is configured.
export function amazonBookUrl(title, author) {
	const url = new URL('https://www.amazon.com/s');
	url.searchParams.set('k', `${title} ${author}`);
	url.searchParams.set('i', 'stripbooks');
	if (affiliate.amazonTag) url.searchParams.set('tag', affiliate.amazonTag);
	return url.toString();
}
