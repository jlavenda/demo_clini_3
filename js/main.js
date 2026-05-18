/* ═══════════════════════════════════════════
   Dentsolano Soacha — Scripts principales
   Desarrollado por Libeldata
═══════════════════════════════════════════ */

  // Navbar transparente → blanco al scroll
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const halfway = document.body.scrollHeight / 2;
    if(window.scrollY > halfway){
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
  scrollTopBtn.addEventListener('mouseover', ()=>{ scrollTopBtn.style.background='#1F2D3D'; });
  scrollTopBtn.addEventListener('mouseout',  ()=>{ scrollTopBtn.style.background='rgba(31,45,61,.75)'; });

  // Testimonials carousel
  const testimonials = [
    {
      quote: "Me hicieron el blanqueamiento dental y el resultado superó mis expectativas. El proceso fue muy cómodo y el equipo estuvo atento en cada momento. Llegué con dientes opacos y salí con una sonrisa que no podía parar de mostrar.",
      name: "Marcela Ospina", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"M",
      color: "linear-gradient(135deg,#F5DFC0,#C09060)"
    },
    {
      quote: "Me pusieron un implante dental y quedé completamente satisfecho. Me explicaron cada paso del proceso y el resultado es perfecto. Los precios son muy accesibles para la calidad que ofrecen.",
      name: "Rodrigo Vargas", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"R",
      color: "linear-gradient(135deg,#FED7C4,#E8A48E)"
    },
    {
      quote: "Vine por un diseño de sonrisa y fue la mejor decisión. Las carillas quedaron hermosas y naturalísimas. El equipo de Dentsolano es muy profesional y se nota que les importa cada paciente.",
      name: "Andrea Moreno", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"A",
      color: "linear-gradient(135deg,#D9D2F0,#9F92D6)"
    },
    {
      quote: "Tenía miedo de la cirugía de muela del juicio pero fue una experiencia muy tranquila. Cero dolor durante el procedimiento y la recuperación fue rápida. Totalmente recomendados.",
      name: "Felipe Cárdenas", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"F",
      color: "linear-gradient(135deg,#C9E0F2,#7DA9CC)"
    },
    {
      quote: "Me hicieron una prótesis dental y quedé muy contenta. La atención fue cálida desde el primer momento y el ajuste quedó perfecto. Se nota que trabajan con dedicación y profesionalismo.",
      name: "Luz Marina Torres", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"L",
      color: "linear-gradient(135deg,#F5D5DD,#D695A4)"
    },
    {
      quote: "Las carillas de porcelana cambiaron completamente mi sonrisa. Ahora sonrío con seguridad. El trabajo fue impecable y el equipo muy paciente con todas mis preguntas. Gracias Dentsolano.",
      name: "Carolina Ríos", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"C",
      color: "linear-gradient(135deg,#D5EAD5,#80B890)"
    }
  ];

  const dotsEl = document.getElementById('testDots');
  let current = 0;
  testimonials.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i===0?' active':'');
    d.addEventListener('click', () => render(i));
    dotsEl.appendChild(d);
  });

  function render(i){
    current = (i + testimonials.length) % testimonials.length;
    const t = testimonials[current];
    const card = document.getElementById('testCard');
    card.style.opacity = 0;
    setTimeout(()=>{
      document.getElementById('testQuote').textContent = t.quote;
      document.getElementById('testName').textContent = t.name;
      document.getElementById('testLoc').textContent = t.loc;
      document.getElementById('ratingNum').textContent = t.rating;
      const av = document.getElementById('testAvatar');
      av.textContent = t.initial;
      av.style.background = t.color;
      [...dotsEl.children].forEach((d,idx)=>d.classList.toggle('active', idx===current));
      card.style.opacity = 1;
    }, 150);
  }

  // Reveal del test-card
  const testCardEl = document.getElementById('testCard');
  testCardEl.style.opacity = '0';
  testCardEl.style.transform = 'translateY(22px)';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    testCardEl.style.transition = 'opacity .65s ease, transform .65s ease';
    new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        testCardEl.style.opacity = '1';
        testCardEl.style.transform = 'translateY(0)';
        setTimeout(()=>{ testCardEl.style.transition = 'opacity .25s'; }, 700);
      }
    }, {threshold: 0.15}).observe(testCardEl);
  }));

  document.getElementById('prevBtn').addEventListener('click', ()=>{
    document.getElementById('prevBtn').classList.add('active');
    document.getElementById('nextBtn').classList.remove('active');
    render(current-1);
  });
  document.getElementById('nextBtn').addEventListener('click', ()=>{
    document.getElementById('nextBtn').classList.add('active');
    document.getElementById('prevBtn').classList.remove('active');
    render(current+1);
  });
  setInterval(()=>render(current+1), 7000);

  function handleSubmit(e){
    e.preventDefault();
    const btn = e.target.querySelector('.send-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
    btn.style.background = '#6b5135';
    setTimeout(()=>{
      btn.innerHTML = original; btn.style.background='';
      e.target.reset();
    }, 2400);
    return false;
  }

  // ── Service card highlight desde footer ──
  document.querySelectorAll('a[href^="#svc-"]').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const card = document.querySelector(targetId);
      if(!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if('onscrollend' in window){
        window.addEventListener('scrollend', () => {
          card.classList.add('svc-flash');
          card.addEventListener('animationend', () => {
            card.classList.remove('svc-flash');
          }, { once: true });
        }, { once: true });
      } else {
        setTimeout(() => {
          card.classList.add('svc-flash');
          card.addEventListener('animationend', () => {
            card.classList.remove('svc-flash');
          }, { once: true });
        }, 1000);
      }
    });
  });

  // ── Hamburguesa mobile ──
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'}); }
      }
    });
  });
