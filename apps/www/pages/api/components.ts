import { NextApiRequest, NextApiResponse } from "next";

import components from "./components.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // The payload only changes on deploy; cache at the CDN for a day so
  // repeat requests don't hit the function.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800"
  );
  return res.status(200).json(components);
}
