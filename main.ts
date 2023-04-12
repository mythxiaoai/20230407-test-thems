import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const getContentType = (name: string) => {
  if (name.endsWith('.js')) {
    return 'text/javascript';
  }
  if (name.endsWith('.css')) {
    return 'text/css';
  }
  if (name.endsWith('.html')) {
    return 'text/html; charset=utf-8';
  }
  return 'charset=utf-8';
}

const fileNameMap = {
  '/': 'index.html',
  '/test.js': 'test.js',
  '/partytown.js': 'partytown.js',
  '/partytown-atomics.js': 'partytown-atomics.js',
  '/partytown-media.js': 'partytown-media.js',
  '/partytown-sandbox-sw.js': 'partytown-sandbox-sw.js',
  '/partytown-sw.js': 'partytown-sw.js',
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // url.host = 'mslynnhair.com';
  // url.host = 'performance1.myshopline.com';
  const fileName = fileNameMap[url.pathname];

  if (fileName) {
    const file = await Deno.readFile(`./${fileName}`);
    return new Response(file, {
      headers: {
        "content-type": getContentType(fileName)
      },
    });
  }

  const res = await fetch(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  const headers = new Headers(res.headers);
  // headers.set('cross-origin-embedder-policy', 'credentialless');
  // headers.set('cross-origin-opener-policy', 'same-origin');
  
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

serve(handleRequest);