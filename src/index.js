/*jshint esversion: 6 */

(function () {
  'use strict';
   //the rest of the function
}());

// Instantiate MDC Drawer
const drawerEl = document.querySelector('.mdc-drawer');
const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);

// Instantiate MDC Top App Bar (required)
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

topAppBar.setScrollTarget(document.querySelector('.main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});


mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));


/** @const */
const appOpts = {
  dom: {
    root: document.documentElement,
    ip_address: document.querySelector('#ip-address'),
  },
  wakeLock: null,
  color: null,
};

document.addEventListener('click', (event) => {

  postData('http://'+ appOpts.dom.ip_address.value +':8060/keypress/'+ event.target.value)
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));

});

function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}

const startWakeLock = () => {
  try {
    navigator.getWakeLock('screen').then((wakeLock) => {
      appOpts.wakeLock = wakeLock.createRequest();
    });
  } catch(error) {
    // no experimental wake lock api build
  }
}

const startServiceWorker = () => {
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  });
}

const init = () => {
  startWakeLock();
  startServiceWorker();
};

init();
