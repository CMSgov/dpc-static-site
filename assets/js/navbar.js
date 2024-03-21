var close_mobile_nav_button = document.getElementById("topnav__close-button"),
    open_mobile_nav_button = document.getElementById("topnav__show-button"),
    mobile_nav = document.getElementById("topnav-wrap"),
    navbar = document.getElementById("navigation"),
    overlay = document.createElement("div"),
    nav_open_class = "nav-is-open",
    visible_class = "is-visible",
    overlay_class = "site-overlay";

function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}



if(typeof(close_mobile_nav_button) != 'undefined' && close_mobile_nav_button != null){
  close_mobile_nav_button.addEventListener("click", function(e) {
    document.body.classList.remove(nav_open_class);
    mobile_nav.classList.remove(visible_class);
    open_mobile_nav_button.focus();
    removeElementsByClass(overlay_class);
  });
}

if(typeof(open_mobile_nav_button) != 'undefined' && open_mobile_nav_button != null){
  open_mobile_nav_button.addEventListener("click", function(e) {
    document.body.classList.add(nav_open_class);
    mobile_nav.classList.add(visible_class);
    close_mobile_nav_button.focus();
    navbar.insertBefore(overlay, mobile_nav);
    overlay.classList.add(overlay_class);

    try {
      setTimeout(function(){
        overlay.classList.add(visible_class);
      }, 100);
    }
    catch(err) {
      console.log(err)
    }

    trapFocus(mobile_nav);
  })
}

const site_logo =  document.querySelector("a.site-logo");

site_logo.addEventListener("click", function(e) {
  utag.link({
    "event_name": "header_clicked",
    "event_type": "ui interaction",
    "text": site_logo.text,
    "link_url": site_logo.href,
    "category": "page header"
  });
});

