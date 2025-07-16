import type { NextApiRequest, NextApiResponse } from "next";
import sql from "@/app/lib/db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await sql`SELECT NOW()`;
    res.status(200).json({ now: result[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
}
