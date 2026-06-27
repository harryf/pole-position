// Tiny static dev server (bun). Serves the repo root so the service worker and
// PeerJS work over http. Usage: bun tests/serve.ts [port]
const root = new URL("..", import.meta.url).pathname;
const port = Number(Bun.argv[2] || 8731);
const types: Record<string, string> = {
  html: "text/html", js: "text/javascript", json: "application/json",
  webmanifest: "application/manifest+json", png: "image/png", svg: "image/svg+xml",
  css: "text/css", ico: "image/x-icon", txt: "text/plain",
};
Bun.serve({
  port,
  async fetch(req) {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (p === "/" || p.endsWith("/")) p += "index.html";
    const file = Bun.file(root + p.replace(/^\//, ""));
    if (!(await file.exists())) return new Response("404", { status: 404 });
    const ext = p.split(".").pop() || "";
    return new Response(file, { headers: { "content-type": types[ext] || "application/octet-stream" } });
  },
});
console.log(`serving ${root} on http://localhost:${port}`);
