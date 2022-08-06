(function (Drupal) {
    'use strict'

    let loads = 0;
    Drupal.behaviors.gallery = {
      attach: function (context, settings) {
        if(loads == 0)
        {
            let slideIndex = 1;
            let opm = document.querySelectorAll('.opm');
            let gc = document.querySelector('.gallery-container');   

            document.querySelector('a.prev').addEventListener('click', () => {
                plusSlides(-1);
            });
            document.querySelector('a.next').addEventListener('click', () => {
                plusSlides(1)
            });
            
            document.addEventListener('keydown', (ev) => {
                if(gc.classList.contains('active'))
                {
                    if(ev.keyCode == 39) {
                        plusSlides(1)
                    }
            
                    if(ev.keyCode == 37) {
                        plusSlides(-1);
                    }
                }
            });

            document.querySelector('.btn-close-gallery-modal').addEventListener('click', () => {
                gc.classList.remove('active');
            });
            
            opm.forEach(function(element){
                element.addEventListener('click', function() {
                    slideIndex = parseInt(this.getAttribute('data-opm')) - 1;
                    plusSlides(1);
                    gc.classList.add('active');
                });
            })

            // Next/previous controls
            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function showSlides(n) {
                let i,
                slides = document.getElementsByClassName("gallery-slide");
                if (n > slides.length) {slideIndex = 1}
                if (n < 1) {slideIndex = slides.length}
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slides[slideIndex-1].style.display = "block";
            }
        }
        loads ++;
      }
    }
})(Drupal);