window.onload = function() {

  // Functions
  const getDOMByID = (id) => document.getElementById(id);

  const makeContentVisible = (elem) => elem.className += ' visible';

  const makeContentHidden = (elem) => elem.className = 'content-container';

  const hideAllContent = () => {
    const elements = document.getElementsByClassName('content-container');
    for(const elem of elements) {
      makeContentHidden(elem);
    }
  };

  const setActiveLink = (target) => {
    const links = document.getElementsByClassName('nav-link');
    for(const link of links) {
      if (link.dataset.target === target) {
        link.parentNode.className = 'active';
      } else {
        link.parentNode.className = '';
      }
    }
  };

  const handleLinkClick = (evt) => {
    const dataTarget = evt.target.dataset.target;
    setActiveLink(dataTarget);
    routeHandler(dataTarget.toLowerCase())
  };
  const handleEmailSubmit = (evt) => {
    const formElem = document.getElementById('ContactForm');

    window.open(`mailto:Kenia@example.com?subject=${encodeURIComponent(formElem[0].value)}&body=${encodeURIComponent(formElem[1].value)}`);
  };

  const bindEvents = () => {
    const path = window.location.path ? window.location.path.toLowerCase() : '/';
    routeHandler(path);
    setActiveLink('Home');

    const links = document.getElementsByClassName('nav-link');

    for(let link of links) {
      link.onclick = handleLinkClick;
    }
  };

  // "Router"
  const routeHandler = (path) => {
      let elem;
      switch(path) {
        case 'resume':
          elem = getDOMByID('ResumeContent');
          if (elem.className.indexOf('visible') === -1) {
            hideAllContent();
            makeContentVisible(elem);
          }
          break;
        case 'about':
          elem = getDOMByID('AboutContent');
          if (elem.className.indexOf('visible') === -1) {
            hideAllContent();
            makeContentVisible(elem);
          }
          break;
        case 'contact':
          elem = getDOMByID('ContactContent');
          if (elem.className.indexOf('visible') === -1) {
            hideAllContent();
            makeContentVisible(elem);
            const form = document.getElementById('ContactForm');
            form.onsubmit = handleEmailSubmit;
          }
          break;
        default:
          elem = getDOMByID('HomeContent');
          if (elem.className.indexOf('visible') === -1) {
            hideAllContent();
            makeContentVisible(elem);
          }
          break;
      }
  };

  bindEvents();

};

window.onpopstate = (event) => routeHandler(event.state);