// Wait for USWDS js to finish
document.addEventListener('DOMContentLoaded', function () {

  const links = document.querySelectorAll('a');
  links.forEach((linkEl) => {

    const tocContainer = document.getElementById('toc')
    if (!linkEl.hasAttribute('data-tealium') && !tocContainer?.contains(linkEl)) {
      linkEl.addEventListener('click', (event) => {

        const target = event.currentTarget;
        const baseUrl = window.ENV.siteUrl;

        if (target.href.startsWith(baseUrl)) {
          //internal link clicked
          utag.link({
            "event_name": "internal_link_clicked",
            "link_type": "link_other",
            "link_url": target.href,
            "parent_component_heading": "",
            "parent_component_type": "",
            "text": target.innerText,
          });
        } else {
          // external link clicked
          utag.link({
            "event_name": "external_link_click",
            "text": target.innerText,
            "link_type": "link_external",
            "link_url": target.href,
            "parent_component_heading": "",
            "parent_component_type": "",
          });
        }
      });
    }
  });

  // button clicks
  const buttons = document.querySelectorAll('[data-tealium="copy_button"]');
  buttons.forEach((buttonEl) => {
    buttonEl.addEventListener('click', (event) => {

      const target = event.currentTarget;

      utag.link({
        "event_name": "button_engagement",
        "button_style": "",
        "button_type": "button",
        "link_type": "link_other",
        "link_url": "",
        "parent_component_heading": "",
        "parent_component_type": "",
        "text": target.innerText,
      });
    });
  });

  // accordion clicks
  const accordions = document.querySelectorAll('[data-tealium="accordion"]');
  accordions.forEach((accordionEl) => {
    accordionEl.addEventListener('click', (event) => {

      const target = event.currentTarget;
      if (target.getAttribute('aria-expanded') === "false") {
        utag.link({
          "event_name": "accordion_opened",
          "heading": target.innerText,
          "parent_component_heading": "",
          "parent_component_type": "",
        });
      }
    });
  });

  // file downloads
  const downloads = document.querySelectorAll('[data-tealium="download"]');
  downloads.forEach((downloadEl) => {
    downloadEl.addEventListener('click', (event) => {
      const target = event.currentTarget;

      utag.link({
        "event_name": "file_download",
        "file_name": target.pathname.split('/').pop(),
        "file_extension": target.href.split('.').pop(),
        "file_postDate": "",
        "link_type": "link_download",
        "link_url": target.href,
        "text": target.innerText,
      });
    });
  });


  // Navigation clicks
  const mainNavEls = document.querySelectorAll('[data-tealium="main_nav"]');
  const identifierEls = document.querySelectorAll('[data-tealium="identifier"]');
  const leftRailEls = document.querySelectorAll('[data-tealium="left_rail"]');
  const tocEls = document.querySelectorAll('[data-tealium="toc"] a');

  [
    ...mainNavEls,
    ...identifierEls,
    ...leftRailEls,
    ...tocEls
  ].forEach((navigationEl) => {
    navigationEl.addEventListener('click', (event) => {

      const target = event.currentTarget;
      const navigation_type = target.getAttribute('data-tealium') || "right_rail"

      utag.link({
        "event_name": "navigation_clicked",
        "heading": "",
        "link_type": "link_other",
        "link_url": target.href,
        "navigation_type": navigation_type,
        "text": target.innerText,
      });
    });
  });
});
