// language: JavaScript, file: api/watch.js, runtime: Vercel
const UPSTREAM = "https://api.consumet.org/anime/gogoanime/watch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const episodeId = new URL(req.url, "http://x").searchParams.get("episodeId");
  if (!episodeId) return res.status(400).json({ error: "missing episodeId" });

  try {
    const r = await fetch(`${UPSTREAM}/${encodeURIComponent(episodeId)}`);
    if (!r.ok) throw new Error(`upstream ${r.status}`);
    const d = await r.json();
    res.status(200).json({
      sources: d.sources || [],
      subtitles: (d.subtitles || []).map(s => ({ lang: s.lang, url: s.url }))
    });
  } catch (e) {
    res.status(502).json({ error: "Failed to get stream link. Server may be busy." });
  }
}