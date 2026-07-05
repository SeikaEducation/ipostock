// Data access for IPO listings stored in Supabase.
// Fetched via the Supabase REST (PostgREST) API on the server so the
// credentials never reach the browser bundle.

export type IpoListing = {
  id: number;
  code: string;
  company_name: string;
  market: string | null;
  bb_period: string | null;
  listing_date: string | null;
  estimated_price: string | null;
  interim_condition: string | null;
  offering_price: string | null;
  initial_price: string | null;
  rating: string | null;
  lead_broker: string | null;
  sub_brokers: string[] | null;
  created_at: string;
};

export async function getIpoListings(): Promise<IpoListing[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY. Add them to .env.local.",
    );
  }

  // Most recent listings first, matching the source app's ordering.
  const endpoint = `${url}/rest/v1/ipo_listings?select=*&order=listing_date.desc`;

  const res = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    // Always read fresh data at request time (fetch is uncached by default
    // in this Next.js version, but we make the intent explicit).
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase request failed (${res.status}): ${body}`);
  }

  return res.json();
}
