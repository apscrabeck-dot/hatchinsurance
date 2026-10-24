/* Hatch Insurance — minimal site script.
 * Two responsibilities only:
 *   1. Specialty tab switching (with keyboard support per WAI-ARIA tabs pattern)
 *   2. Mobile nav toggle
 */
(function () {
  'use strict';

  // ----- Specialty data (mirrors _design-reference/data.jsx SPECIALTIES) -----
  const SPECIALTIES = [
    {
      n: '01',
      title: 'Towing & Recovery',
      audience: 'Wrecker fleets, recovery firms, transporters',
      body: 'Operators whose risk moves every hour of the day. Built around equipment exposure, driver risk, and time-sensitive claims response.',
      img: 'assets/verticals/towing.jpg',
      tags: ['Equipment & cargo', 'Multi-state fleets', 'Wrongful repo defense'],
      cta: 'Talk to a towing specialist',
      page: 'specialties/towing.html'
    },
    {
      n: '02',
      title: 'Bars, Taverns & Restaurants',
      audience: 'Independent restaurants, bars, hospitality groups',
      body: 'Where service floors, liquor, and payroll exposure stack on top of each other. Coverage that understands a Saturday night.',
      img: 'assets/verticals/bars.jpg',
      tags: ['Liquor liability', 'Business income', 'Workers comp'],
      cta: 'Protect my venue',
      page: 'specialties/hospitality.html'
    },
    {
      n: '03',
      title: 'Affluent Personal Lines',
      audience: 'High-net-worth households, executives, owners',
      body: 'Personal insurance presented like private advisory work — homes, autos, umbrellas, boats, and collector vehicles in one portfolio view.',
      img: 'assets/verticals/affluent.png',
      tags: ['Multi-property', 'Umbrella & excess', 'Collector vehicles'],
      cta: 'Review my portfolio',
      page: 'specialties/personal.html'
    },
    {
      n: '04',
      title: 'Commercial P&C',
      audience: 'Small to middle-market business owners',
      body: 'A sharper commercial story for owners who have outgrown basic quoting. Packaging strategy, coverage design, multi-line stewardship.',
      img: 'assets/verticals/commercial.jpg',
      tags: ['Property & GL', 'Workers comp', 'Continuity planning'],
      cta: 'Get a commercial review',
      page: 'specialties/commercial.html'
    },
    {
      n: '05',
      title: 'Artisan Contractors',
      audience: 'Trades, subcontractors, remodelers, field crews',
      body: 'Built for crews, job sites, tools, vehicles, and real construction risk — not generic small-business policies.',
      img: 'assets/verticals/contractor2.png',
      tags: ['Tools & equipment', 'Auto & GL', 'Certificates of insurance'],
      cta: 'Talk to a contractor specialist',
      page: 'specialties/contractors.html'
    },
    {
      n: '06',
      title: 'Life & Family',
      audience: 'Households, business-owner families',
      body: 'Life coverage rooted in real obligations — debt, mortgage, income replacement, education — not a generic calculator.',
      img: 'assets/verticals/life.png',
      tags: ['Term & whole', 'Key-person', 'Education planning'],
      cta: 'Plan with a life advisor',
      page: 'specialties/life.html'
    },
    {
      n: '07',
      title: 'Pest Control',
      audience: 'Pest control operators, exterminators, lawn & turf companies',
      body: 'Coverage built around chemical exposure, applicator licensing, vehicle fleets, and the liability tail unique to the pest control trade.',
      img: 'assets/verticals/pest-control.png',
      tags: ['Pollution liability', 'Auto & equipment', 'Applicator E&O'],
      cta: 'Talk to a pest control specialist',
      page: 'specialties/pest.html'
    },
    {
      n: '08',
      title: 'Garage & Dealers',
      audience: 'Auto service & repair, body shops, classic car remodelers, non-franchise dealers',
      body: 'Garage liability, dealers open lot, and service operations coverage for shops and dealers that need more than a standard commercial auto policy.',
      img: 'assets/verticals/mechanic.png',
      tags: ['Garage liability', 'Dealers open lot', 'Workers comp'],
      cta: 'Talk to a garage specialist',
      page: 'specialties/garage.html'
    }
  ];

  // ----- Tab switching -----
  const tabs = Array.from(document.querySelectorAll('.dirC__tab'));
  const plate = document.getElementById('plate-panel');

  const els = {
    img:     document.getElementById('plate-img'),
    capN:    document.getElementById('plate-cap-n'),
    capT:    document.getElementById('plate-cap-t'),
    no:      document.getElementById('plate-no'),
    title:   document.getElementById('plate-title'),
    aud:     document.getElementById('plate-aud'),
    summary: document.getElementById('plate-summary'),
    tags:    document.getElementById('plate-tags'),
    cta:     document.getElementById('plate-cta'),
    ctaLink: document.querySelector('.dirC__plate-cta')
  };

  function renderSpecialty(i) {
    const s = SPECIALTIES[i];
    if (!s) return;
    els.img.src = s.img;
    els.img.alt = s.title;
    els.capN.textContent = s.n;
    els.capT.textContent = s.title;
    els.no.textContent = s.n;
    els.title.textContent = s.title;
    els.aud.textContent = s.audience;
    els.summary.textContent = s.body;
    els.tags.innerHTML = s.tags.map(function (t) {
      const li = document.createElement('li');
      li.textContent = t;
      return li.outerHTML;
    }).join('');
    els.cta.textContent = s.cta;
    if (els.ctaLink && s.page) els.ctaLink.setAttribute('href', s.page);
    if (plate) plate.setAttribute('aria-labelledby', 'tab-' + i);
  }

  function selectTab(i, focus) {
    tabs.forEach(function (tab, idx) {
      const active = idx === i;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });

    if (plate) {
      plate.classList.add('is-fading');
      setTimeout(function () {
        renderSpecialty(i);
        plate.classList.remove('is-fading');
      }, 160);
    } else {
      renderSpecialty(i);
    }

    if (focus && tabs[i]) tabs[i].focus();
  }

  tabs.forEach(function (tab, idx) {
    tab.addEventListener('click', function () {
      selectTab(idx, false);
      restartAutoRotate();
    });
    tab.addEventListener('keydown', function (e) {
      let next = -1;
      if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next >= 0) {
        e.preventDefault();
        selectTab(next, true);
        restartAutoRotate();
      }
    });
  });

  // ----- Auto-rotate every 10 seconds -----
  const ROTATE_MS = 10000;
  let rotateTimer = null;

  function getCurrentIndex() {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('aria-selected') === 'true') return i;
    }
    return 0;
  }

  function startAutoRotate() {
    stopAutoRotate();
    rotateTimer = setInterval(function () {
      const next = (getCurrentIndex() + 1) % tabs.length;
      selectTab(next, false);
    }, ROTATE_MS);
  }

  function stopAutoRotate() {
    if (rotateTimer) {
      clearInterval(rotateTimer);
      rotateTimer = null;
    }
  }

  function restartAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Pause only on keyboard focus (so tab-key users can read at their own pace).
  const tabStrip = document.querySelector('.dirC__tabs');
  [tabStrip, plate].forEach(function (el) {
    if (!el) return;
    el.addEventListener('focusin', stopAutoRotate);
    el.addEventListener('focusout', startAutoRotate);
  });

  // Pause when the tab/window isn't visible — no point cycling offscreen.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopAutoRotate();
    else startAutoRotate();
  });

  // Always rotate — 10 seconds per practice.
  startAutoRotate();

  // ----- Specialties nav dropdown -----
  var dropdowns = Array.from(document.querySelectorAll('.dirC__nav-dropdown'));

  function closeDropdown(dd) {
    var trigger = dd.querySelector('.dirC__nav-dropdown-trigger');
    dd.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function openDropdown(dd) {
    dropdowns.forEach(function (other) { if (other !== dd) closeDropdown(other); });
    var trigger = dd.querySelector('.dirC__nav-dropdown-trigger');
    dd.classList.add('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  dropdowns.forEach(function (dd) {
    var trigger = dd.querySelector('.dirC__nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (dd.classList.contains('is-open')) closeDropdown(dd);
      else openDropdown(dd);
    });
  });

  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (!dd.contains(e.target)) closeDropdown(dd);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dropdowns.forEach(closeDropdown);
  });

  // ----- Mobile nav toggle -----
  const navToggle = document.querySelector('.dirC__nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    // Close the menu when a nav link is tapped
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open navigation');
        }
      });
    });
  }
})();
