import { serve } from "https://deno.land/std@0.177.0/http/server.ts";


serve((req: Request) => new Response("./index.html"));