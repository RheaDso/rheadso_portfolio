$(document).ready(function() {
  // MODAL
  var modalText = {
    olympic: {
      title: 'Olympics App',
      link: 'https://www.figma.com/file/0Vyqau6t8WvYru8HjrGGb0/Olympics-App?type=design&node-id=0%3A1&mode=design&t=aBaA8q71PdwFzjOI-1'
    },
    gadigoda: {
      title: 'GadiGoda Cab/Food App',
      link: 'https://www.figma.com/file/AZ2mOlcri5JHgSKeVmTKBf/GadiGoda-App?type=design&mode=design&t=aBaA8q71PdwFzjOI-1'
    },
    salon: {
      title: 'Book My Salon',
      link: 'https://www.figma.com/file/sTCstjyd2c6zKpowaQsXKA/Rhea-BookMySalon?type=design&mode=design&t=aBaA8q71PdwFzjOI-1'
    },
    babyproducts: {
      title: 'Baby Products App',
      link: 'https://www.figma.com/file/L7lTQsznp0bN0LsC85Mpni/E-Commerce?type=design&node-id=0%3A1&mode=design&t=dg69Y0Bb6OpMsvyn-1'
    },
    workout: {
      title: 'Steps Workout App',
      link: 'https://www.figma.com/file/AIsPgnOHBvP4QQjS5BM9Qd/Workout-App?type=design&node-id=0%3A1&mode=design&t=aBaA8q71PdwFzjOI-1'
    },
    weather: {
      title: 'Weather App',
      link: 'https://rheaweatherapp.netlify.app/'
    },
    me: {
      title: 'Know About ME',
      link: 'https://github.com/RheaDso/know-about-me',
    },
    geolocation: {
      title: 'Geolocation',
      link: 'https://geolocationrhea.netlify.app/',
    },
    music: {
      title: 'Music Genre Prediction',
      link: 'https://github.com/RheaDso/Music-Genre-Prediction'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(value) {
      $(this).css({
        background:
          "url('img/" + id + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
