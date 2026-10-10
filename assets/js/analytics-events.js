/**
 * Analytics Events (GA4)
 * Rastreamento de cliques em WhatsApp, download de documentos (CV/TCC) e envio de formulário
 */
document.addEventListener('DOMContentLoaded', function () {
  // Verificação de disponibilidade da função gtag
  var trackEvent = function (eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  };

  var paginaAtual = document.body.getAttribute('data-page') || 'clinicas';

  // Cliques em links do WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('clique_whatsapp', {
        pagina: paginaAtual,
        link_url: this.href
      });
    });
  });

  // Download de CV e documentos PDF
  document.querySelectorAll('a[href$=".pdf"]').forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('download_documento', {
        pagina: paginaAtual,
        documento: this.getAttribute('href')
      });
    });
  });

  // Envio de formulário de contato
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      trackEvent('envio_formulario', {
        pagina: paginaAtual
      });
    });
  }
});
