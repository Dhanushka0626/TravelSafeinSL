/* ========= CONFIG: change this to your client's WhatsApp number (international format, no +, no spaces) ========= */
const WHATSAPP_NUMBER = '94705113030'; // <<--- replace with real number (e.g. 94771234567 for +94 77 123 4567)
/* ================================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Show phone in contact section (formatted)
  document.getElementById('phoneDisplay').textContent = formatPhone(WHATSAPP_NUMBER);

  // Make hero WhatsApp button open a helpful prefilled message
  const heroBtn = document.getElementById('heroWhatsApp');
  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = `Hi! I'm interested in booking a tour. Could you please share available dates and prices?`;
    const url = makeWhatsAppLink(WHATSAPP_NUMBER, msg);
    window.open(url, '_blank', 'noopener');
  });

  // Contact form: opens WhatsApp with composed message
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(contactForm);
    const name = form.get('name') || 'Friend';
    const from = form.get('from') || '';
    const tour = form.get('tour') || '';
    const msg = form.get('message') || '';

    let messageText = `Hello, my name is ${name}.`;
    if (from) messageText += ` I'm from ${from}.`;
    if (tour) messageText += ` I'm interested in: ${tour}.`;
    if (msg) messageText += ` Message: ${msg}`;

    const url = makeWhatsAppLink(WHATSAPP_NUMBER, messageText);
    window.open(url, '_blank', 'noopener');
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    if (mainNav.style.display === 'block') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'block';
    }
  });

  // Optional: smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (target.length > 1) {
        e.preventDefault();
        document.querySelector(target).scrollIntoView({behavior:'smooth', block:'start'});
        // hide mobile nav after click
        if (window.innerWidth < 900) mainNav.style.display = '';
      }
    });
  });
});

// Helper: creates wa.me link with encoded message
function makeWhatsAppLink(number, message){
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
function formatPhone(number){
  // minimal formatting for display: add + and a space after country code (basic for +94)
  if (number.startsWith('94')) return '+' + number.slice(0,2) + ' ' + number.slice(2);
  if (number.startsWith('+')) return number;
  return '+' + number;
}

document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', () => {
    const tourName = btn.getAttribute('data-tour');
    const msg = `Hi! I'm interested in booking the "${tourName}" tour. Could you share available dates and details?`;
    window.open(makeWhatsAppLink(WHATSAPP_NUMBER, msg), '_blank');
  });
});
