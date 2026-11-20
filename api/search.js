// language: JavaScript, file: api/search.js, runtime: Vercel
const UPSTREAM = "https://api.consumet.org/anime/gogoanime";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const q = new URL(req.url, "http://x").searchParams.get("q");
  if (!q) return res.status(400).json({ error: "missing query" });

  try {
    const r = await fetch(`${UPSTREAM}/${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error(`upstream ${r.status}`);
    const d = await r.json();
    res.status(200).json({
      results: (d.results || []).map(a => ({ id: a.id, title: a.title, image: a.image }))
    });
  } catch (e) {
    res.status(502).json({ error: "Failed to fetch from Consumet. Try again." });
  }
}