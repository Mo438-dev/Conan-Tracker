// Shared watched list for the Conan tracker, stored in Upstash Redis (one hash: id -> YYYY-MM-DD)
const DB_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const DB_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'conan:watched';

async function redis(cmd) {
  const r = await fetch(DB_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + DB_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!DB_URL || !DB_TOKEN) return res.status(500).json({ error: 'database not connected' });
  try {
    if (req.method === 'GET') {
      const arr = (await redis(['HGETALL', KEY])) || [];
      const out = {};
      for (let i = 0; i < arr.length; i += 2) out[arr[i]] = arr[i + 1];
      return res.status(200).json(out);
    }
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { id, date } = body;
      if (typeof id !== 'string' || !/^[EM]\d+(-\d+)?$/.test(id)) return res.status(400).json({ error: 'bad id' });
      if (date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'bad date' });
        await redis(['HSET', KEY, id, date]);
      } else {
        await redis(['HDEL', KEY, id]);
      }
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
