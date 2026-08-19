/* ==========================================================================
   OPERATA AI - LANDING PAGE INTERACTION ENGINE (ULTRA-DYNAMIC EDITION)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. HERO PARTICLE & MESH CANVAS --- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 153, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* --- 2. MOUSE TRACKING SPOTLIGHT EFFECT --- */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* --- 3. SCROLL REVEAL & ANIMATED NUMBERS COUNTER --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Count-up counter for metrics
  const counterElements = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        const targetNum = parseInt(entry.target.dataset.counter);
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        let current = 0;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
          }
          entry.target.textContent = Math.round(current).toLocaleString('es-CO');
        }, stepTime);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  /* --- 4. HERO SIMULATOR SCENARIOS --- */
  const simTabBtns = document.querySelectorAll('.sim-tab');
  const chatContainer = document.getElementById('sim-chat-container');
  const actionStepList = document.getElementById('sim-action-steps');

  const scenarioData = {
    devolucion: {
      userQuery: "Hola, compré una chaqueta talla L hace 2 días (Pedido #COL-98421) y me quedó grande. ¿Puedo cambiarla o solicitar reembolso?",
      agentResponse: "¡Hola Camilo! Con gusto. Ya verifiqué tu pedido en nuestro ERP y CRM. Tu producto aplica para devolución gratuita. Acabo de generar la guía de transporte con Servientrega (#99482011) y procesé la reserva de la talla M en bodega. ¿Deseas que envíe el código QR a este WhatsApp?",
      steps: [
        { name: "Verificar Cliente & Pedido", desc: "API Siigo ERP: Estado 'Entregado' - 48h transcurridas", badge: "ERP READ" },
        { name: "Validar Política de Reembolso", desc: "Regla de Negocio: Cumple ventana de 30 días", badge: "RULE MATCH" },
        { name: "Generar Guía de Envío", desc: "API Servientrega: Guía #99482011 emitida", badge: "LOGISTICS API" },
        { name: "Actualizar Estado en CRM", desc: "HubSpot/Salesforce: Ticket #8841 actualizado", badge: "CRM WRITE" }
      ]
    },
    factura: {
      userQuery: "Buenas tardes, necesito la factura electrónica de mi última compra empresarial para la contabilidad de la empresa.",
      agentResponse: "Hola María. Localicé tu NIT 901.482.119-3 y la compra realizada el 10 de Agosto. He generado el archivo XML y PDF validado por la DIAN y lo acabo de enviar a tu correo registrado (contabilidad@empresa.co).",
      steps: [
        { name: "Consulta de NIT & Tercero", desc: "Base de Datos DIAN / ERP Local", badge: "DB LOOKUP" },
        { name: "Generación de Documento XML", desc: "Módulo de Facturación Electrónica DIAN", badge: "DIAN API" },
        { name: "Envío por Correo & WhatsApp", desc: "SMTP Server & WhatsApp Business Cloud", badge: "DISPATCH" },
        { name: "Registro en Audit Log", desc: "Trazabilidad guardada: Event ID #LOG-3309", badge: "AUDIT LOG" }
      ]
    },
    soporte: {
      userQuery: "Mi servicio de internet corporativo está caído desde hace 20 minutos en la sede del Poblado, Medellín.",
      agentResponse: "Lamento el inconveniente. Ejecuté un diagnóstico remoto en el router de tu sede: detecté pérdida de señal en el nodo local. Creé el ticket prioritario #TK-40291 en Zendesk y asigné la cuadrilla técnica en zona. ETA de llegada: 35 min.",
      steps: [
        { name: "Ping & Diagnóstico IoT", desc: "SNMP Protocol: Pérdida de paquetes en Nodo MDE-04", badge: "IOT DIAG" },
        { name: "Creación de Ticket Prioritario", desc: "Zendesk API: Urgencia Alta / SLA 1 Hora", badge: "HELPDESK" },
        { name: "Despacho de Cuadrilla", desc: "Field Service Management API: Asignado a Técnico #44", badge: "DISPATCH" },
        { name: "Notificación a Gerente", desc: "Alerta SMS / WhatsApp al CTO", badge: "ALERT" }
      ]
    }
  };

  function renderScenario(key) {
    const data = scenarioData[key];
    if (!data || !chatContainer || !actionStepList) return;

    chatContainer.innerHTML = `
      <div class="whatsapp-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.334 5.003l-1.417 5.176 5.301-1.39a9.96 9.96 0 004.77 1.213h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.039-5.176-2.926-7.063a9.92 9.92 0 00-7.059-2.938z"/></svg>
        WhatsApp Business Cloud API
      </div>
      <div class="chat-bubble chat-user">${data.userQuery}</div>
      <div class="chat-bubble chat-agent">
        <strong>Operata AI Agent:</strong><br>${data.agentResponse}
      </div>
    `;

    actionStepList.innerHTML = data.steps.map((step, idx) => `
      <div class="action-step ${idx === 0 ? 'active' : ''}">
        <div class="action-icon">${idx + 1}</div>
        <div class="action-info">
          <h5>${step.name}</h5>
          <p>${step.desc}</p>
        </div>
        <span class="action-badge">${step.badge}</span>
      </div>
    `).join('');
  }

  simTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderScenario(btn.dataset.scenario);
    });
  });

  renderScenario('devolucion');

  /* --- 5. BATTLE ARENA (BOT TRADICIONAL VS OPERATA) --- */
  const battleBtns = document.querySelectorAll('.battle-btn');
  const battleTradText = document.getElementById('battle-trad-text');
  const battleOperataText = document.getElementById('battle-operata-text');

  const battleCases = {
    cambio: {
      trad: "No puedo realizar cambios directamente por este medio. Por favor descargue nuestro PDF de políticas de cambio en www.tienda.com/politicas o acérquese a una tienda física con su factura impresa en horario de 8am a 5pm.",
      operata: "✅ ¡Cambio autorizado en 1.2s! Consulté tu factura #9841 en Siigo ERP, reservé la talla M en bodega Bogotá y envié el código QR de Servientrega a tu WhatsApp."
    },
    factura: {
      trad: "Para solicitar su factura electrónica por favor envíe un correo a facturacion@empresa.com adjuntando su RUT actualizado. El tiempo de respuesta es de 3 a 5 días hábiles.",
      operata: "⚡ ¡Documento emitido! Verifiqué tu NIT 901.482.119 en la DIAN, generé el XML/PDF validado y te lo adjunté por este chat y a tu correo corporativo."
    },
    cita: {
      trad: "Nuestra agenda se encuentra ocupada. Por favor vuelva a intentar ingresar a nuestro portal web mañana a primera hora para verificar disponibilidad.",
      operata: "📅 ¡Cita agendada! Consulté la agenda en tiempo real de tu especialista asignado, agendé la cita para este Jueves 10:00 AM y envié la invitación a tu Google Calendar."
    }
  };

  battleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      battleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const c = btn.dataset.case;
      if (battleCases[c]) {
        battleTradText.innerHTML = battleCases[c].trad;
        battleOperataText.innerHTML = battleCases[c].operata;
      }
    });
  });

  /* --- 6. WORKFLOW SANDBOX & LIVE TERMINAL CONSOLE --- */
  const pipelineNodes = document.querySelectorAll('.pipeline-node');
  const terminalConsole = document.getElementById('terminal-console');
  const runWorkflowBtn = document.getElementById('run-workflow-btn');

  const nodeLogs = {
    trigger: [
      "[06:38:10] INFO  Incoming webhook received from Meta WhatsApp Cloud API",
      "[06:38:10] INFO  User phone: +57 310 892 4410 (Bogotá, Colombia)",
      "[06:38:10] SUCCESS Session authenticated (Session Token #TK-88912)"
    ],
    rbac: [
      "[06:38:11] INFO  Evaluating RBAC Governance Rules (Policy ID #POL-2026)",
      "[06:38:11] SUCCESS Action 'PROCESS_REFUND' authorized (Limit threshold: $500.000 COP)",
      "[06:38:11] INFO  Data Encryption: TLS 1.3 / AES-256 enabled"
    ],
    erp: [
      "[06:38:12] POST /api/v2/siigo/refund HTTP/1.1",
      "[06:38:12] Host: api.siigo.com",
      "[06:38:12] SUCCESS Response 200 OK (Latency: 38ms) - Transaction #TX-99824 Created"
    ],
    audit: [
      "[06:38:13] INFO  Writing immutable Audit Log entry...",
      "[06:38:13] SUCCESS Event #LOG-99201 committed to Ledger Database",
      "[06:38:13] SUCCESS PDF Receipt generated & dispatched to customer WhatsApp"
    ]
  };

  function appendLogLines(lines) {
    lines.forEach(line => {
      const div = document.createElement('div');
      div.className = 'log-line';
      if (line.includes('SUCCESS')) div.className += ' log-success';
      else if (line.includes('INFO')) div.className += ' log-info';
      else div.className += ' log-warn';
      div.textContent = line;
      terminalConsole.appendChild(div);
    });
    terminalConsole.scrollTop = terminalConsole.scrollHeight;
  }

  pipelineNodes.forEach(node => {
    node.addEventListener('click', () => {
      pipelineNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const step = node.dataset.step;
      if (nodeLogs[step]) {
        terminalConsole.innerHTML = '';
        appendLogLines(nodeLogs[step]);
      }
    });
  });

  if (runWorkflowBtn) {
    runWorkflowBtn.addEventListener('click', () => {
      terminalConsole.innerHTML = '<div class="log-line log-info">=== INICIANDO PRUEBA DE CONCEPTO EN VIVO ===</div>';
      let delay = 0;
      Object.keys(nodeLogs).forEach((stepKey, idx) => {
        setTimeout(() => {
          pipelineNodes.forEach(n => n.classList.remove('active'));
          if (pipelineNodes[idx]) pipelineNodes[idx].classList.add('active');
          appendLogLines(nodeLogs[stepKey]);
        }, delay);
        delay += 800;
      });
    });
  }

  /* --- 7. PRICING & ROI CALCULATOR CHART --- */
  let currentCurrency = 'COP';
  let currentCycle = 'annual';

  const currencyBtns = document.querySelectorAll('[data-currency]');
  const cycleBtns = document.querySelectorAll('[data-cycle]');

  const planPrices = {
    starter: { USD: { monthly: 249, annual: 199 }, COP: { monthly: "990.000", annual: "790.000" } },
    pro: { USD: { monthly: 599, annual: 479 }, COP: { monthly: "2.390.000", annual: "1.890.000" } },
    business: { USD: { monthly: 1299, annual: 999 }, COP: { monthly: "4.990.000", annual: "3.990.000" } },
    enterprise: { USD: { monthly: "Custom", annual: "Custom" }, COP: { monthly: "Personalizado", annual: "Personalizado" } }
  };

  function updatePrices() {
    document.querySelectorAll('.pricing-card').forEach(card => {
      const planKey = card.dataset.plan;
      const priceElement = card.querySelector('.plan-price');
      const currencySymbolElement = card.querySelector('.plan-currency');
      const periodElement = card.querySelector('.plan-period');

      if (!planPrices[planKey]) return;

      const priceVal = planPrices[planKey][currentCurrency][currentCycle];
      
      if (typeof priceVal === 'number') {
        currencySymbolElement.textContent = '$';
        priceElement.textContent = priceVal.toLocaleString(currentCurrency === 'USD' ? 'en-US' : 'es-CO');
        periodElement.textContent = currentCycle === 'annual' ? '/mes (facturado anualmente)' : '/mes';
      } else {
        currencySymbolElement.textContent = '';
        priceElement.textContent = priceVal;
        periodElement.textContent = 'Según necesidades corporativas';
      }
    });
  }

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.dataset.currency;
      updatePrices();
      calculateROI();
    });
  });

  cycleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cycleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCycle = btn.dataset.cycle;
      updatePrices();
    });
  });

  // ROI Slider & SVG Chart
  const ticketSlider = document.getElementById('ticket-slider');
  const ticketValueDisplay = document.getElementById('ticket-value-display');
  const savingsDisplay = document.getElementById('roi-savings-display');
  const hoursDisplay = document.getElementById('roi-hours-display');
  const roiSvgBars = document.querySelectorAll('.roi-chart-bar');

  function calculateROI() {
    if (!ticketSlider) return;
    const tickets = parseInt(ticketSlider.value);
    ticketValueDisplay.textContent = tickets.toLocaleString('es-CO');

    const automatedTickets = tickets * 0.72;
    const hoursSaved = Math.round((automatedTickets * 12) / 60);

    if (currentCurrency === 'COP') {
      const copSavings = Math.round(automatedTickets * 9600);
      savingsDisplay.textContent = '$ ' + copSavings.toLocaleString('es-CO') + ' COP';
    } else {
      const usdSavings = Math.round(automatedTickets * 2.45);
      savingsDisplay.textContent = '$ ' + usdSavings.toLocaleString('en-US') + ' USD';
    }

    if (hoursDisplay) hoursDisplay.textContent = hoursSaved.toLocaleString('es-CO') + ' horas humanas/mes';

    // Update SVG chart bar heights dynamically
    const ratio = tickets / 100000;
    roiSvgBars.forEach((bar, idx) => {
      const factor = (idx + 1) / roiSvgBars.length;
      const height = Math.max(10, Math.round(80 * ratio * factor));
      bar.setAttribute('height', height);
      bar.setAttribute('y', 90 - height);
    });
  }

  if (ticketSlider) {
    ticketSlider.addEventListener('input', calculateROI);
    calculateROI();
  }

  /* --- 8. LIVE REAL-TIME ACTIVITY TICKER TOAST --- */
  const liveTickerText = document.getElementById('ticker-activity-text');
  const liveTickerToast = document.getElementById('live-activity-ticker');
  const tickerCloseBtn = document.getElementById('ticker-close-btn');

  const tickerActivities = [
    "<strong>Hace 8s:</strong> Agente en Bogotá procesó reembolso #COL-9821 en <strong>Siigo ERP</strong>",
    "<strong>Hace 24s:</strong> Agente en Medellín emitió factura electrónica DIAN validada",
    "<strong>Hace 42s:</strong> Agente en Santiago agendó cita técnica en <strong>Salesforce CRM</strong>",
    "<strong>Hace 1m:</strong> Agente en Cali autorizó cambio de producto vía <strong>WhatsApp Business</strong>",
    "<strong>Hace 1m 15s:</strong> Agente en Ciudad de México actualizó ticket #TK-4029 en <strong>Zendesk</strong>"
  ];

  let tickerIdx = 0;
  if (liveTickerText) {
    setInterval(() => {
      tickerIdx = (tickerIdx + 1) % tickerActivities.length;
      liveTickerText.style.opacity = 0;
      setTimeout(() => {
        liveTickerText.innerHTML = tickerActivities[tickerIdx];
        liveTickerText.style.opacity = 1;
      }, 300);
    }, 6000);
  }

  if (tickerCloseBtn && liveTickerToast) {
    tickerCloseBtn.addEventListener('click', () => {
      liveTickerToast.style.display = 'none';
    });
  }

  /* --- 9. FAQ ACCORDION --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* --- 10. DEMO MODAL --- */
  const modalBackdrop = document.getElementById('demo-modal');
  const openModalBtns = document.querySelectorAll('.trigger-demo-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  const demoForm = document.getElementById('demo-request-form');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
    });
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por agendar! Un arquitecto de soluciones de nuestro equipo en Colombia te contactará en menos de 2 horas para armar tu prueba de concepto.');
      modalBackdrop.classList.remove('active');
      demoForm.reset();
    });
  }

  /* --- 11. MOBILE MENU --- */
  const menuToggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#070A12';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid #1E2D4A';
      }
    });
  }

});
