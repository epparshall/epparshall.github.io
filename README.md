<a href="https://epparshall.github.io">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="readme/dark_mode.svg?v=3">
    <img alt="Evan Parshall: ASCII portrait beside a terminal-style summary of role, education, interests, and contact links" src="readme/light_mode.svg?v=3">
  </picture>
</a>

# epparshall.github.io

Evan Parshall's personal website, built with [Astro](https://astro.build) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the production site into `./dist/`    |
| `npm run preview` | Serve the production build locally          |

## Where things live

- `src/content/` holds all writing as markdown, one folder per collection (`blog`, `books`, `travel`, `travelResources`, `publications`). The schema for each is in `src/content.config.ts`.
- `src/content/rankings.json` orders the books page.
- `src/pages/` holds the page templates. `/publications` redirects to `/work` (see `astro.config.mjs`).
- `src/config/affiliate.mjs` holds the Amazon Associates tag. Leave it empty and links stay untagged; set it and every Amazon link is tagged and the footer shows the disclosure.
- `readme/` holds the card at the top of this README. Edit the text in `readme/build_card.py` and run `python3 readme/build_card.py` (needs numpy, opencv-python, and Pillow) to regenerate both SVGs.
- `public/images/` holds photos. Resize anything new to about 1600px on the long edge and strip location metadata before committing; phone photos are 3 to 8 MB each and carry GPS coordinates.

## Writing a post

Add a markdown file to `src/content/blog/` with `title`, `description`, and `pubDate` frontmatter. Set `draft: true` to keep it off the site. Posts appear on the blog page, the home page's recent list, and the RSS feed at `/rss.xml`.
