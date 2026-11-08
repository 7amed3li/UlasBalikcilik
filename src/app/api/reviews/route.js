import { platforms as initialPlatforms, reviewsList as initialReviews } from "@/data/reviewsData";

export async function GET() {
  return Response.json(
    {
      platforms: initialPlatforms,
      reviews: initialReviews,
      aggregateRating: "4.8",
      totalReviewsCount: "558",
      source: "verified_summary",
      lastSynced: new Date().toISOString(),
      cached: true,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
