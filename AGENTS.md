# AGENTS.md

Context for any AI agent working on Evan Parshall's personal website (epparshall.github.io).
Read this before changing anything. `README.md` covers commands and folder layout; this file
covers how Evan writes, what he wants the site to feel like, and what has already been decided.

## Keep this file current

**Update this file as you learn things, without waiting to be asked.** When Evan corrects
you, states a preference, approves or rejects a design, or when you make a decision a future
agent would otherwise have to rediscover, add it here in the same change. Fix or delete
anything here that has become wrong. Tell Evan in one line what you added. `CLAUDE.md` just
points here, so there is one file to maintain.

## How Evan works

- **He reviews on the dev server before anything goes live.** Run `npm run dev` (port 4321),
  make the changes, and let him look. Push only when he says so. He sometimes edits files
  himself between your changes; build on his edits instead of reverting them.
- **Pushing means committing to `main` and pushing.** No pull requests. GitHub Actions
  deploys to GitHub Pages in about a minute; confirm the deploy and spot-check the live page.
- **He proofreads closely and catches grammar slips.** Reread every sentence you write or
  touch before showing it to him.
- **He wants the site to read as his, not as AI-generated or template-made.** He has called
  out "AI slop vibe coded" looks by name. See the design section.
- **Ask about the state of outside systems** (Search Console, Amazon, GitHub settings)
  rather than assuming from the repo. He has given Claude browser access to do those tasks
  for him when asked.

## Writing style

Match this when you write or edit anything in his voice. When you write copy for him, say
which sentences are yours so he can check them.

- **First person, plain, conversational.** Short declarative sentences. Short punchy
  fragments for emphasis: "Fair.", "Lesson learned.", "Worth it.", "Actually, yes."
- **Contractions are rare in his long-form writing.** In book reviews and travel stories he
  writes "do not", "it is", "I am" about 20 times for every contraction. Travel tips are
  looser. Follow whatever the surrounding piece does.
- **No em dashes in his prose.** He never uses them (the only ones in the repo are inside
  book titles). Use commas, periods, colons, or parentheses instead.
- **Specific over general.** Real numbers, names, dates, prices, and mechanisms. He names the
  people in his stories (friends, roommates, guides) and quotes what they said.
- **Self-deprecating humor and honest reactions**, including what went wrong (food poisoning,
  a $50 bag surcharge, a bad hike in the rain).
- **He likes to explain the "why" behind things**, often through politics, incentives,
  institutions, or economics, and ties ideas back to books he has read (Why Nations Fail
  comes up a lot). Engineering analogies are common (control theory, RAM vs SSD, compilers).
- **Fair to his sources.** Book reviews include honest criticism ("The book is not perfect")
  and flag claims that overreach the science.
- **Pieces end with a takeaway or a recommendation**, sometimes a direct one: "Read this book."

### Shapes by content type

- **Book reviews** (`src/content/books/`): how he came across the book, the core ideas with
  concrete examples and numbers, how it changed what he does, fair criticisms, a
  recommendation. Frontmatter: `title`, `author`, `image`, `rating`.
- **Travel stories** (`src/content/travel/`): mostly chronological narrative, with cultural,
  political, and economic observations woven in, then practical advice near the end.
  `date` is the month of the trip, not the date it was written.
- **Travel tips** (`src/content/travelResources/`): a fixed template. Short intro, then
  `### Why I like it` (bolded-lead bullets), `### Small tradeoffs`, `### Practical takeaway`,
  and a product link at the end, for example `[View on Amazon](https://www.amazon.com/dp/ASIN)`.
- **Blog posts** (`src/content/blog/`): long-form essays with `##` sections. Long posts get an
  automatic "On this page" contents box unless they already have a `## Contents` section.

## Accuracy rules

- **Never invent personal experiences.** If Evan has not said he did or felt something, do
  not write it as his experience. Product details come from the product's own listing.
- **Keep his experience and product claims separate.** A salesperson told him the ASICS
  BlazeBlast was water resistant; it is not, and the claim had to be removed. Write what he
  has actually experienced, and attribute anything else.
- **Check facts before stating them,** especially numbers, dates, and anything that changes
  over time. He prefers being told "I could not verify this" to a confident guess.

## Hands off without asking

- **The Finance posts** (tag `Finance`: the five-part Personal Finance series and the credit
  cards post). Evan is revising them himself. Do not edit them unless he asks.
- **"The Fidelity Setup" says "nobody is paying me to write this."** If affiliate or referral
  links are ever added to finance content, that line must change too. Flag it to him.

## Design decisions already made

- **Fonts:** Inter for the interface and headings, Source Serif 4 for long-form reading
  (`.content`, the homepage intro). Both are self-hosted through `@fontsource-variable`, so
  there are no Google Fonts requests.
- **Flat cards:** no lift or large shadow on hover, only a border-color change. Do not
  reintroduce `transform: translateY` hover effects; they are the "template" look he rejected.
- **Homepage:** a short intro in his voice, three hand-picked items ("Start here": Ballast,
  the #1 book, and the trip set by `FEATURED_TRIP` in `src/pages/index.astro`), recent
  writing, and contact links. Avoid generic "Collections" card grids.
- **Accessibility:** the current nav item is marked, there is a skip link, and keyboard focus
  is visible. Keep all of that working.
- **Mobile:** check every layout change at phone width (375px) with no sideways page scroll.

## Content and SEO conventions

- **Book ratings follow the ranking** in `src/content/rankings.json`: #1-5 get 5 stars,
  #6-10 get 4.5, #11-15 get 4, #16-20 get 3.5, honorable mentions get 3. Nothing below 3. If
  a book moves in the ranking, update its `rating` to match.
- **Book page titles** read "<Book> by <Author>: Book Review" to match how people search.
  Book pages carry schema.org `Review` markup and blog posts carry `BlogPosting` markup,
  passed to `BaseLayout` through its `jsonLd` prop.
- **Every page needs a description.** Blog posts, travel stories, and travel tips set one in
  frontmatter; it is used for search results and link previews.
- **URLs end in a trailing slash** (`/books/breath/`), matching the sitemap and canonical
  links. Use that form anywhere a full page URL is written out.
- **Google Search Console and Bing Webmaster Tools are set up** with the sitemap at
  `/sitemap-index.xml` (and `/sitemap-0.xml`). `public/robots.txt` points crawlers at it.
- **`/publications` redirects to `/work`** (`astro.config.mjs`). The tab was renamed because
  it holds an app as well as papers.

## Monetization

- **Amazon Associates tag `evanparshall-20`** lives only in `src/config/affiliate.mjs`. A
  markdown plugin in `astro.config.mjs` adds it to every amazon.com link, strips tracking
  parameters, marks the link `rel="sponsored"`, and the footer shows the required disclosure.
  Write plain Amazon links in content; never hardcode the tag. After changing the tag locally,
  delete `.astro/data-store.json` before building, since Astro caches rendered markdown.
- **Referral links must say he benefits.** The Jetpac link says "(and gives me a small
  credit too)". Do the same for any new referral link.

## Images

- **Resize new photos to about 1600px on the long edge and strip all metadata before
  committing.** Phone photos are 3 to 8 MB and carry GPS coordinates; 28 photos once went live
  with exact locations. With Pillow:

  ```python
  from PIL import Image, ImageOps
  img = ImageOps.exif_transpose(Image.open(path)).convert('RGB')  # apply rotation first
  img.thumbnail((1600, 1600))
  img.save(path, 'JPEG', quality=82, optimize=True, progressive=True)  # no EXIF is written
  ```

## The README card

The ASCII portrait card at the top of `README.md` is generated by `readme/build_card.py` from
`readme/portrait.jpg` (background removed with `readme/portrait_mask.png`, made by
`readme/mask.swift`). The same card is Evan's GitHub profile README, in the separate repo
`epparshall/epparshall` with its own copy of the script. The script writes SVGs named by a
content hash and repoints the README at them, because GitHub's image cache ignores query
strings and kept showing old versions. Regenerate with the script; do not hand-edit the SVGs.
