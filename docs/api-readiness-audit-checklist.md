# VitrinY API Readiness Audit Checklist

Internal checklist for deciding whether an Etsy seller actually needs API support, manual catalog work, Studio visual work, or a normal VitrinY Commerce package.

Use this before selling any API setup.

## 1. Audit outcome options

At the end of the audit, choose one clear recommendation:

1. No API needed yet
2. Manual Starter Brand Page
3. Manual Catalog System
4. API Readiness Only
5. Customer-Owned Etsy Developer Setup
6. Read-Only Catalog Sync Pilot
7. Not a fit for VitrinY API work

Do not recommend API work unless it clearly solves a real catalog or workflow problem.

## 2. Seller and shop basics

Record:

- Seller name
- Shop name
- Etsy shop URL
- Contact email
- Country / timezone
- Main product category
- Number of active listings
- Approximate number of sales
- Approximate number of reviews
- Average product price
- Main traffic sources
- Current website or link-in-bio URL if available

Scoring guide:

- 0-20 listings: API usually not needed
- 20-75 listings: API may be useful later, but manual catalog is often enough
- 75+ listings: API support may be worth evaluating
- Frequent listing changes: stronger API candidate
- High product value: stronger business case

## 3. Shop maturity score

Score each 1-5.

### Brand clarity

Question: Does the shop immediately communicate what it sells and why it is different?

Score:

- 1 = generic shop
- 2 = some identity but unclear
- 3 = clear enough
- 4 = strong direction
- 5 = premium and memorable

### Product visual strength

Question: Are the listing images good enough for Etsy, Pinterest, and external traffic?

Score:

- 1 = weak / inconsistent
- 2 = usable but not premium
- 3 = acceptable
- 4 = strong
- 5 = premium visual system

### Catalog complexity

Question: How hard would it be to maintain this catalog manually?

Score:

- 1 = very small catalog
- 2 = simple catalog
- 3 = moderate catalog
- 4 = large catalog
- 5 = large and frequently changing catalog

### External traffic readiness

Question: Does the shop need a better destination for Instagram, Pinterest, Google, ads, QR codes, or repeat buyers?

Score:

- 1 = no external traffic need yet
- 2 = small need
- 3 = useful
- 4 = important
- 5 = urgent

### Technical readiness

Question: Can the seller handle Etsy Developer access, OAuth approval, and a scoped setup process?

Score:

- 1 = not technical at all
- 2 = needs heavy guidance
- 3 = can follow instructions
- 4 = comfortable with setup
- 5 = already has developer access or technical help

## 4. API need decision

Use this decision rule:

Recommend no API if:

- Active listings are low
- Product updates are rare
- The seller mainly needs better visuals or brand presentation
- The seller is not ready for technical setup

Recommend manual Catalog System if:

- The shop has enough products for categories or collections
- Updates are not frequent
- A curated brand page would solve most of the problem

Recommend API Readiness Audit if:

- The shop has many listings
- Updates happen often
- The seller asks about automation
- The seller may need catalog sync but the scope is unclear

Recommend Customer-Owned Developer Setup if:

- The client controls the Etsy shop
- The client understands API approval/setup is required
- The client can provide or create Etsy Developer access
- The first scope can remain read-only

Recommend Read-Only Catalog Sync Pilot if:

- The seller has many listings or frequent updates
- Manual updates would create recurring operational burden
- The seller agrees to a limited pilot
- Backend and token storage are ready
- Scope is limited to shop/listing read data

Reject or delay API work if:

- The seller expects guaranteed approval
- The seller wants write automation immediately
- The seller wants order or buyer data before trust is established
- The seller cannot confirm ownership or authorization
- The budget does not support setup and maintenance

## 5. Data scope checklist

Start with read-only only.

Allowed for first pilot:

- Shop name
- Shop sections
- Public shop data
- Listing IDs
- Listing titles
- Listing URLs
- Listing prices
- Listing state
- Listing images
- Listing tags
- Listing update timestamps if available

Avoid in first pilot:

- Order data
- Buyer data
- Buyer email
- Private messages
- Listing write/edit actions
- Inventory write actions
- Fulfillment or tracking actions
- Payment/billing data

Reason:

The first pilot should prove catalog support and visual audit value without increasing privacy, operational, or write-access risk.

## 6. Technical readiness checklist

Before any API build, confirm:

- Backend is available
- OAuth callback URL uses HTTPS
- Callback URL can be registered exactly in Etsy Developer settings
- Token exchange logic is available
- Refresh token logic is planned
- Tokens will not be stored in static HTML or public JavaScript
- Tokens can be stored encrypted or protected
- Listing data can be cached
- Sync can be scheduled or triggered manually
- Rate limit handling is planned
- 429 response retry/backoff is planned
- Error logging exists
- Manual disconnect / revoke process is planned

If any of these are missing, do not sell API sync as ready.

## 7. Seller requirements checklist

Before accepting an API client, confirm:

- Seller owns or controls the Etsy shop
- Seller authorizes the connection
- Seller understands API setup is optional
- Seller understands Starter Brand Page does not require API
- Seller understands approval/setup may take time
- Seller agrees to read-only first pilot
- Seller agrees no write actions are included unless separately scoped later
- Seller understands API sync is not guaranteed in every package
- Seller understands recurring maintenance may be needed

## 8. Business case questions

Ask:

1. How many active listings do you have?
2. How often do you add or update products?
3. Do prices or inventory change often?
4. Do you promote products through Instagram, Pinterest, Google, ads, or email?
5. Do you want a full catalog website or only a focused brand page?
6. Do you need your full catalog shown, or only selected best products?
7. Do you already have Etsy Developer access?
8. Are you comfortable creating an Etsy Developer app if needed?
9. Would read-only sync be enough for the first step?
10. What problem are you trying to solve with API support?

## 9. Recommended package matrix

### Studio Listing Refresh

Recommend when:

- Visuals are weak
- Listing count is low or moderate
- API would not solve the real problem
- Product presentation is the bottleneck

### Starter Brand Page

Recommend when:

- The seller needs a professional landing page
- Only selected products need to be featured
- Product updates are rare
- No API is required

### Manual Catalog System

Recommend when:

- The seller has multiple collections
- The catalog should be curated, not fully automatic
- Monthly support can handle updates
- API is not yet worth the setup

### API Readiness Audit

Recommend when:

- The seller asks about automation
- The shop has many listings
- The value of API is plausible but not proven
- Technical scope needs clarification

### Etsy API Setup Assist

Recommend when:

- The seller can create or provide developer access
- The seller has a real need for catalog support
- A limited read-only connection is acceptable

### Read-Only Catalog Sync Pilot

Recommend when:

- Backend is ready
- Client is suitable
- Scope is narrow
- Budget supports setup and monthly care

## 10. API readiness score

Give a final score out of 100.

Suggested weighting:

- Shop maturity: 20
- Catalog complexity: 20
- Update frequency: 15
- External traffic need: 15
- Technical readiness: 15
- Budget fit: 10
- Risk level: 5

Interpretation:

- 0-39: No API. Recommend Studio or Starter Brand Page.
- 40-59: Manual Catalog System or API Readiness Audit only.
- 60-79: Possible API Setup Assist candidate.
- 80-100: Strong Read-Only Catalog Sync Pilot candidate.

## 11. Red flags

Do not proceed if:

- Client asks for guaranteed Etsy approval
- Client wants automation without setup work
- Client wants buyer/order data too early
- Client wants write access before read-only proof
- Client will not confirm shop ownership
- Client cannot explain what API support should solve
- Client has too few listings to justify the cost
- Client expects API sync to be included for free

## 12. Final audit output template

Use this format:

### API Readiness Result

Shop:

Category:

Listing count:

Primary issue:

Best VitrinY direction:

API readiness score:

Recommendation:

Why:

What to do first:

What not to do yet:

Suggested package:

Estimated setup complexity:

Next action:

## 13. Example recommendation language

### If API is not needed

Your shop does not need API setup yet. The fastest improvement would be a curated Starter Brand Page or Studio Listing Refresh using selected products and Etsy listing links.

### If manual catalog is enough

A manual Catalog System is the safer first step. Your products can be organized into collections without the complexity of API setup. API support can be revisited later if updates become frequent.

### If API readiness is needed

API support may be useful, but the scope should be defined first. I recommend an API Readiness Audit before any technical setup.

### If pilot is suitable

Your shop is a good candidate for a limited read-only catalog sync pilot. The first version should only read shop and listing data, cache the catalog, and support VitrinY product sections. Write operations, order data, and buyer data should remain out of scope.

## 14. Internal rule

API is not the product by itself.

The product is a stronger Etsy brand system. API is only useful when it helps maintain or improve that brand system.
