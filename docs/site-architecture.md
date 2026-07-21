# SID Thailand service architecture

1. Storyblok manages website content and media.
2. GitHub is the source of truth for Nuxt code, direct Kommo lead integration, and qualified-lead server endpoints.
3. Vercel builds GitHub `master` and serves the website plus its server APIs. Credentials are stored only in Vercel Environment Variables.
4. `sidthailand.com` points to the Vercel production deployment.
5. GTM `GTM-MHK8J5FT` loads browser tracking for GA4, Meta Pixel, and Yandex Metrika.
6. A successful form calls Vercel `/api/kommo-lead`, which creates a lead in Kommo and stores attribution.
7. When a Kommo lead reaches either Workflow pipeline, Kommo calls Vercel `/api/kommo-qualified-lead`. The webhook validates the lead and sends four independent qualified-lead deliveries: Google Ads, GA4, Meta CAPI, and Yandex Metrika.
8. Every delivery has an independent result and a stable lead-and-channel deduplication key. Kommo stores the delivery journal for every channel in `qlead_*_status`, `qlead_*_detail`, and `qlead_*_sent_at` fields. A provider failure does not block the other providers, and Kommo may safely retry the webhook because an existing `sent_at` value prevents duplicate delivery.
