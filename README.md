# Million Routines

Public website for millionroutines.com. The landing page presents three routine concepts and collects launch interest in Cloudflare D1. Automated email delivery is not connected.

## Cloudflare Workers Builds

- Repository: `lunana-7/millonroutines`
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npm run deploy`
- Worker name: `millonroutines`
- Custom domain: `https://millionroutines.com`
- Initial D1 schema: applied to the production database through the Cloudflare console

Install dependencies with `npm ci`. Run `npm run dev` locally, `npm run check` for TypeScript, and `npm run build` to produce the Worker and assets. Apply SQL migrations in `drizzle/` before deploying schema changes.

The signup database binding is `DB`. Production data stays in Cloudflare and is never committed to GitHub. Product prices, final contents, shipping markets and campaign timing remain undecided.
