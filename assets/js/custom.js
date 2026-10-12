(function ($) {
  "use strict";

  // Função para aplicar o tema e alternar imagens com data-src-dark / data-src-light
  function applyTheme(isDark) {
    $('body').toggleClass('dark-mode', isDark);
    $('.color-mode-icon').toggleClass('active', isDark);
    $('.color-mode-icon.uil').toggleClass('uil-sun', isDark).toggleClass('uil-moon', !isDark);

    // Alternar imagens que possuem data-src-dark (Q1)
    $('img[data-src-dark]').each(function () {
      var $img = $(this);
      if (!$img.attr('data-src-light')) {
        $img.attr('data-src-light', $img.attr('src'));
      }
      var lightSrc = $img.attr('data-src-light');
      var darkSrc = $img.attr('data-src-dark');
      $img.attr('src', isDark ? darkSrc : lightSrc);
    });
  }

  // Iniciar automaticamente em modo escuro sempre que o site for aberto
  applyTheme(true);
  if (localStorage.getItem('portfolio_theme')) {
    localStorage.removeItem('portfolio_theme');
  }

  // Alternador de modo de cor (claro / escuro)
  $('.color-mode').on('click', function () {
    var isDark = !$('body').hasClass('dark-mode');
    applyTheme(isDark);
  });

  // HEADER (Headroom)
  if ($(".navbar").length && typeof $.fn.headroom === 'function') {
    $(".navbar").headroom();
  }

  // PROJECT CAROUSEL (Owl Carousel)
  if ($('.owl-carousel').length && typeof $.fn.owlCarousel === 'function') {
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      nav: true
    });
  }

  // SMOOTHSCROLL - Restrito a links internos com âncora (#) (Q2)
  $(function () {
    $('a[href^="#"]').on('click', function (event) {
      var targetId = $(this).attr('href');
      if (targetId && targetId !== '#' && $(targetId).length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: $(targetId).offset().top - 49
        }, 800);
      }
    });
  });

  // TOOLTIP
  if ($('.social-links a').length && typeof $.fn.tooltip === 'function') {
    $('.social-links a').tooltip();
  }

})(jQuery);
