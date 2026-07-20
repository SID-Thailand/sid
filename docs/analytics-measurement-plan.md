# SID Thailand: measurement plan

Last updated: 2026-07-20

## Platform identifiers

| Platform | Identifier |
| --- | --- |
| Google Tag Manager | `GTM-MHK8J5FT` |
| Google Analytics 4 measurement ID | `G-F4VRTJKMFH` |
| Meta Pixel / dataset ID | `27845610791699424` |
| Yandex Metrika counter | `110873210` |

## Website events

All six website events are generated once by the site, pushed to the data layer, and sent by separate GTM tags to GA4, Meta Pixel, and Yandex Metrika.

| Business action | Data layer / GA4 event | GTM tag naming | Meta event | Yandex Metrika goal ID |
| --- | --- | --- | --- | --- |
| Page loaded | `page_view` | `GA4 - page_view`, `Meta - page_view`, `Yandex Metrika - page_view` | `PageView` | `586747594` |
| First meaningful interaction with a form | `form_start` | `GA4 - form_start`, `Meta - form_start`, `Yandex Metrika - form_start` | custom `form_start` | `586747659` |
| Lead form successfully sent to Kommo | `generate_lead` | `GA4 - generate_lead`, `Meta - generate_lead`, `Yandex Metrika - generate_lead` | custom `generate_lead` | `586747821` |
| WhatsApp link clicked | `click_whatsapp` | `GA4 - click_whatsapp`, `Meta - click_whatsapp`, `Yandex Metrika - click_whatsapp` | custom `click_whatsapp` | `586747856` |
| Phone link clicked | `click_phone` | `GA4 - click_phone`, `Meta - click_phone`, `Yandex Metrika - click_phone` | custom `click_phone` | `586747857` |
| Email link clicked | `click_email` | `GA4 - click_email`, `Meta - click_email`, `Yandex Metrika - click_email` | custom `click_email` | `586747987` |

## Qualified lead

A qualified lead is server-side only. It is not a seventh browser event and does not have a GTM tag. It is created when a lead enters either `Workflow (Consultancy)` or `Workflow (Development)`.

| Destination | Event / conversion | Stable deduplication key | Status in Kommo |
| --- | --- | --- | --- |
| Google Ads Data Manager | qualified lead conversion | `kommo-qualified-<lead-id>` | `qlead_google_status`, `qlead_google_sent_at` |
| GA4 Measurement Protocol | `qualify_lead` | delivery journal prevents repeated jobs | `qlead_ga4_status`, `qlead_ga4_sent_at` |
| Meta Conversions API | standard `Lead` with `lead_type=qualified` | `event_id=kommo-qualified-<lead-id>` | `qlead_meta_status`, `qlead_meta_sent_at` |
| Yandex Metrika offline conversion | counter `110873210`, goal `586798746` | lead ID in upload row | `qlead_yandex_status`, `qlead_yandex_sent_at` |

## Delivery design

1. Kommo sends a webhook after the lead enters a qualified pipeline.
2. The endpoint validates the webhook and immediately places four independent jobs into Vercel Queues.
3. Each job has one deterministic idempotency key: `sid-qlead-<lead-id>-<channel>`.
4. Each provider is processed independently, with retry on technical error.
5. The lead stores `queued`, `processing`, `sent`, `retrying`, `not_attributable`, or `not_configured` for each channel.
6. A successful send writes `qlead_<channel>_sent_at`, which blocks subsequent duplicate sends for that lead and channel.

## Attribution fields retained with every website lead

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gclientid`, `wbraid`, `gbraid`, `fbclid`, `fbp`, `fbc`, `ymclientid`, and `yclid`.

If a visitor has no UTM parameters, the five UTM fields are sent to Kommo empty; no template values are added.
