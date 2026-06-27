# VitrinY Etsy API Roadmap

Internal working document for turning Etsy API support into a careful, sellable VitrinY product layer.

## 1. Positioning

VitrinY is not only a website service. VitrinY is an Etsy brand layer that can grow from manual brand pages into API-supported catalog and visual intelligence systems.

The core offer remains simple:

- Etsy checkout stays on Etsy.
- VitrinY improves brand presentation, product storytelling, visuals, and external traffic landing pages.
- API setup is optional and only useful for certain shops.

Do not promise automatic catalog sync in every package.

Safe public wording:

> Starter brand pages do not require API setup. For larger shops, optional Etsy API-based catalog assistance can be added after API access is approved, authorized, and technically connected.

## 2. Technical facts to respect

Etsy Open API v3 requires:

- API key authentication for requests.
- OAuth 2.0 authorization for private user data or write operations.
- HTTPS redirect URLs for OAuth callback flows.
- State and PKCE in the OAuth authorization flow.
- Access token refresh logic.
- Rate-limit-aware caching and retry planning.

Important operating rule:

Static frontend pages are not enough for secure API sync. API credentials, OAuth tokens, refresh tokens, and cache logic require a backend.

## 3. Product layers

### Layer A: VitrinY Core

No API needed.

Includes:

- Starter brand page
- Product presentation sections
- Manual Etsy CTA links
- Studio visual system
- Audit and demo direction recommendation

Best for:

- Small shops
- First-time VitrinY clients
- Shops with a limited number of products
- Sellers who need better presentation before automation

### Layer B: API Readiness Audit

A paid or bundled diagnostic step before any API work.

Purpose:

- Check whether API sync is actually useful.
- Understand shop size, listing count, update frequency, and catalog complexity.
- Decide whether manual setup, monthly support, or API sync is the right path.

Deliverable:

- Recommended VitrinY package
- API readiness score
- Needed scopes and data types
- Suggested sync frequency
- Risk and setup notes

Potential price:

- $49-$99 standalone
- Free or credited if the client buys a Catalog System

### Layer C: Customer-Owned Developer Setup

Short-term pilot model.

The client creates or owns the Etsy Developer app/access. VitrinY assists with setup and connects the catalog system carefully.

Best for:

- Early pilot clients
- Larger shops that can handle technical setup
- Shops with many listings or frequent updates

Possible offer name:

- Etsy API Setup Assist

Potential price:

- $199-$399 one-time

### Layer D: Read-Only Catalog Sync Pilot

First real technical sync product.

Scope should be read-only at first.

Recommended minimum permissions:

- Shop read access
- Listing read access

Avoid at first:

- Order data
- Buyer data
- Write access
- Listing edits
- Fulfillment actions

Use cases:

- Pull listing data into a VitrinY catalog cache
- Build product sections faster
- Identify weak listing visuals
- Create visual audit opportunities
- Support brand page updates

Potential price:

- $399-$799 setup
- $49-$149 monthly maintenance

### Layer E: VitrinY Connect

Long-term product.

The client clicks "Connect Etsy Shop" and authorizes VitrinY through OAuth.

This requires a proper backend, database, token storage, and likely commercial access planning before it becomes a broad SaaS-style offer.

Potential future pricing:

- $19-$39/month starter sync
- $49-$99/month catalog sync
- $149+/month growth dashboard
- $199-$499 setup fee for custom catalog systems

## 4. What API can help us sell

### Automatic or assisted catalog support

Useful only when the shop has enough listings or frequent enough changes.

Safe wording:

> Optional API-supported catalog assistance can help larger shops keep VitrinY catalog data easier to manage after setup.

Avoid:

> Your catalog will always update automatically.

### Listing visual audit scanner

Potentially strong Studio lead magnet.

Use listing data to identify:

- Weak cover images
- Missing lifestyle context
- Missing scale/detail frames
- Inconsistent product presentation
- Products that deserve a better launch kit

This directly supports Studio Listing Refresh and Product Launch Kit sales.

### Brand page auto-builder

API can speed up creation of:

- Best seller sections
- New arrival sections
- Giftable picks
- Seasonal landing pages
- Collection pages

This should assist the VitrinY build process, not replace human brand direction.

### Future dashboard

Possible future dashboard modules:

- Listing presentation score
- Product visual priority list
- Catalog update status
- Best products to promote externally
- Missing brand assets

## 5. Backend architecture

Minimum architecture for API work:

- Frontend: VitrinY website and client-facing pages
- Backend: OAuth callback, token exchange, refresh logic, API requests
- Database: client shops, cached listings, sync state, encrypted tokens
- Scheduler: daily or manual sync jobs
- Logging: API errors, token failures, rate limit events

Possible stack:

- Vercel or Railway for backend
- Supabase/PostgreSQL for database
- Encrypted storage for OAuth tokens
- Scheduled jobs for controlled sync

Do not store API secrets or OAuth tokens inside static HTML or public JavaScript.

## 6. Safe technical scope for first pilot

First pilot should be:

- Read-only
- One client
- One shop
- Limited listing fields
- Manual sync button or daily sync
- No order data
- No buyer data
- No write operations

Initial sync fields:

- Listing ID
- Title
- URL
- Price
- State
- Images
- Tags
- Shop section
- Last updated date if available

First output:

- VitrinY catalog cache
- Priority list of listings that need visual improvement
- Brand page product section recommendations

## 7. Client requirements

Before API work begins, confirm:

- Client owns or controls the Etsy shop.
- Client understands API sync is optional.
- Client understands setup may require Etsy Developer approval or app access.
- Client agrees that Starter Brand Page does not require API.
- Client agrees to a defined scope.
- Client understands that write access is not part of the first pilot.

## 8. Sales packaging

### API Readiness Audit

Price: $49-$99

Includes:

- Shop suitability review
- API need assessment
- Recommended package
- Technical requirements checklist

### Etsy API Setup Assist

Price: $199-$399

Includes:

- Developer access guidance
- Callback/OAuth setup planning
- Read-only scope recommendation
- Basic connection testing

### Catalog Sync Setup

Price: $399-$799

Includes:

- Read-only catalog data connection
- Cached product structure
- Sync plan
- VitrinY catalog mapping

### Monthly Sync Care

Price: $49-$149/month

Includes:

- Sync checks
- Small catalog updates
- Troubleshooting
- Manual review when needed

## 9. Public wording rules

Use:

- Optional API support
- API-supported catalog assistance
- After access is approved and connected
- Scoped separately
- Best for larger catalogs
- Starter pages do not require API

Avoid:

- Automatic sync included
- Always updated catalog
- Full Etsy automation
- No setup needed
- We manage everything inside Etsy
- Guaranteed API approval

## 10. Immediate next steps

1. Keep the website promise careful.
2. Add API only as an advanced Commerce option.
3. Create an internal API Readiness Audit checklist.
4. Prepare one pilot technical plan.
5. Only after a pilot works, consider VitrinY Connect as a broader product.

## 11. Decision

VitrinY API support is worth pursuing, but it must be sold in phases.

The correct path is:

Core brand pages first, API readiness second, read-only catalog pilot third, commercial app later.
