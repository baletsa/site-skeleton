// Import modules from directory
import Common from './modules/Common';
import Header from './modules/Header';

// Add modules to siteScripts class
// init module when matching 'data-module' attribute is found
class siteScripts {
  constructor() {
    this.m = {
      'common': Common,
      'header': Header,
    };
  }

  fire(modulename) {
    if (typeof this.m[modulename] !== 'undefined') {
      this.m[modulename].init();
    }
  }

  loadEvents() {
    const t = this,
      pageModules = [].slice.call(document.querySelectorAll('[data-module]')),
      moduleNames = [];

    let currentName;

    if (pageModules.length) {
      // build list of module names found and skip duplicates.
      pageModules.forEach((mod) => {
        currentName = mod.getAttribute('data-module');
        if (moduleNames.indexOf(currentName) === -1) {
          moduleNames.push(mod.getAttribute('data-module'));
        }
      });

      // init module
      moduleNames.forEach((classnm) => {
        t.fire(classnm);
      });

    }
  }
}

const domReady = (fn) => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // If document is already loaded, run scripts
    return fn();
  }
  else {
    // Wait for document to be ready
    document.addEventListener('DOMContentLoaded', fn, false);
  }
};

domReady(
  function() {
    const l = new siteScripts();
    l.fire('common');
    l.loadEvents();
  }
);
