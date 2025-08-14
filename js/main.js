document.addEventListener('DOMContentLoaded', () => {
  // marker aktiv lenke i nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path) a.classList.add('active');
  });
});
<script>
(function () {
  // Smooth-scroll for lenker som starter med #
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Modal åpne/lukke
  const modal = document.getElementById('cta-modal');
  const openBtn = document.getElementById('open-cta-modal');
  const closeBtn = document.getElementById('close-cta-modal');
  const closeEls = document.querySelectorAll('[data-close-modal]');
  let lastFocus;

  function openModal() {
    lastFocus = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    const firstField = modal.querySelector('input, textarea, select, button');
    if (firstField) firstField.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  closeEls.forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Enkel validering + fake innsending (erstatt senere med backend)
  const form = document.getElementById('cta-form');
  const success = document.getElementById('cta-success');

  function setError(name, msg) {
    const small = form.querySelector(`[data-error-for="${name}"]`);
    if (small) small.textContent = msg || '';
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hent felt
    const data = Object.fromEntries(new FormData(form));
    let ok = true;

    // Tøm feil
    ['name','email','topic','message'].forEach(k => setError(k, ''));

    // Sjekk
    if (!data.name || data.name.trim().length < 2) { setError('name','Skriv navnet ditt.'); ok=false; }
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) { setError('email','Skriv en gyldig e-post.'); ok=false; }
    if (!data.topic) { setError('topic','Velg et område.'); ok=false; }
    if (!data.message || data.message.trim().length < 12) { setError('message','Beskriv litt mer (minst 12 tegn).'); ok=false; }

    if (!ok) return;

    // (A) DEMO: vis suksess (her kobler vi senere til e-post/webhook)
    success.hidden = false;

    // (B) Bygg et kompakt sammendrag til eventuell e-post/webhook
    const payload = {
      ts: new Date().toISOString(),
      ...data,
      ua: navigator.userAgent
    };
    console.log('CTA submission:', payload);

    // (C) Nullstill felter pent
    form.reset();
    setTimeout(() => { closeModal(); success.hidden = true; }, 1200);
  });
})();
</script>