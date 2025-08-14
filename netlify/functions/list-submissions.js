// netlify/functions/list-submissions.js
export default async (request, context) => {
  const token = process.env.NETLIFY_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;
  const adminKey = process.env.ADMIN_KEY;

  // Sjekk admin-nøkkel fra header
  const clientKey = request.headers.get("x-admin-key");
  if (!adminKey || clientKey !== adminKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }

  if (!token || !siteId) {
    return new Response(JSON.stringify({ error: "Missing NETLIFY_TOKEN or NETLIFY_SITE_ID" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }

  const base = "https://api.netlify.com/api/v1";

  // Hent alle forms for siten og finn "contact"
  const formsRes = await fetch(`${base}/sites/${siteId}/forms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!formsRes.ok) {
    const txt = await formsRes.text();
    return new Response(JSON.stringify({ error: "Could not list forms", details: txt }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
  const forms = await formsRes.json();
  const form = forms.find(f => f.name === "contact");
  if (!form) {
    return new Response(JSON.stringify({
      error: 'Fant ikke form med name="contact". Send et skjema først, eller sjekk form-navn.'
    }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }

  // Hent innsendelser (ønsker du flere, øk per_page)
  const subsRes = await fetch(`${base}/forms/${form.id}/submissions?per_page=100`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!subsRes.ok) {
    const txt = await subsRes.text();
    return new Response(JSON.stringify({ error: "Could not list submissions", details: txt }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
  const subs = await subsRes.json();

  const data = subs.map(s => ({
    id: s.id,
    created_at: s.created_at,
    name: s.data?.name || "",
    email: s.data?.email || "",
    subject: s.data?.subject || "",
    message: s.data?.message || "",
  }));

  return new Response(JSON.stringify({ count: data.length, items: data }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store"
    }
  });
};