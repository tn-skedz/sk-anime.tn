// language: JavaScript, file: api/episodes.js, runtime: Vercel
const UPSTREAM = "https://api.consumet.org/anime/gogoanime/info";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = new URL(req.url, "http://x").searchParams.get("id");
  if (!id) return res.status(400).json({ error: "missing id" });

  try {
    const r = await fetch(`${UPSTREAM}/${encodeURIComponent(id)}`);
    if (!r.ok) throw new Error(`upstream ${r.status}`);
    const d = await r.json();
    res.status(200).json({
      episodes: (d.episodes || []).map(e => ({ id: e.id, number: e.number }))
    });
  } catch (e) {
    res.status(502).json({ error: "Failed to fetch episodes." });
  }
}