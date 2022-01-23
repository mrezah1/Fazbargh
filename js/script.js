// import Validation,{Ajax} from './app.js'
$(document).ready(function () {
  // division price
  $(function () {
    document.querySelectorAll(".div-price").forEach((item) => {
      item.innerHTML = [...item.innerHTML]
        .reverse()
        .map((n, i, a) => {
          return i > 2 && i % 3 == 0 ? `${n},` : n;
        })
        .reverse()
        .join("");
    });
    $(".persian-text").each(function (i) {
      const n = Number($(this).text());
      $(this).text(n.toLocaleString("fa-ir").split("٬").join(""));
    });
    $(".persian-number").each(function (i) {
      const n = Number($(this).text());
      $(this).text(n.toLocaleString("fa-ir"));
    });
  });
  // disabled link
  $(function () {
    $("[data-disable='true']").click(function (e) {
      e.preventDefault();
    });
  });
  // show nav on scroll up
  $(function () {
    let innerScroll = window.scrollY;
    $(window).scroll(function (e) {
      $("#header_menu").removeAttr("class");
      if (window.scrollY > 200) {
        if (window.scrollY < innerScroll)
          $("#header_menu").attr("class", "showNav");
        else $("#header_menu").attr("class", "hideNav");
        innerScroll = window.scrollY;
      } else $("#header_menu").removeAttr("class");
    });
  });
  // dropdown
  $(function () {
    $(".dropdown-toggler:not(#navigation_mobile .dropdown-toggler)").click(
      function (e) {
        // dont work document click funtion on click dropdown toggler
        e.stopPropagation();
        // hide outher show dropdown not inner dropdown
        $(this)
          .parent()
          .find(".dropdown")
          .not($(this).find(">.dropdown"))
          .addClass("hideAnim");
        // show or hide on click inner dropdown toggler
        $(this).find(">.dropdown").toggleClass("hideAnim");
        // called remove click event function
        closeDr($(this).find(">.dropdown"));
      }
    );
    // dont close dropdown on click for self
    $(".dropdown").click(function (e) {
      e.stopPropagation();
    });
    const closeDr = (selector) => {
      $(document).click(function () {
        $(selector).addClass("hideAnim");
        // remove event listener document after hide dropdown
        $(document).off();
      });
    };
    // mobile dropdown
    $("#mobileNavigation_toggler button").click(function () {
      $("#navigation_mobile").removeClass("d-none");
      setTimeout(() => {
        $("#navigation_mobile .wrapper-all").removeClass("hideAnim");
        $("#navigation_mobile .wrapper-nav").css("right", "0");
        // hide scroll
        $("body").addClass("hideSc");
      }, 100);
    });
    $("#navigation_mobile .wrapper-all").click(function () {
      $("#navigation_mobile .wrapper-nav").css("right", "-70%");
      setTimeout(() => {
        // show scroll
        $("body").removeClass("hideSc");
        $(this).addClass("hideAnim");
        setTimeout(() => {
          $("#navigation_mobile").addClass("d-none");
        }, 210);
      }, 620);
    });
    $("#navigation_mobile .wrapper-nav").click(function (e) {
      e.stopPropagation();
    });
    $("#navigation_mobile .dropdown-toggler,.Adropdown-toggler").click(function (e) {
      const drChild = $(this).find(">.dropdown");
      // e.stopPropagation();
      // remove outher dropdown selected class
      $(this).parent().find(".selected").removeClass("selected");
      // remove rotate arrow dropdown
      $(this).parent().find(".fa-angle-down").removeClass("rotate");
      // hide outher open dropdowns
      $(this)
        .parent()
        .find(".dropdown")
        .not($(this).find(">.dropdown"))
        .addClass("d-none");
      $(this)
        .parent()
        .find(".dropdown")
        .not($(this).find(">.dropdown"))
        .addClass("hideAnim");
      if (drChild.hasClass("d-none")) {
        // show dropdown by animation
        drChild.removeClass("d-none");
        setTimeout(() => drChild.removeClass("hideAnim"), 100);
        // rotate inner dropdown arrow
        $(this).find(">.fa-angle-down").addClass("rotate");
        // selected inner dropdown link
        $(this).find(">a").addClass("selected");
      } else {
        drChild.addClass("hideAnim");
        setTimeout(() => drChild.addClass("d-none"), 100);
        $(this).find(">.fa-angle-down").removeClass("rotate");
        $(this).find(">a").removeClass("selected");
      }
    });
  });
  //  slider
  $(function () {
    // header slider
    $("#header_slider .owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 4000,
      mouseDrag: false,
      // autoplayHoverPause: true,
      // checkVisible: true,
      // slideSpeed: 2000,
      paginationSpeed: 11100,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
    });
    // product slider
    $(".product-slider").each(function () {
      let count = $(this).attr('data-count') || '4';
      $(this).owlCarousel({
        margin: 0,
        nav: true,
        dots: false,
        autoplay: false,
        loop: true,
        responsive: {
          0: {
            items: 1,
          },
          700: {
            items: 2,
          },
          992: {
            items: 3,
          },
          1200: {
            items: count,
          },
          1600: {
            items: $(this).attr('data-plus') == 'true' ? Number(count) + 1 : count
          }
        },
      })
    })
    // brand slider
    $(".brand-slider").owlCarousel({
      // items:4,
      margin: 25,
      autoplay: true,
      loop: true,
      autoWidth: true,
      autoHeight: true,
    });
    $(".owl-prev span,.owl-next span").text("");
    $(".owl-prev span").attr("class", "fa fa-chevron-left");
    $(".owl-next span").attr("class", "fa fa-chevron-right");
  });
  // popup
  $(function () {
    // show popup
    $("[data-popup]").click(function () {
      $('body').addClass('hideSc');
      $(window).scrollTop(0);
      const selector = $(`${$(this).attr('data-popup')}`);
      // selector.find('.popup-wrapper').css('top', $(window).scrollTop());
      selector.addClass('showPop')
    })
    // hide by a self popup wrapper
    $('.popup-wrapper').click(function () {
      $(this).parent().removeClass('showPop');
      $('body').removeClass('hideSc');
      $(this).parent().find('form')[0].reset();
    })
    // hide by a btn close
    $('[data-popup="close"]').click(function () {
      $('body').removeClass('hideSc');
      $(this).closest('.popup-wrapper').parent().removeClass('showPop');
      $(this).closest('.popup-wrapper').find('form')[0].reset();
    })
    // dont hide if clicked in content popup
    $('.popup-content').click(function (e) {
      e.stopPropagation()
    })
  })
  // timer
  $(function () {
    $('[data-type=timer]').each(function () {
      const h = $(this).find('.hour');
      const m = $(this).find('.minute');
      const s = $(this).find('.second');
      let remainingTime = $(this).attr('data-time');
      let remaining = convertToSecond(remainingTime);
      function timerFn() {
        remaining--;
        /*         let days = Math.floor(remaining / 86400);
                let hours = Math.floor((remaining % 86400) / 3600); */
        let hours = Math.floor((remaining / 3600));
        let minutes = Math.floor(((remaining % 86400) % 3600) / 60);
        let seconds = ((remaining % 86400) % 3600) % 60;
        if (seconds === 0) {
          minutes = Math.floor(((remaining - 1 % 86400) % 3600) / 60);
          seconds = ((remaining - 1 % 86400) % 3600) % 60;
          remaining--;
        }
        // showDays
        //   ? console.log(`${days} -- ${hours}:${minutes}:${seconds}`)
        //   : console.log(`${hours}:${minutes}:${seconds}`);
        if (remaining <= 0)
          window.location.reload()
        else {
          h.text(persian(hours));
          m.text(persian(minutes));
          s.text(persian(seconds));
        }
      }
      const persian = st => {
        const convert = Number(st).toLocaleString("fa-ir").split("٬").join("");
        return convert.toString().length < 2 ? `۰${convert}` : convert;
      }
      function convertToSecond(stringTime) {
        const temp = stringTime.split(':');
        return (Number(temp[0]) * 3600) + Number(temp[1] * 60) + Number(temp[2])
      }
      timerFn();
      setInterval(timerFn, 1000);
    })
  })
  // set alt attribute slide item image
  $(function () {
    $(".slide-item").each(function () {
      const getTitle = $(this).find(".title a").text();
      $(this).find(".wrapper-image img").attr("alt", getTitle);
    });
  });
  // back to top scroll
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) $("#toTop").slideDown(350);
      else $("#toTop").slideUp(350);
    });
    $("#toTop").click(function () {
      const innerScroll = $(window).scrollTop();
      $("html, body").animate({ scrollTop: innerScroll + 50 }, 450);
      $("html, body").delay(150).animate({ scrollTop: 0 }, 400);
    });
  });
  // inner dom register code:
  $(function () {
    $('#input_code').keyup(function () {
      $(this).val().length == 6 ? $('#sendCode_form').submit() : null
    })
  })
  // search page
  $(function () {
    // search item function
    $('.search-input').keyup(function () {
      // find parent .wrapper
      const parent = $(this).closest('.wrapper');
      // show all items
      parent.find('.search-item').removeClass('d-none');
      // hide null message
      parent.find('.item-null').addClass('d-none');
      // get items search and convert to Array
      const items = [...parent.find('.search-item')];
      items.forEach(element => {
        const brandTxt = element.querySelector('.brand-txt').textContent;
        // if item not started with input value => item is hide
        if (brandTxt.indexOf($(this).val()) !== 0)
          element.classList.add('d-none');
      })
      // if not exist show item  => null message item is show
      parent.find('.search-item:not(.d-none)').length === 0 ?
        parent.find('.item-null').removeClass('d-none') : null
    })
    $('#min_price,#max_price').change(function () {
      const demo = $(this).parent().find('.demo');
      demo.text(Number($(this).val()).toLocaleString("fa-ir"));
    })
  })
  //******************************************************************
  // detail product page
  $(function () {
    // count product
    $('.minus-btn').click(function () {
      const dt = $(this).attr('data-target');
      const input = $(this).closest('.wrapper').find(`input${dt}`);
      if (input.val().trim() === '')
        input.val('1');
      if (Number(input.val()) > 1)
        input.val(Number(input.val()) - 1)
    })
    $('.plus-btn').click(function () {
      const dt = $(this).attr('data-target');
      const input = $(this).closest('.wrapper').find(`input${dt}`);
      if (input.val().trim() === '')
        input.val('1');
      else
        input.val(Number(input.val()) + 1)
    })
    $('.inputCount-product').focusout(function () {
      if ($(this).val().trim() === '')
        $(this).val('1');
    })
    // zoom box product
    $('#image_box .zoom-image').mousemove(function (e) {
      $('#image_box .zoom-image').css({
        backgroundPosition: `${e.offsetX - 300} ${e.offsetY - 300}`,
        display: 'block'
      })
    })
    $('#image_box .zoom-image').mouseout(function (e) {
      $(this).css({
        display: 'none',
        backgroundPosition: '0 0'
      })
    })
    // image clicked set to zoombox
    $('#cover_image .wrapper').click(function () {
      $(this).closest('.row').find('.wrapper').removeClass('selected');
      $(this).addClass('selected');
      const addressImg = $(this).find('img').attr('src');
      $('#image_box .official-image img').attr('src', addressImg);
      document.querySelector('#image_box .zoom-image').
        style.backgroundImage = `url(${addressImg})`
    })
    // nav tab 
    $('.wrapper-nav ul li').click(function () {
      // set style for item clicked(active) 
      const parentOfficial = $(this).closest('.wrapper-all');
      parentOfficial.find('.active').removeClass('active');
      $(this).addClass('active');
      // get transition duration for set delay show and hide
      let anim = parentOfficial.find('.wrapper-tab>div').css('transition-duration').replace('s', '');
      let timeDelay = (Number(anim) * 1000) + 100;
      console.log(timeDelay);
      // hide other show tab 
      parentOfficial.find('.wrapper-tab>div').addClass('hideAnim');
      setTimeout(() => {
        // hide other tab after timeDelay because ended transition css
        parentOfficial.find('.wrapper-tab>div').addClass('d-none');
        // remove d-none class inner tab after 450ms
        innerTab.removeClass('d-none');
      }, timeDelay);
      // get href item clicked and find self tab
      const innerHref = $(this).find('a').attr('href').replace('#', '');
      const innerTab = parentOfficial.find(`#${innerHref}`);
      // show inner tab after 15 second because ended previous settimeout (15 second after remove Class d-none)      
      setTimeout(() => { innerTab.removeClass('hideAnim') }, timeDelay + 15);
    })
  })
  // cart page
  $(function () {
    $('.posstick').each(function () {
      let sc = $(window).scrollTop();
      $(window).scroll(function () {
        if ($(this).scrollTop() > sc)
          $('#finished_shopping .posstick').css('top', '1rem')
        else
          $('#finished_shopping .posstick').css('top', '4rem')
        sc = $(this).scrollTop();
      })
    })
  })
  // fill official information page
  $(function () {
    $('#addNewAdress_form').each(function () {
      $('html').css('scroll-behavior', 'initial')
      $('#addNewAdress_form').submit(function (e) {
        e.preventDefault()
      })
      let icon = false, paragraph = false, clicked_element;
      console.log('true');
      // set style for selected address
      $('#select_address').click(function (e) {
        // remove outher select address style      
        const outherItem = $(this).find('.address-item.selected');
        outherItem.removeClass('selected');
        outherItem.find('.item-check-select').addClass('d-none');
        outherItem.find('.item-content').removeClass('col-md-9').addClass('col-md-10');
        // set select clicked item style
        const thisItem = $(e.target).closest('.address-item');
        thisItem.addClass('selected');
        // show checked icon selected
        thisItem.find('.item-check-select').removeClass('d-none');
        thisItem.find('.item-content').removeClass('col-md-10').addClass('col-md-9');
      })
      // check clicked in edit or delete btn and processing
      $('#select_address').click(function (e) {
        // if clicked in edit btn
        if (e.target.classList.contains('fa-pencil-alt')) {
          // show popup
          $(window).scrollTop(0);
          $('#add_address').addClass('showPop');
          $('body').addClass('hideSc')
          // reset form and variable
          resetFromAndVariable();
          // set variable for edit
          icon = true;
          clicked_element = $(e.target).closest('.address-item');
          // set input value edit address
          const stateSpan = clicked_element.find('.state').text();
          const citySpan = clicked_element.find('.city').text();
          [...$('#addNewAdress_form #state option')]
            .find(item => item.innerHTML == stateSpan).selected = 'selected';
          [...$('#addNewAdress_form #city option')]
            .find(item => item.innerHTML == citySpan).selected = 'selected';
          $('#addNewAdress_form #postal_code').val(clicked_element.find('.postalCode').text());
          $('#addNewAdress_form #address').val(clicked_element.find('.addressText').text());
          // call render function
          handlerAddAndEditAdress()
        }
        else if (e.target.classList.contains('fa-times'))
          removeAddress($(e.target).closest('.address-item'));
      });
      $('#addNew_address').click(function () {
        paragraph = true;
        handlerAddAndEditAdress()
      });
      $('#add_address .popup-wrapper,#add_address [data-popup="close"]').click(function () {
        resetFromAndVariable()
      })
      // functions😍
      function handlerAddAndEditAdress() {
        new Validation('#addNewAdress_form', [],
          [
            ['address', { minlength: 10 }, { minlength: '' }],
            ['postal_code', { minlength: 10, maxlength: 10, number: true },
              { minlength: '', maxlength: '', number: '' }]
          ],
          () => {
            // get input value form and for passed to self function
            const state = $('#addNewAdress_form #state option:selected').text();
            const city = $('#addNewAdress_form #city option:selected').text();
            const postalCode = $('#addNewAdress_form #postal_code').val();
            const addressText = $('#addNewAdress_form #address').val();
            // check edit or create address
            if (icon)
              editAddress(state, city, postalCode, addressText)
            else if (paragraph)
              createAddress(state, city, postalCode, addressText);
            // call reset form and reset variable function
            resetFromAndVariable();
            [...$('#addNewAdress_form #state option,#addNewAdress_form #city option')]
              .filter(item => item.value == '')
              .map(item => item.setAttribute('selected', 'selected'))
            // close popup
            $('body').removeClass('hideSc');
            $('#add_address').removeClass('showPop');
          })
      }
      function createAddress(state, city, postalCode, addressText) {
        $('#select_address').append(
          `<div class="address-item tr mt-3 cp bg-white py-4 borderE px-3">
        <div class="row m-0 align-items-center">
            <div class="col-1 px-md-2 item-check-select d-none tr c666">
                <div class="d-flex justify-content-center br-circle
                align-items-center">
                    <i class="fa fa-check"></i>
                </div>
            </div>
            <div class="col-11 px-md-2 col-md-10 item-content">
            <p>
            استان
            <span class="state">${state}</span> -                                            
            شهر
            <span class="city">${city}</span> -
            <span class="addressText">${addressText}</span> -
            کد پستی
              <span class="postalCode">${postalCode}</span>
            </p>
            </div>
            <div class="col-12 col-md-2 w-btns txt-blue txt-left f-16">
                <span class="pl-3"><i class="fa fa-pencil-alt"></i></span>
                <span><i class="fa fa-times"></i></span>
            </div>
        </div>
    </div>`
        )
      }
      function editAddress(state, city, postalCode, addressText) {
        clicked_element.html(`
      <div class="row m-0 align-items-center">
      <div class="col-1 px-md-2 item-check-select d-none tr c666">
          <div class="d-flex justify-content-center br-circle
          align-items-center">
              <i class="fa fa-check"></i>
          </div>
      </div>
      <div class="col-11 px-md-2 col-md-10 item-content">
      <p>
      استان
      <span class="state">${state}</span> -                                            
      شهر
      <span class="city">${city}</span> -
      <span class="addressText">${addressText}</span> -
      کد پستی
        <span class="postalCode">${postalCode}</span>
      </p>
      </div>
      <div class="col-12 col-md-2 w-btns txt-blue txt-left f-16">
          <span class="pl-3"><i class="fa fa-pencil-alt"></i></span>
          <span><i class="fa fa-times"></i></span>
      </div>
  </div>`
        )
      }
      function resetFromAndVariable() {
        // reset variable
        icon = false;
        paragraph = false
        // reste form
        $('#addNewAdress_form')[0].reset();
        $('#addNewAdress_form #state option:selected,#addNewAdress_form #city option:selected')
          .removeAttr('selected');
      }
      function removeAddress(selector) {
        selector.css('opacity', '0');
        setTimeout(() => {
          selector.remove()
        }, 210);
      }
    })
  })
  // check finish information
  $(function () {
    // enable submit button after select payment
    $('.custom-radio[name=select_payment]').change(function () {
      $('#submit_payment').removeAttr('disabled').removeClass('fade').addClass('fade-hover');
    })
  })
  //information account page
  $(function () {
    try {
      $('#account_tab').each(function () {
        const links = [...$('#account_tab .wrapper-nav ul li a')].
          map(a => a.getAttribute('href').replace('#', ''));
        const loc = window.location.href;
        let elementId = loc.substr(loc.indexOf('#') + 1, loc.length);
        // if not selected item => select doshboard
        if (links.indexOf(elementId) === -1) {
          $('#doshboard').removeClass('d-none').removeClass('hideAnim');
          $('#account_tab .wrapper-nav ul li a[href="#doshboard"]').parent().addClass('active');
        }
        else {
          // show this tab 
          $(this).closest('.wrapper-all').find(`#${elementId}`)
            .removeClass('d-none').removeClass('hideAnim');
          // active nav tab
          $(this).closest('.wrapper-all').find(`[href="#${elementId}"]`).parent().addClass('active')
        }
      })
    } catch (e) { }
  })
  // end dom functions
  //******************************************************************
  //Practical functions:
  // get value
  const gtv = selector => $(selector).val();
  // only number validation
  $(function () {
    // console.clear();
    $('[data-valid=number]').keypress(function (event) {
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
      } else if (key < 48 || key > 57) {
        return false;
      } else {
        return true;
      }
    })
  })
  // end Practical functions
  //******************************************************************
  // validation and ajax:
  function validationFn() {
    // contact page:
    new Validation(
      '#contact_us_form', [], [['yourEmail', { email: true }, { email: '' }]],
      () => {
        new Ajax(
          'https://jsonplaceholder.typicode.com/posts',
          {
            fullName: gtv('#fullName'),
            email: gtv('#yourEmail'),
            subject: gtv('#subjectMsg'),
            message: gtv('#yourMessage')
          },
          () => { $('.msgsub').html('<p class="txt-green">پیام شما با موفقیت ارسال شد.</p>'); console.log('success'); },
          () => { $('.msgsub').html('<p class="txt-red">خطا در ارسال پیام !</p>'); console.log('error'); })
      })
    // register:
    new Validation(
      '#register_form', [],
      [['phoneNumber', { number: true, minlength: 11, maxlength: 11 },
        { number: '', minlength: '', maxlength: '' }],
      ['password', { minlength: 8 }, { minlength: 'حداقل 8 کارکتر وارد کنید !' }],
      ['confirm_password', { equalTo: '#password' }, { equalTo: 'رمز عبور با تکرار آن مطابقت ندارد!' }]]
      , () => {
        new Ajax('https://jsonplaceholder.typicode.com/posts',
          {
            firstName: gtv('#firstName'),
            email: gtv('#email'),
            password: gtv('#password'),
            confirm_password: gtv('#confirm_password')
          }
          , response => {
            // if (response.hasOwnProperty('dataEror'))
            //   $('.msgsub').html(`<p>${response.dataError}</p>`)
            // else {
            // show code box
            // }
            // console.log(true)
          }, () => { },
          () => { $('.spinner').removeClass('hideAnim') },
          () => { $('.spinner').addClass('hideAnim') },
        )
      })
    // sendCode register
    new Validation('#sendCode_form', [],
      [['input_code',
        { number: true, minlength: 6, maxlength: 6 },
        { number: '', minlength: '', maxlength: '' }]],
      () => { alert(true) }
    )
    // login
    new Validation('#login_form', [], [
      ['phoneNumber', { number: true, minlength: 11, maxlength: 11 },
        { number: '', minlenght: '', maxlength: '' }],
      ['password', { minlength: 8 }, { minlength: '' }]],
      () => {
        alert(true)
      })
    // forget password
    new Validation('#forgetPassword_form', [], [['email_address',
      { email: true, minlength: 10 }, { email: '', minlength: '' }]],
      () => { alert(true) });
    // set new password
    new Validation('#setNewPassword_form', [],
      [
        ['new_password', { minlength: 8 }, { minlength: 'حداقل 8 کاراکتر وارد کنید !' }],
        ['confirm_new_password', { equalTo: '#new_password' }, { equalTo: 'رمز عبور با تکرار آن مطابقت ندارد !' }]
      ], () => { alert(true) }
    )
    // sned comment form
    new Validation('#sendComment_form', [], [['email', { email: true }, { email: '' }]],
      () => { alert(true) })
    // Copen cart form
    new Validation('#copenCart_form', [], [], () => { alert(true) })
    // move lbl error send box to lasted parent
    $('#general_informationShop_form').submit(function () {
      setTimeout(() => {
        const errorEl = $('#general_informationShop_form #send_tipbox + label.error');
        errorEl.addClass('pr-3').addClass('pt-3').text('لطفا نوع ارسال را انتخاب کنید!');
        $('#send_truck').parent().after(errorEl);
      }, 100);
    })
    // information finish shopping 
    new Validation(
      '#general_informationShop_form',
      ['description'],
      [
        ['firstName', { minlength: 3 }, { minlength: '' }],
        ['lastName', { minlength: 3 }, { minlength: '' }],
        ['email_address', { email: true, minlength: 10 }, { email: '', minlenght: '' }],
        ['mobile_NumberPhone', { minlength: 11, maxlength: 11, number: true },
          { minlength: '', maxlength: '', number: '' }],
        ['static_NumberPhone', { minlength: 11, maxlength: 11, number: true },
          { minlength: '', maxlength: '', number: '' }],
        ['natural_code', { minlength: 10, maxlength: 10, number: true },
          { minlength: '', maxlength: '', number: '' }],
        // ['address', { minlength: 10 }, { minlength: '' }],
        // ['postal_code', { minlength: 10, maxlength: 10, number: true },
        //   { minlength: '', maxlength: '', number: '' }],
      ],
      () => { alert(true) }
    )
  }
  try { validationFn() } catch (e) { }
  // end document ready
})
// customize input type range
function inputRange() {
  function isOlderEdgeOrIE() {
    return (
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
      window.navigator.userAgent.indexOf("Edge") > -1
    );
  }
  function valueTotalRatio(value, min, max) {
    return ((value - min) / (max - min)).toFixed(2);
  }
  function getLinearGradientCSS(ratio, leftColor, rightColor) {
    return [
      '-webkit-gradient(',
      'linear, ',
      'left top, ',
      'right top, ',
      'color-stop(' + ratio + ', ' + leftColor + '), ',
      'color-stop(' + ratio + ', ' + rightColor + ')',
      ')'
    ].join('');
  }
  function updateRangeEl(rangeEl) {
    // rangeEl.forEach(a => {
    var ratio = valueTotalRatio(rangeEl.value, rangeEl.min, rangeEl.max);
    rangeEl.style.backgroundImage = getLinearGradientCSS(ratio, '#ff324d', '#DFDFDF');
    // })
  }
  function initRangeEl() {
    var rangeEl = document.querySelectorAll('input[type=range]');
    rangeEl.forEach(a => {
      if (isOlderEdgeOrIE()) {
        a.style.height = "20px";
      } else {
        updateRangeEl(a);
        a.addEventListener("input", function (e) {
          updateRangeEl(e.target);
        });
      }
    })
  }
  initRangeEl()
}
