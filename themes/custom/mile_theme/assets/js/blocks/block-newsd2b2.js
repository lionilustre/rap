(function (Drupal,$) {
    'use strict'
    Drupal.behaviors.ivan = {
      attach: function (context, settings) {
            
            $('.view-news .row').addClass('owl-carousel');
            $('.view-news .row').addClass('owl-theme');
            let owl = $('.owl-carousel').owlCarousel({
                loop:false,
                margin:10,
                nav:true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        items:1
                    },
                    1000: {
                        items: 2
                    }
                }
            });

            owl.on('mousewheel', '.owl-stage', function (e) {
                if (e.deltaY>0) {
                    owl.trigger('next.owl');
                } else {
                    owl.trigger('prev.owl');
                }
                e.preventDefault();
            });

            $('.news-link').each((_index, _element) => {
                let externalLink = _element.querySelector('.external-link').innerText;
                let internalLink = _element.querySelector('.internal-link').innerText;

                if(externalLink != ''){
                    _element.href = externalLink;
                    _element.setAttribute('target', '_blank')
                }
                else
                {
                    _element.href = internalLink;
                }
            });
        }
    }
})(Drupal, jQuery);