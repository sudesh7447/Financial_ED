/**
 * Template Name: Techie - v4.3.0
 * Template URL: https://bootstrapmade.com/techie-free-skin-bootstrap-3/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  var prompts = [{
      prompt: 'Carrying balance on your credit card help your credit score ',
      weight: -1,
      class: 'group0'
    },
    {
      prompt: 'You need to have a lot of money to invest.',
      weight: -1,
      class: 'group1'
    },
    {
      prompt: 'Weaker currency leads to stronger exports. ',
      weight: 1,
      class: 'group2'
    },
    {
      prompt: 'Diversification in different asset classes is very important for any investor.',
      weight: -1,
      class: 'group3'
    },
    {
      prompt: 'A will protects your estate from probate.',
      weight: 1,
      class: 'group4'
    },
    {
      prompt: 'Having your own house is not an asset',
      weight: -1,
      class: 'group5'
    },
    {
      prompt: 'Share market is nothing more than a gamble.',
      weight: -1,
      class: 'group6'
    },
    {
      prompt: 'Retirement planning doesn’t need focus until the age of 40',
      weight: -1,
      class: 'group7'
    },
    {
      prompt: 'Credit cards are good for finances',
      weight: 1,
      class: 'group8'
    },
    {
      prompt: 'Investing in equity is highly risky',
      weight: -1,
      class: 'group9'
    },
    {
      prompt: 'Financial planning is complex, and I do not require it',
      weight: -1,
      class: 'group10'
    },
    {
      prompt: 'You need to have a lot of money to invest.',
      weight: -1,
      class: 'group11'
    }

  ]

  // This array stores all of the possible values and the weight associated with the value.
  // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
  var prompt_values = [{
      value: 'Strongly Agree',
      mvalue: 'SA',
      class: 'btn-default btn-strongly-agree',
      weight: 5
    },
    {
      value: 'Agree',
      mvalue: 'A',
      class: 'btn-default btn-agree',
      weight: 3,
    },
    {
      value: 'Neutral',
      mvalue: 'N',
      class: 'btn-default',
      weight: 0
    },
    {
      value: 'Disagree',
      mvalue: 'D',
      class: 'btn-default btn-disagree',
      weight: -3
    },
    {
      value: 'Strongly Disagree',
      mvalue: 'SD',
      class: 'btn-default btn-strongly-disagree',
      weight: -5
    }
  ]

  // For each prompt, create a list item to be inserted in the list group
  function createPromptItems() {

    for (var i = 0; i < prompts.length; i++) {
      var prompt_li = document.createElement('li');
      var prompt_p = document.createElement('p');
      var prompt_text = document.createTextNode(prompts[i].prompt);

      prompt_li.setAttribute('class', 'list-group-item prompt ');
      prompt_p.appendChild(prompt_text);
      prompt_li.appendChild(prompt_p);

      document.getElementById('quiz').appendChild(prompt_li);
    }
  }

  // For each possible value, create a button for each to be inserted into each li of the quiz
  // function createValueButtons() {

  // 	for (var li_index = 0; li_index < prompts.length; li_index++) {
  // 		for (var i = 0; i < prompt_values.length; i++) {
  // 			var val_button = document.createElement('button');
  // 			var val_text = document.createTextNode(prompt_values[i].value);

  // 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
  // 			val_button.appendChild(val_text);

  // 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
  // 		}
  // 	}
  // }
  function createValueButtons() {
    for (var li_index = 0; li_index < prompts.length; li_index++) {
      var group = document.createElement('div');
      group.className = 'btn-group btn-group-justified ';

      for (var i = 0; i < prompt_values.length; i++) {
        var btn_group = document.createElement('div');
        btn_group.className = ' btn-group ';

        var button = document.createElement('button');
        var button_text ;
        // console.log(document.createTextNode(prompt_values[i].mvalue));
        // console.log(document.createTextNode(prompt_values[i].value));
        // console.log($(window).width() );
        if ($(window).width() < 1200) {
           button_text = document.createTextNode(prompt_values[i].mvalue);
        } else {
           button_text = document.createTextNode(prompt_values[i].value);
        }

        button.className = 'group' + li_index + ' value-btn btn  btn-outline-info btn-light  ' + prompt_values[i].class;
        button.appendChild(button_text);

        btn_group.appendChild(button);
        group.appendChild(btn_group);

        document.getElementsByClassName('prompt')[li_index].appendChild(group);
      }
    }
  }

  createPromptItems();
  createValueButtons();

  // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
  // Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
  var total = 0;

  // Get the weight associated to group number
  function findPromptWeight(prompts, group) {
    var weight = 0;

    for (var i = 0; i < prompts.length; i++) {
      if (prompts[i].class === group) {
        weight = prompts[i].weight;
      }
    }

    return weight;
  }

  // Get the weight associated to the value
  function findValueWeight(values, value) {
    var weight = 0;

    for (var i = 0; i < values.length; i++) {
      if ($(window).width() < 960) {
        if (values[i].mvalue === value) {
          weight = values[i].weight;
        }
      } else {
        if (values[i].value === value) {
          weight = values[i].weight;
        }
      }

    }

    return weight;
  }

  // When user clicks a value to agree/disagree with the prompt, display to the user what they selected
  $('.value-btn').mousedown(function() {
    var classList = $(this).attr('class');
    // console.log(classList);
    var classArr = classList.split(" ");
    // console.log(classArr);
    var this_group = classArr[0];
    // console.log(this_group);

    // If button is already selected, de-select it when clicked and subtract any previously added values to the total
    // Otherwise, de-select any selected buttons in group and select the one just clicked
    // And subtract deselected weighted value and add the newly selected weighted value to the total
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
    } else {
      // $('[class='thisgroup).prop('checked', false);
      total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.' + this_group + '.active').text()));
      // console.log($('.'+this_group+'.active').text());
      $('.' + this_group).removeClass('active');

      // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
      // $(this).prop('checked', true);
      $(this).addClass('active');
      total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
    }

    console.log(total);
  })



  $('#submit-btn').click(function() {
    // After clicking submit, add up the totals from answers
    // For each group, find the value that is active
    $('.results').removeClass('hide');
    $('.results').addClass('show');

    if (total < 0) {
      // document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
      // console.log(document.getElementById('intro-bar').style.width);
      // document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
      document.getElementById('results').innerHTML = '<b>Ooh , That was Bad.</b><br><br>';
    } else if (total > 0) {
      document.getElementById('results').innerHTML = '<b>Congratulations , You Passed The Test!</b><br><br>';
    } else {
      document.getElementById('results').innerHTML = '<b>You are Good but , You Need More Improvement. </b><br><br>'
    }

    // Hide the quiz after they submit their results
    $('#quiz').addClass('hide');
    $('#submit-btn').addClass('hide');
    $('#retake-btn').removeClass('hide');
  })

  // Refresh the screen to show a new quiz if they click the retake quiz button
  $('#retake-btn').click(function() {
    $('#quiz').removeClass('hide');
    $('#submit-btn').removeClass('hide');
    $('#retake-btn').addClass('hide');

    $('.results').addClass('hide');
    $('.results').removeClass('show');
  })

})()
