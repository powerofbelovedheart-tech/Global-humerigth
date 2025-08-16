<script>
  // Mobilmeny
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Aktiv lenke i nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href && href.endsWith(here)) a.classList.add('is-active');
  });

  // Årstall footer
  document.getElementById('y')?.append(new Date().getFullYear());
</script>
// Demo for "Spør AI"
const aiForm = document.getElementById('aiForm');
if (aiForm) {
  aiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('aiQuestion').value.trim();
    const box = document.getElementById('aiAnswer');
    if (!q) { box.classList.add('hidden'); return; }

    box.innerHTML = `
      <p><strong>Du spurte:</strong> ${q}</p>
      <p class="mt-2">⚡️ Demo-svar: Her vil du få kort forklaring, relevante paragrafer og forslag til setninger du kan bruke.
      Inntil videre viser vi spørsmålet tilbake.</p>`;
    box.classList.remove('hidden');
  });
}
