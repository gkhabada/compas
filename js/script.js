$(document).ready(function() {

  // fixed menu
  var heightAfterShowMenu, menu = $("#fixed_menu");
  function getHeightAfterShowMenu () {
    heightAfterShowMenu = (Number($('header').outerHeight(true)) + Number($('.banner').outerHeight(true)) + Number($('.main_types').outerHeight())) || 300;
  }
  getHeightAfterShowMenu();
  $(window).resize(function() {
    getHeightAfterShowMenu();
  });

  $(document).scroll(function() {
    var y = $(document).scrollTop()
    if (y >= heightAfterShowMenu) {
      $(menu).slideDown(300);
    } else {
      $(menu).slideUp(300);
    }
  });

  // mobile menu
  $('.mobile_nav_menu').on('click', function() {
    $('#mobile-menu').css('left', '0');
    $('.wrapper, .action_img, .action').css({
      'transform': 'translateX(calc(100% - 55px))'
    });
  });

  function closeMobileMenu () {
    $('#mobile-menu').css('left', '-200%');
    $('.wrapper, .action_img, .action').css('transform', 'translateX(0)');
  }
  $('.mobile_menu_close, .mobile_menu_overlay').on('click', function () {
    closeMobileMenu();
  });


  // tabs
  $($('.tabs__links .tabs__link')[0]).addClass('active_tab')
  $('.tabs__content').html($($('.tabs__links .tabs__link')[0]).find('.tab-info').html());
  $('.tabs__links .tabs__link').on('click', function() {
    if (!$(this).hasClass('active_tab')) {
      $('.tabs__links .tabs__link').removeClass('active_tab');
      $(this).addClass('active_tab');
      $('.tabs__content').html($(this).find('.tab-info').html());
    }
  })

  //adventure
  if ($('.advantage').length) {
    var clicking = false;
    var advantageCount = $('.advantage_item').length;
    $('.advantage_scroll__count .count_total').text(advantageCount < 10 ? '0' + advantageCount : advantageCount)
    var advantageBtnStep, advantageScrollStep, advantageCoordY = 0

    function getAdventureVariables() {
      advantageScrollStep = ($('.advantage_items')[0].scrollHeight - $('.advantage_items').outerHeight()) / (advantageCount - 1);
      advantageBtnStep = ($('.advantage_scroll__btn').height() - $('.advantage_scroll__btn button').height()) / (advantageCount - 1);
    }
    getAdventureVariables();
    $(window).resize(function() {
      getAdventureVariables();
    });

    $('.advantage_scroll__btn button').on('mousedown', function(e) {
      e.preventDefault();
      clicking = true;
      advantageCoordY = e.clientY
    });

    $('.advantage_scroll').on('mousemove', function(e) {
      e.preventDefault();
      if (clicking !== false) {

        if (advantageCoordY + 30 < e.clientY) {

          if ($('.advantage_items').scrollTop() >= ($('.advantage_items')[0].scrollHeight - $('.advantage_items').outerHeight() - 59)) return
          $('.advantage_scroll__btn button').css('top', Number($('.advantage_scroll__btn button').css('top').replace('px', '')) + advantageBtnStep)
          $('.advantage_items').scrollTop($('.advantage_items').scrollTop() + advantageScrollStep);

          $('.advantage_scroll__count .count_current').text(advantageCount < 10 ? '0' + (Number($('.advantage_scroll__count .count_current').text()) + 1) : advantageCount)

          advantageCoordY = e.clientY
        } else if (advantageCoordY - 30 > e.clientY) {

          if ($('.advantage_items').scrollTop() === 0) return
          $('.advantage_scroll__btn button').css('top', Number($('.advantage_scroll__btn button').css('top').replace('px', '')) - advantageBtnStep)
          $('.advantage_items').scrollTop($('.advantage_items').scrollTop() - advantageScrollStep);

          $('.advantage_scroll__count .count_current').text(advantageCount < 10 ? '0' + (Number($('.advantage_scroll__count .count_current').text()) - 1) : advantageCount)

          advantageCoordY = e.clientY
        }

      }
    });
  }

  // cost

  if ($('.cost').length) {
    var costLineLength = $('.cost_elements .cost_item').length / 2;
    $('.cost_scroll_line span').height(100 / costLineLength + '%');

    var costScrollStep = ($('.cost_elements')[0].scrollHeight - $('.cost_elements').outerHeight() - 10) / costLineLength;

    var costLineStep = ($('.cost_scroll_line').height() - $('.cost_scroll_line span').height()) / costLineLength;

    $('.cost_scroll button').on('click', function(e) {
      e.preventDefault();

      if (costLineLength <= 1) return

      if ($(e.target).hasClass('cost_scroll_dowm')) {

        if ($('.cost_elements').scrollTop() <= ($('.cost_elements')[0].scrollHeight - $('.cost_elements').outerHeight() - 20)) {
          $('.cost_scroll_line span').css('top', Number($('.cost_scroll_line span').css('top').replace('px', '')) + costLineStep)
          $('.cost_elements').scrollTop($('.cost_elements').scrollTop() + costScrollStep);
        }

      } else if ($(e.target).hasClass('cost_scroll_up')) {

        if ($('.cost_elements').scrollTop() !== 0) {

          $('.cost_scroll_line span').css('top', Number($('.cost_scroll_line span').css('top').replace('px', '')) - costLineStep)
          $('.cost_elements').scrollTop($('.cost_elements').scrollTop() - costScrollStep);

        }

      }
    });

    // cost modile
    var touch = false;
    var countLength = $('.cost_elements .cost_item').length;
    var mCostScrollStep, mCostLineStep, costCoordX = 0;
    $('.cost_line-mobile span').width(100 / countLength + '%');

    function costMobile() {
      mCostScrollStep = ($('.cost_elements')[0].scrollWidth - $('.cost_elements').outerWidth()) / costLineLength;
      mCostLineStep = ($('.cost_line-mobile').width() - $('.cost_line-mobile span').width()) / costLineLength;

      $('.cost_elements').scrollLeft(0);
      $('.cost_line-mobile span').css('left', '0');
    }
    costMobile();
    $(window).resize(function() {
      costMobile();
    });

    $('.cost_elements').on('mousedown touchstart', function(e) {
      e.preventDefault();
      touch = true;
      if (e.touches) {
        e = e.touches[0]
      }
      costCoordX = e.clientX
    });

    $('.cost_elements').on('mousemove touchmove', function(e) {
      e.preventDefault();
      if (touch !== false) {

        if (e.touches) {
          e = e.touches[0]
        }

        if (costCoordX + 30 < e.clientX) {

          if ($('.cost_elements').scrollLeft() === 0) return

          $('.cost_line-mobile span').css('left', Number($('.cost_line-mobile span').css('left').replace('px', '')) - mCostLineStep)
          $('.cost_elements').scrollLeft($('.cost_elements').scrollLeft() - mCostScrollStep);

          costCoordX = e.clientX
        } else if (costCoordX - 30 > e.clientX) {

          if ($('.cost_elements').scrollLeft() >= ($('.cost_elements')[0].scrollWidth - $('.cost_elements').outerWidth() - 20)) return

          $('.cost_line-mobile span').css('left', Number($('.cost_line-mobile span').css('left').replace('px', '')) + mCostLineStep)
          $('.cost_elements').scrollLeft($('.cost_elements').scrollLeft() + mCostScrollStep);

          costCoordX = e.clientX
        }
      };
    });

    // cost full slider
    $('.cost.slider button').on('click', function(e) {

      if ($(this).hasClass('cost_scroll_right')) {

        if ($('.cost_elements').scrollLeft() >= $('.cost_elements')[0].scrollWidth - $('.cost_elements').outerWidth()) {
          $('.cost_elements').scrollLeft(0)
        } else {
          $('.cost_elements').scrollLeft($('.cost_elements').scrollLeft() + $('.cost_item').outerWidth(true));
        }

      } else if ($(this).hasClass('cost_scroll_left')) {

        if ($('.cost_elements').scrollLeft() === 0) {
          $('.cost_elements').scrollLeft($('.cost_elements')[0].scrollWidth - $('.cost_elements').outerWidth())
        } else {
          $('.cost_elements').scrollLeft($('.cost_elements').scrollLeft() - $('.cost_item').outerWidth(true));
        }
      }
    })
  }

  // rates show all
  var ratesMaxHeight = $('.rates .wrapper').css('max-height');
  $('.rates_showall').on('click', function() {
    if ($('.rates .wrapper').css('max-height') === 'none') {
      $(this).closest('.wrapper').css('max-height', ratesMaxHeight);
      $('.rates_showall').removeClass('uncover').text('Показать все');
    } else {
      $(this).closest('.wrapper').css('max-height', 'unset');
      $('.rates_showall').addClass('uncover').text('Скрыть все');
    }
  })

  // rates slider
  function Slider(obj) {
    this.images = document.querySelectorAll(obj.images);
    this.auto = obj.auto;
    this.btnPrev = obj.btnPrev;
    this.btnNext = obj.btnNext;
    this.rate = obj.rate || 1000;
    this.count = obj.count || 1;

    if (obj.dots) {
      document.querySelector(obj.dots).innerHTML = '';
      for (let j = 0; j < this.images.length; j++) {
        let span = document.createElement('span');
        document.querySelector(obj.dots).appendChild(span);
        this.images[j].classList.remove('showed');
      }
      document.querySelector(obj.dots + ' span').classList.add('active');
      this.images[0].classList.add('showed');
      this.dots = document.querySelector(obj.dots).childNodes;
    }

    var i = 0;
    var slider = this;
    this.prev = function() {
      slider.images[i].classList.remove('showed');
      slider.dots[i].classList.remove('active');
      i--;

      if (i < 0) {
        i = slider.images.length - 1;
      }

      slider.images[i].classList.add('showed');

      if (slider.dots) {
        slider.dots[i].classList.add('active');
      }
    }
    this.next = function() {
      slider.images[i].classList.remove('showed');
      slider.dots[i].classList.remove('active');
      i++;

      if (i >= slider.images.length) {
        i = 0;
      }

      slider.images[i].classList.add('showed');

      if (slider.dots) {
        slider.dots[i].classList.add('active');
      }
    }
    document.querySelector(slider.btnPrev).onclick = slider.prev;
    document.querySelector(slider.btnNext).onclick = slider.next;

    var touchCoord = 0;
    $(obj.images).on('mousedown touchstart', function(e) {
      e.preventDefault();
      slideRates = true;
      if (e.touches) {e = e.touches[0]}
      touchCoord = e.clientX
    });


    $(obj.images).on('mousemove touchmove', function(e) {
      e.preventDefault();
      if (slideRates !== false) {
        if (e.touches) {e = e.touches[0]}
        if (touchCoord + 80 < e.clientX) {
          slider.prev();
          slideRates = false;
        } else if (touchCoord - 80 > e.clientX) {
          slider.next();
          slideRates = false;
        }

      };
    });

    if (slider.auto) {
      setInterval(slider.next, slider.rate);
    }
  }

  var slideRates = false;
  function initRatesSlider () {
    if ($(window).width() <= 768 && $('.rates').length) {
      new Slider({
        images: '.rates_item',
        btnPrev: '.rates_slide_left',
        btnNext: '.rates_slide_right',
        auto: false,
        dots: '.rates_dots'
      });
    }
  }
  initRatesSlider();

  $(window).resize(function() {
    initRatesSlider();
  });

  // custom more
  var customDescMaxHeight = $('.customer_description').css('max-height');
  $('.customer_description_morebtn').on('click', function() {
    if ($(this).closest('.customer_description').css('max-height') === 'none') {
      console.log(1)
      $(this).closest('.customer_description').css('max-height', customDescMaxHeight);
      $(this).find('p').removeClass('uncover');
    } else {
      console.log(2)
      $(this).closest('.customer_description').css('max-height', 'unset');
      $(this).find('p').addClass('uncover');
    }
  })

  // popup
  $('.popup_link').on('click touchstart', function (e) {
    e.stopPropagation();
    e.preventDefault();
    if ($($(this).attr('href')).length) {

      if ($($(this).attr('href')).attr('data-width')) {
        $('#modal .modal_content').css('width', $($(this).attr('href')).attr('data-width'));
      }

      closeMobileMenu();
      $('#modal .content_place').html($($(this).attr('href')).html())
      $('#modal').css('display', 'flex');
    }
  })

  $('.modal_content').on('click', function (e) {
    e.stopPropagation();
  })

  $('#modal, #modal .modal_close').on('click', function () {
    $('#modal .modal_content').css('width', 'auto');
    $('#modal').hide();
    $('#modal .content_place').html('')
  })

  $('body').on('click', '.phone_video video', function() {
    this.paused ? this.play() : this.pause();
  });

  /*****************************************************/

  $(document).on('mouseup touchend', function() {
    touch = clicking = slideRates = false;
  })

});
