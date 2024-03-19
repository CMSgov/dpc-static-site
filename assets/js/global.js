function navigation_link (anchor, navigation_type) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "navigation_clicked",
      "event_type": "ui interaction",
      "text": anchor.text,
      "link_url": anchor.href,
      "navigation_type": navigation_type
    });
  });
}
function contact_link (anchor, contact_method) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "contact_clicked",
      "event_type": "ui interaction",
      "text": anchor.text,
      "link_url": anchor.href,
      "contact_method": contact_method
    });
  });
}

function external_link_click (anchor) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "external_link_click",
      "link_type": "link_external",
      "text": anchor.text,
      "link_url": anchor.href
    });
  });
}

function internal_link_click (anchor) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "internal_link_clicked",
      "text": anchor.text,
      "link_url": anchor.href,
      "link_type": "link_other"
    });
  });
}

const download_extensions = ['pdf', 'js', 'zip', 'json'];
function file_download (anchor, file_name, extension) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "file_download",
      "text": anchor.text,
      "file_name": file_name,
      "file_extension": extension,
      "link_type": "link_download"
    });
  });
}

function accordion_opened (button) {
  if (button.classList.contains('usa-accordion__button') || button.classList.contains('ds-c-usa-banner__button')) {
    button.addEventListener("click", function(e) {
      if (button.ariaExpanded == 'false') {
	utag.link({
	  "event_name": "accordion_opened",
	  "text": button.innerText,
	  "link_type": "link_other"
	});
      }
    });
  }
}

function content_link (anchor) {
  const extension = anchor.href.split('.').pop();
  const file_name = anchor.href.split('/').pop();
  if (anchor.href.startsWith('mailto:')) {
    contact_link(anchor, "email");
  } else if (download_extensions.includes(extension) || file_name == 'jwt.html') {
    file_download(anchor, file_name, extension);
  } else if (!anchor.href.includes(window.location.host) && !anchor.href.includes('dpc.cms.gov')) {
    external_link_click(anchor);
  } else {
    internal_link_click(anchor);
  }
}

function button_engagement (anchor) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "button_engagement",
      "button_type": anchor.className,
      "text": anchor.text,
      "link_url": anchor.href,
      "link_type": "link_other"
    });
  });
}

if (document.querySelector('ul.topnav')) {
  for (anchor of document.querySelector('ul.topnav').getElementsByTagName("a")) {
    if (anchor.classList && anchor.classList.contains('ds-c-button')) {
      button_engagement(anchor);
    } else {
      navigation_link(anchor, "main nav");
    }
  }
}

if (document.querySelector('section.page__banner')) {
  for (anchor of document.querySelector('section.page__banner').getElementsByTagName("a")) {
    if (anchor.classList && anchor.classList.contains('banner-btn')) {
      button_engagement(anchor);
    } else {
      internal_link_click(anchor);
    }
  }
}

if (document.querySelector('footer')) {
  for (anchor of document.querySelector('footer').getElementsByTagName("a")) {
    content_link(anchor);
  }
}

if (window.location.pathname == '/' || window.location.pathname == '/faq.html') {
  for (anchor of document.querySelector('#main').getElementsByTagName("a")) {
    content_link(anchor);
  }
} else {
  if (document.querySelector('[aria-label="Side NavBar"]')) {
    for (anchor of document.querySelector('[aria-label="Side NavBar"]').getElementsByTagName("a")) {
      navigation_link(anchor, "side nav");
    }
  }

  if (document.querySelector('#tos')) {
    for (anchor of document.querySelector('#tos').getElementsByTagName("a")) {
      content_link(anchor);
    }
  }

  if (document.querySelector('[aria-label="Page Content"]')) {
    for (anchor of document.querySelector('[aria-label="Page Content"]').getElementsByTagName("a")) {
      content_link(anchor);
    }
  }
}

for (button of document.getElementsByTagName('button')) {
  accordion_opened(button);
}
