// Local preview of site/ with no dependencies: npm run serve, then open the
// printed address. PORT=8080 npm run serve picks another port.
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { root } from "./lib/paths.mjs";

const SITE = root("site");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".pdf": "application/pdf", ".md": "text/markdown; charset=utf-8",
  ".csv": "text/csv; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(SITE, path));
  if (!file.startsWith(SITE)) { res.writeHead(403).end(); return; }
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
    statSync(file);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
});

const port = Number(process.env.PORT) || 4173;
server.listen(port, () => console.log(`Serving site/ at http://localhost:${port}`));
