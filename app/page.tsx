import { getIpoListings } from "@/app/lib/ipo";
import IpoTable from "@/app/components/IpoTable";

export default async function Home() {
  let listings;
  let error: string | null = null;

  try {
    listings = await getIpoListings();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-6xl px-6 py-12">
        {error ? (
          <div className="rounded-lg border-2 border-red-400 bg-red-50 p-6 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
            <strong>⚠️ Something went wrong.</strong>
            <p className="mt-2 text-sm">Please check the configuration.</p>
          </div>
        ) : (
          <IpoTable listings={listings ?? []} />
        )}
      </main>
    </div>
  );
}
