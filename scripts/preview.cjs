const http = require('http');
const fs = require('fs');
const path = require('path');
const base = path.resolve(__dirname, '../build');
const port = Number(process.env.PORT || 4175);
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2', '.json':'application/json', '.asc':'application/pgp-keys' };
http.createServer((req,res)=>{
 let name;
 try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400);return res.end(); }
 let file = path.resolve(base,'.'+name);
 if(!file.startsWith(base+path.sep)) file = path.join(base,'index.html');
 if(!fs.existsSync(file) || !fs.statSync(file).isFile()) {
  if(path.extname(name)) {res.writeHead(404);return res.end('Not found');}
  file=path.join(base,'index.html');
 }
 res.writeHead(200,{'Content-Type': types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
 fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`IKELOS review preview: http://127.0.0.1:${port}`));
