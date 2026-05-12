const RICKROLL_URL = 'https://www.youtube.com/watch?v=QDia3e12czc';
const KV_KEY = 'count';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/rickroll-count') {
      const count = (await env.RICKROLL_COUNTER.get(KV_KEY)) ?? '0';
      return new Response(JSON.stringify({ count: parseInt(count, 10) }), { headers: CORS });
    }

    if (url.pathname === '/portfolio') {
      const current = parseInt((await env.RICKROLL_COUNTER.get(KV_KEY)) ?? '0', 10);
      // fire-and-forget: don't block the redirect on the write
      env.RICKROLL_COUNTER.put(KV_KEY, String(current + 1));
      return Response.redirect(RICKROLL_URL, 302);
    }

    return new Response('Not found', { status: 404 });
  },
};
