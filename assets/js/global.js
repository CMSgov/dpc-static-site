function navigation_link (anchor, navigation_type) {
  anchor.addEventListener("click", function(e) {
    utag.link({
      "event_name": "navigation_clicked",
      "event_type": "ui interaction",
      "heading": "",
      "text": anchor.text,
      "link_url": anchor.href,
      "navigation_type": navigation_type
    });
  });
}
const download_suffixes = ['pdf', 'js', 'zip', 'json'];

function content_link (anchor) {
  const suffix = anchor.href.split('.').pop();
  if (anchor.href.startsWith('mailto:')) {
    console.log(anchor.href + " mail filter");
  } else if (!anchor.href.includes(window.location.host) && !anchor.href.includes('dpc.cms.gov')) {
    console.log(anchor.text + ": " + anchor.href + " external filter");    
  } else if (download_suffixes.includes(suffix)) {
    console.log(anchor.text + ": " + anchor.href + " download filter");    
  } else {
    console.log(anchor.text + ": " + anchor.href + " internal filter");
  }
  
  // anchor.addEventListener("click", function(e) {
  //   utag.link({
  //     "event_name": "internal_link_clicked",
  //     "text": anchor.text,
  //     "link_url": anchor.href,
  //     "link_type": "link_other"
  //   });
  // });
}


if (window.location.pathname == '/') {
  for (anchor of document.querySelector('#main').getElementsByTagName("a")) {
    content_link(anchor);
  }
} else {
  for (anchor of document.getElementById("static-site-links").getElementsByTagName("a")) {
    navigation_link(anchor, "main nav");
  }

  for (anchor of document.querySelector('[aria-label="Side NavBar"]').getElementsByTagName("a")) {
    navigation_link(anchor, "side nav");
  }

  for (anchor of document.querySelector('[aria-label="Page Content"]').getElementsByTagName("a")) {
    content_link(anchor);
  }
  for (anchor of document.querySelector('footer').getElementsByTagName("a")) {
    content_link(anchor);
  }
}
