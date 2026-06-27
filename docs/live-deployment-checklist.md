# VitrinY Live Deployment Checklist

Use this checklist whenever the public website does not match the repository content.

## 1. Current intended live system

The live public website should show the new VitrinY Etsy brand system:

- Home: Etsy brand websites, visual systems, and safe Etsy checkout flow
- Commerce: Etsy brand website and optional API-supported catalog assistance
- Studio: Etsy listing visuals, mockups, and product visual systems
- Audit: Free Etsy brand / visual audit with demo direction selection
- Showcase: three primary demo systems
- Fashion demo: Editorial Lookbook
- Jewelry demo: Gift Story
- Home demo: Interior Room Mood

## 2. Pages that must be live

Primary URLs:

- https://vitriny.com.tr/
- https://vitriny.com.tr/etsy.html
- https://vitriny.com.tr/studio.html
- https://vitriny.com.tr/audit.html
- https://vitriny.com.tr/portfolio.html
- https://vitriny.com.tr/demo-fashion-editorial.html
- https://vitriny.com.tr/demo-jewelry-gift.html
- https://vitriny.com.tr/demo-home-interior.html

Redirect URLs:

- https://vitriny.com.tr/demo-fashion.html -> demo-fashion-editorial.html
- https://vitriny.com.tr/demo-jewelry.html -> demo-jewelry-gift.html
- https://vitriny.com.tr/demo-home-decor.html -> demo-home-interior.html
- https://vitriny.com.tr/demo-business-2.html -> demo-home-interior.html

## 3. Public content that should not remain on the live site

The live public site should not lead with these old claims:

- Official 2026 Launch
- We unify sales, traffic and brand control into one system
- Catalog stays updated
- We handle Etsy Open API integration
- Large general agency / resources / journal positioning as the main homepage

These claims can create confusion or overpromise API automation.

## 4. Safe API wording

Use:

- Optional Etsy API Sync
- API support can be added carefully
- Starter brand pages do not require API setup
- API support is an optional add-on after approval, authorization, and technical connection
- No automatic sync claim in every package

Avoid:

- Automatic catalog sync included
- Catalog always stays updated
- Full Etsy automation
- Guaranteed API approval
- No setup needed

## 5. GitHub Pages checks

Confirm:

- Repository: lunaisellc-bot/shopgy
- Branch: main
- Publish folder: root
- CNAME exists and contains vitriny.com.tr
- .nojekyll exists
- index.html is the new VitrinY brand system page
- sitemap.xml lists the new URLs
- robots.txt points to the sitemap

## 6. DNS / hosting checks

If the live website still shows old content after a fresh commit:

1. Check whether vitriny.com.tr is actually pointing to GitHub Pages.
2. Check whether another hosting provider, CDN, or cache is serving older files.
3. Check GitHub Pages settings for the repository source.
4. Clear external CDN cache if one exists.
5. Wait a few minutes after commit, then test with a hard refresh or private browser.

## 7. Live verification steps

After deployment, check these visible phrases:

Home should show:

- Turn your Etsy shop into a brand system
- Fashion / Apparel: Editorial Lookbook
- Jewelry: Close-up Gift Story
- Home Decor: Interior Room Mood

Commerce should show:

- A professional website for your Etsy shop
- Optional Etsy API Sync
- No automatic claim

Studio should show:

- Upgrade your Etsy listing visuals without a photoshoot
- Listing Refresh
- Product Launch Kit

Audit should show:

- Which direction fits your shop?
- Fashion Editorial Lookbook
- Jewelry Gift Story
- Home Interior / Room Mood

Portfolio should show:

- Editorial lookbook system
- Close-up gift story system
- Interior magazine system

## 8. Decision rule

Do not start outreach until the public live site matches the repository strategy.
