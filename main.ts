import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
const decoder = new TextDecoder("utf-8");
 
const listen = Deno.listen({ port: 80 })
for await (const conn of listen) {
    for await (const req of Deno.serveHttp(conn)) {
        let url = new URL(req.request.url);
        let path = url.pathname === "/" ? "/index.html" : url.pathname;
        let ext = path.substr(path.indexOf("."), path.length);
        let data = await Deno.readFile(`.${path}`);
        let res = null;
        switch (ext) {
            case ".html":
                res = new Response(decoder.decode(data));
                res.headers.set("content-type", "text/html");
                break;
            case ".css":
                res = new Response(decoder.decode(data));
                res.headers.set("content-type", "text/css");
                break;
            case ".js":
                res = new Response(decoder.decode(data));
                res.headers.set("content-type", "application/javascript");
                break;
            case ".png":
                res = new Response(data);
                res.headers.set("content-type", "image/png");
                break;
            case ".ico":
                res = new Response(data);
                res.headers.set("content-type", "image/x-icon");
                break;
            case ".jpg":
                res = new Response(data);
                res.headers.set("content-type", "image/jpeg");
                break;
        }
        req.respondWith(res);
    }
}