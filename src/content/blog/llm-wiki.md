---
title: "I Built a Personal Wiki With My LLM. Here's Why and How."
description: "Why I stopped using RAG for personal data and switched to a persistent, English-first knowledge base maintained by an LLM."
pubDate: 2026-05-27
tags: ["Technology", "AI", "Productivity"]
---

A few months ago I read a [GitHub Gist from Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The idea was simple: stop treating an LLM as a stateless oracle you have to re-explain everything to. Use it to maintain a personal wiki for you instead. Have it read your raw sources once. Summarize. Cross-link. Keep the bookkeeping current. Then when you have questions, reference the wiki, not the source pile.

I built one. I have been running it for a couple months. Here is what an LLM wiki is, why it beats the more familiar RAG approach, why English is the right place to save your progress, how to build your own in an afternoon, and what I use mine for.

## What Is an LLM Wiki?

An LLM wiki is a folder of markdown files that an LLM maintains on your behalf. The folder has two halves. A `raw/` side, where you drop source documents (a blood test PDF, a Strava export, a textbook chapter, an article you liked). And a `wiki/` side, where the LLM writes summary pages, entity pages, concept pages, question pages, and a running log of every operation it has performed.

The page types do specific things:

- **Summary pages** distill a single raw source. One per document. The summary is what the LLM refers to at query time instead of re-reading the original.
- **Entity pages** track ongoing nouns in your life: a specific person, a company, a car, an account, a recurring project. New information about that entity flows into the same page over time.
- **Concept pages** track ideas: leadership, monetary policy, sleep, glycemic load. These are populated by the LLM as it notices the same theme showing up across multiple sources.
- **Question pages** track open questions you are still working through. When you ingest a source that contributes to one, the LLM updates the page with the new evidence and flags how much the picture has changed.
- **The log** is one append-only file where the LLM records every ingest, every cross-link, every contradiction it flagged. It is the audit trail for the whole system.

When you add a new source, the LLM reads it once, writes a summary page, identifies which existing pages should be updated, cross-links the new information into what is already there, flags any contradictions with prior pages, and appends a log entry. Over time the wiki becomes a personalized knowledge base that contains the distilled version of everything you have thrown at it. The raw materials sit untouched. The wiki side is the LLM's domain.

You can have your wiki track anything you can describe in English. Mine has pages on technical work, finances, health, reading, friends and family, volunteer work, routines, foreign languages, career goals, car maintenance, and more. It is a long-running personal knowledge base, version-controlled in git, that I can ask anything.

## Why It Beats RAG

The standard pattern for using an LLM with personal data is RAG: retrieval-augmented generation. You drop your documents in a vector database, the LLM fetches relevant chunks at query time, and answers. RAG works well in many cases. But it has a quiet flaw: every question rediscovers context from scratch. Ask "what should I do about my low vitamin D?" and the system fetches raw files like your blood test, supplements list, and sleep notes. Ask the same question two weeks later, and the same chunks come back. Nothing was learned. Nothing compounded. The work the LLM did the first time was thrown away.

Think of the wiki like a compiler. A compiler sits between the programmer and the machine code. It takes what the human wrote and turns it into something the machine can run efficiently. An interpreter does no such translation. It re-reads and re-parses the same source code every time you run the program. RAG is the interpreter version of personal AI: every query is a fresh pass over your raw documents. The wiki is the compiler version. It sits between you and the LLM. Your sources go in once. The wiki distills them into pages the LLM can use at query time without re-reading the source pile. The understanding work happens once. It saves to disk. It compounds with everything you ingest after it.

The next time you ask about vitamin D, the answer already exists. Your follow-up question can go deeper rather than starting over.

Karpathy's framing was the one that landed for me: maintaining a knowledge base is mostly bookkeeping, not reading and thinking. Humans give up on personal wikis because the bookkeeping is exhausting. Orphan pages accumulate. Cross-references go stale. Tags drift. Connections between distant pages never get drawn because the human who would have noticed them has moved on weeks ago. The LLM does not get tired of any of that. Ask it to lint the wiki and it will surface orphans, broken links, contradictions, and gaps in a single pass. Ask it to find new connections, and it will read the whole wiki at once and propose links you would not have caught yourself: a book you ingested in March quietly connecting to a leadership concept page written last week. You bring the curation and the questions. It does the upkeep.

## English Is the Durable Layer

We are in a wild stretch of model churn. Two years ago the debate was GPT-4o versus Claude 3.5 Sonnet versus Gemini 1.5. Today it is whatever shipped yesterday. People argue endlessly about which model is best at code, which is best at reasoning, which vendor is safe to commit to. Within six months the pecking order will shuffle again. Within two years it may be a different set of companies entirely.

One thing has not changed and probably will not: English is the interface. Plain markdown is the storage format. Whatever model is best at the end of next year will still read English and still read markdown. Whatever specialized model your IDE ships with in five years will still be trained on English text.

That is the key. If you store your distilled knowledge in plain English text, it survives any model transition. You are not betting on a vendor. You are not training a specific architecture. You are saving progress in the most portable format the industry has, and you can hand it to whichever model is winning in any given week.

Think of it like a recipe written in English. The same recipe works on a gas stove, an induction range, or a campfire. The instructions are the durable artifact. The hardware running them is interchangeable. The wiki is your recipe collection.

The bigger point is that this is genuinely a long game. The wiki I started this year will still be useful and readable in 2030 while the chat history I had with last year's hot model is most likely gone. Time spent organizing knowledge into a personal wiki compounds. Time spent producing one-shot answers in a chat does not.

## How to Build Your Own

It is far simpler than you might think.

1. Create a GitHub repo and clone it locally. Empty is fine.
2. Open the repo in an LLM coding tool. I use Claude Code. Cursor, Aider, Codex CLI, and a half-dozen others work the same way. The point is to use an LLM that can read and write files in your repo, not one you just chat with about them.
3. Hand it a prompt. The easiest thing is to paste in [Andrej Karpathy's original gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and say "build this for me." That is literally how I bootstrapped mine. If you want to be more explicit, something like: "Set up this repo as a personal LLM wiki. Create a `raw/` folder for source documents you will never modify and a `wiki/` folder where you write summary pages, entity pages, concept pages, question pages, and a running log. Write an `AGENTS.md` schema file at the root that defines the page types, naming conventions, frontmatter format, and the operations you'll support (ingest, query, lint, note). Auto-commit and push every time you change anything."

A note on the schema file. I called mine `AGENTS.md` because it is the closest thing to a cross-tool standard: Codex, Cursor, and most other coding agents read it. Claude Code looks for `CLAUDE.md` instead, so a one-line `CLAUDE.md` that points at `AGENTS.md` covers both. Aider uses `CONVENTIONS.md`, and so on. Use whatever your tool expects. The file itself does the same job in all of them, which is to tell the LLM how to behave in your repo.

The LLM will build the schema, the folder structure, an empty index, and the log. You will have a working wiki in under a minute. From there it is just a matter of starting to feed it sources.

The one piece I would not skip is the auto-commit-and-push instruction. It turns your git history into a journal: every edit timestamped, diffable, and synced to GitHub for free. The most underrated property of this setup is that it produces a perfect daily diary as a side effect.

Start small. Pick three or four sources you have lying around. A medical record. A book you finished. A long article you saved. A bank statement. Hand them over and ask your LLM to ingest each one in order. After a couple of hours you will have a small wiki and an intuition for what compounds and what does not. The pieces that compound are the ones to feed more of.

## What I Use Mine For

The clearest way to explain what an LLM wiki is good for is to show a few things mine actually does.

**A reading list that compounds.** When I finish a book I drop a summary into `raw/` and ask the wiki to ingest it. The books are tracked in a single rolling list. Themes that show up across multiple books get their own concept pages. A new book on leadership gets logged in the list and cross-linked to the existing leadership concept page, where the LLM flags where this new author contradicts or reinforces the others. After a year of reading, my wiki tells me more about my own intellectual trajectory than I could reconstruct from memory.

**Preventative car maintenance.** I told the wiki the make, model, year, and mileage of my car, and dropped in the owner's manual, the documentation from my dealership, the maintenance summaries from each visit, and the receipts. It built me a maintenance schedule with target intervals, parsed my full service history, and scheduled reminders for the next round (tire rotation, transmission fluid, brake fluid). When the reminder fires, the wiki already has all of that history and can tell me exactly what is due, when, and why.

**Health-metrics tracking.** Apple Health exports a giant zipped XML file once a quarter. The file is too big to hand to an LLM directly, so I run it through a small Python script that extracts the highlights (resting heart rate, VO2 max, HRV, sleep stages, workouts) and dumps that result into `raw/`. The LLM ingests the summary, updates my health-metrics page with the latest numbers, and surfaces trends that would have taken me an afternoon to eyeball in the Health app. I also use the wiki for blood tests. When I get a new draw back, I drop the PDF in `raw/` and ask the LLM to ingest it. It pulls the markers, compares them to my last draw, updates my health-metrics page, flags anything that moved, and drafts an evidence-based action plan with citations for each recommendation. Because the wiki already knows my routines (sleep schedule, diet, supplements, exercise pattern, working times), the plan is not abstract advice. It is a list of concrete tweaks to things I am already doing. The result lives in the wiki forever, and the next time I get bloodwork, the comparison is to a baseline I already trust.

**Goal tracking that pulls from everything else.** I keep my yearly goals on a single dashboard page: foreign language learning, VO2 max, reading, finances, technical skills. The page is not static. As I ingest new sources (a Strava export, a book summary, financial statements), the LLM updates the relevant goal rows. The same pages that hold my routines and my spending also feed my goals. And when a goal stalls or is unrealistic, the LLM is the first to flag it.

The pattern that holds across all four is the same: I provide content, the LLM bookkeeps, the wiki compounds. The questions I can ask of the wiki six months from now will be sharper than the questions I can ask of any one-shot chat today, because the wiki has been quietly accumulating context the whole time.

This is the single highest-leverage thing I have added to my workflow in the last year.

## Schedule the Boring Parts

The setup so far is reactive: you drop a source, the LLM ingests it. Once your wiki has been running for a few months, you will want to add a handful of recurring jobs so it keeps maintaining itself without you having to ask each time. I have three running.

**A weekly maintenance pass.** Once a week, the LLM lints the whole wiki: orphan pages, broken links, stale claims, contradictions between pages, gaps where a concept appears across multiple pages without its own home. I get a short report and a list of suggested fixes. The wiki stays tidy without me sitting down to clean it manually.

**A reminders check.** My wiki has a reminders page that tracks dates: car service intervals, upcoming health appointments, election dates, hardware-upgrade timelines, bill deadlines. A scheduled job runs daily, scans for anything due or coming up, and informs me. I no longer need to remember when my next oil change is due. The wiki remembers for me.

**A weekly data refresh.** A scheduled job pulls fresh data from external sources I track: Duolingo XP, Strava activity, portfolio positions, Apple Music listening. It updates the relevant pages and flags any meaningful changes. The picture stays current with zero manual effort.

The simplest way to wire these up is a cron job on your laptop that invokes your LLM coding tool with a prompt like "run the weekly lint pass." Anything more elaborate (a hosted service, a self-updating task list inside the wiki) is optional. The point is the wiki shifts from a thing you have to remember to update into a thing that updates itself.

## Compress As You Grow

One thing you will run into a few months in: the wiki getting too big to read in one pass. The early version of this problem is your index file growing past what fits cleanly in context. The later version is individual concept pages bloating with so many cross-references and updates that they become harder for the LLM to use, not easier.

This is exactly the problem AI agents have been solving for themselves, and it is worth borrowing what they learned. The contrast I find clearest is OpenClaw versus Hermes. Both are open-source AI agents that maintain persistent context. OpenClaw tends to get slower as a session grows: it accumulates context and does not aggressively prune it. Hermes does the opposite. As the session grows, Hermes compresses older context, summarizes runs of redundant or outdated information, and keeps the working set lean. The effect is that Hermes feels like it gets smarter the longer you use it, while OpenClaw feels like it gets sluggish.

Your wiki has the same dynamic. Without compression, every page just accumulates. With it, the wiki keeps getting better. The fix is to add a recurring compression pass to your scheduled jobs: once a month, have the LLM read each concept page, identify redundant or outdated sections, merge overlapping content, and trim. The same job can compress your log file, summarizing runs of routine operations into a single weekly digest. The wiki gets denser, not longer, as it grows.

It is the difference between a notebook that becomes a library and a notebook that becomes a junk drawer.

## Going Further

Compression keeps your wiki dense, but eventually density is not the bottleneck. Structure is. Once you are past a few hundred pages, even a well-compressed index gets too long for the LLM to scan efficiently. The question becomes how the LLM finds the right pages, not how short each one is.

The answer is Graph RAG. The way I think about it: it is RAG, but done on the wiki instead of the raw documents, and tuned to be selective. Traditional RAG embeds every chunk of your source pile and pulls maybe the top 50 matches for any query, hoping the right context is in there somewhere. Graph RAG embeds your wiki pages instead, pulls a much smaller number of matches (say five), and then traverses the cross-references on those pages to gather related context. The match gets you to the right neighborhood. The graph gets you to everything else nearby. Microsoft Research's GraphRAG project is the well-known implementation, but the same pattern is showing up in personal-knowledge tools. The reason this scales: you are not asking the LLM to scan an index that keeps growing. You are asking it to start from a few good seeds and follow the links you already wrote.

This is aspirational for me. My wiki is still flat markdown with a flat index, and the compression pass has been enough so far. I plan to upgrade when I have a few hundred pages and the index stops being useful.

One more tool worth knowing about: Obsidian. Obsidian is a markdown-based note app that a lot of people use as the visual surface for their LLM wiki. It renders your pages as a literal graph, with each page as a node and each cross-reference as a visible edge between nodes. This is not about how the LLM retrieves pages, but about how you, the human, browse what is in your wiki. If you want a richer interface than your terminal and editor, this is the obvious move, and the underlying storage stays plain markdown in a git repo, so you lose nothing on portability.

## Save Progress

The takeaway is simple. Whichever model wins next year, whichever tool you use to build the wiki, the data you put in your wiki is yours and is portable. You can hand it to whatever model is best at any given moment and immediately have a personalized assistant with months of context behind it. The longer you run this, the more the knowledge compounds, the better the return.

It is the most underused trick in AI right now. Build one.
