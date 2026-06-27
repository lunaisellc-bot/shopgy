(function () {
  var config = window.VITRINY_TRACKING || {};
  var measurementId = config.GA4_MEASUREMENT_ID;

  if (!measurementId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  });

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.indexOf('wa.me/') !== -1 || href.indexOf('whatsapp') !== -1) {
      gtag('event', 'whatsapp_click', {
        event_category: 'lead',
        event_label: href
      });
    }

    if (href.indexOf('audit.html') !== -1) {
      gtag('event', 'audit_cta_click', {
        event_category: 'lead',
        event_label: href
      });
    }
  });
})();
