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