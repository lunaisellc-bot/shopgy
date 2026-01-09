// scripts/etsy-sync.mjs
// Node 20+ (fetch built-in)

import fs from "node:fs/promises";

const {
  ETSY_CLIENT_ID,
  ETSY_CLIENT_SECRET,
  ETSY_REFRESH_TOKEN,
  ETSY_SHOP_ID,
} = process.env;

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`Missing env: ${name}`);
}
["ETSY_CLIENT_ID", "ETSY_CLIENT_SECRET", "ETSY_REFRESH_TOKEN", "ETSY_SHOP_ID"].forEach(requireEnv);

// Etsy docs: token endpoint + refresh_token grant is form-urlencoded
// https://api.etsy.com/v3/public/oauth/token :contentReference[oaicite:1]{index=1}
async function refreshAccessToken() {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: ETSY_CLIENT_ID,
    refresh_token: ETSY_REFRESH_TOKEN,
  });

  const res = await fetch("https://api.etsy.com/v3/public/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Token refresh failed: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json(); // { access_token, token_type, expires_in, refresh_token? }
}

// Request standards: x-api-key contains "keystring:shared_secret", and Bearer token required for scoped endpoints. :contentReference[oaicite:2]{index=2}
function etsyHeaders(accessToken) {
  return {
    "x-api-key": `${ETSY_CLIENT_ID}:${ETSY_CLIENT_SECRET}`,
    "authorization": `Bearer ${accessToken}`,
    "accept": "application/json",
  };
}

async function fetchJson(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

// NOTE: Endpoint paths are per Etsy Open API v3 conventions (api.etsy.com/v3/application/...). :contentReference[oaicite:3]{index=3}
async function getActiveListings(shopId, headers) {
  const limit = 100;
  let offset = 0;
  let out = [];

  while (true) {
    const url = `https://api.etsy.com/v3/application/shops/${shopId}/listings/active?limit=${limit}&offset=${offset}`;
    const data = await fetchJson(url, headers);

    const results = data?.results ?? [];
    out.push(...results);

    if (results.length < limit) break;
    offset += limit;
  }
  return out;
}

async function getListingImages(listingId, headers) {
  const url = `https://api.etsy.com/v3/application/listings/${listingId}/images`;
  const data = await fetchJson(url, headers);
  return data?.results ?? [];
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const token = await refreshAccessToken();
  const accessToken = token.access_token;
  if (!accessToken) throw new Error("No access_token returned.");

  const headers = etsyHeaders(accessToken);

  const listings = await getActiveListings(ETSY_SHOP_ID, headers);

  // Basit concurrency limiter
  const concurrency = 6;
  let i = 0;
  const products = [];

  async function worker() {
    while (i < listings.length) {
      const idx = i++;
      const l = listings[idx];

      const listingId = l.listing_id;
      const title = l.title;
      const url = l.url; // Etsy listing URL
      const price = l.price?.amount ? Number(l.price.amount) / (10 ** (l.price.divisor ?? 2)) : null;
      const currency = l.price?.currency_code ?? null;

      const images = await getListingImages(listingId, headers).catch(() => []);
      const imageUrls = images
        .map(im => im.url_fullxfull || im.url_570xN || im.url_170x135 || im.url_75x75)
        .filter(Boolean);

      const slug = slugify(title) || String(listingId);

      products.push({
        id: listingId,
        slug,
        title,
        url,
        price,
        currency,
        images: imageUrls,
        // İsterseniz buraya tags/description/variations gibi alanları da ekleriz
      });
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  // Stabil sıralama (title)
  products.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

  const payload = {
    shop: "Vitrinybridge",
    shop_id: ETSY_SHOP_ID,
    updated_at: new Date().toISOString(),
    count: products.length,
    products,
  };

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile("data/products.json", JSON.stringify(payload, null, 2), "utf8");
  await fs.writeFile("data/products.min.json", JSON.stringify(payload), "utf8");

  console.log(`Synced ${products.length} products.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
