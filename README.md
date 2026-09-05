# TASHKEEL

An independent, bilingual enterprise agent deployment prototype for fictional Namaa Industrial Group.

## Run

Node 22.13+ is required. Install with `npm ci`, then run `npm run dev`.
Build with `npm run build`. The scaffold uses Vinext with Next.js App Router APIs, React 19, TypeScript, Tailwind, shadcn/Base UI, React Flow and Recharts.

## Executive demo

Choose **Executive Demo Mode** and use **Next Demo Step** through seven stages. Fill the missing outcome fields with the fictional demo assumptions. A human must explicitly confirm emergency authority. This assigns the role only; it is never an emergency declaration or spending approval. Run all five exception tests, generate the deployment pack, and adjust the value calculator.

All sources, policies, organizations, suppliers, and financial values are fictional. No external APIs, authentication, credentials, live ERP calls, or actual procurement actions are required by the application. Site hosting may apply its own owner-only access. UI state lasts for the page session; Reset Demo clears it. Reloading also restores defaults.

## Exports

Executive, technical and governance documents are generated as Markdown; the agent specification uses JSON with sixteen complete sections. The export panel offers a file link and selectable preview. Some embedded browsers do not expose file-download events or clipboard access; the preview remains directly selectable. No user-entered data is uploaded by export.

## AI architecture

`lib/engine.ts` defines the typed AIProvider interface and deterministic local implementation. `lib/provider.server.ts` is the future server-only adapter boundary. Optional environment names are documented in `.env.example`; they intentionally have no effect until a real server adapter is implemented. Restricted data must remain on an internal approved route. Never put provider keys into public environment variables.

## Validation

- `npx tsc --noEmit`
- `npx oxlint app/page.tsx components/studio.tsx lib/engine.ts lib/enterprise.ts tests/engine.test.ts`
- `npx esbuild tests/engine.test.ts --bundle --platform=node --format=esm --outfile=../engine-test.mjs && node ../engine-test.mjs`
- `npm run build`

The full scaffold lint has pre-existing findings in unused vendored UI components; product-source lint passes. Browser QA covers all twelve navigation entries in both languages, both process views, source/agent drawers, missing objective fields, human authority selection, five scenario runs, WebMCP valid/invalid inputs, calculator changes, audit filters, responsive layout, and guided demo. Export content is checked; the embedded browser's download completion event was unavailable.

## Limits

The displayed 81% deployment readiness and 94% policy coverage are scenario estimates, not production authorization or measurements of the five demo tests. The readiness composite is 72% across the eight fictional source scores. SAR 6.48M annual exposure assumes 18 incidents × 24 downtime hours × SAR 15,000/hour. The calculator separately applies 70% downtime avoidance and 60% labor reduction at SAR 150/hour, with no recurring costs or discounting.

Before any real deployment, resolve the risk register, validate connectors and data freshness, test policies against real authorities, add authenticated signed approvals and durable auditing, and obtain a human go-live decision.
