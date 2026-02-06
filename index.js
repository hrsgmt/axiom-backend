import http from "http";

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("RENDER SERVER IS RUNNING\n");
}).listen(process.env.PORT || 4000, "0.0.0.0");
