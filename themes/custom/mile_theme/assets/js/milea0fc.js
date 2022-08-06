(function ($, Drupal) {
    'use strict'
    let loads = 0;
    Drupal.behaviors.mile = {
      attach: function (context, settings) {
          if(loads == 0){
                
                let randomImage = Math.floor(Math.random() * settings.bgCant) + 1;
                let images =[];
                for (var i = 0; i < settings.bgUrls.length; i++) {
                    images[i] = new Image();
                    images[i].src = preload.arguments[i];
                }
            

                document.querySelector('.mile-container').style.backgroundImage = 'url('+settings.bgUrls[randomImage]+')';

                

                if(settings.showMap){
                    let coords = settings.coords.split(",");
                    let map = L.map('Map', {
                        center: coords,
                        zoom: 13
                    });

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
                        foo: 'bar', 
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                    }).addTo(map);

                    L.marker(coords).addTo(map);
                }
                
                if(document.querySelector('.mile-node-65')){
                    document.querySelector('.block-mile-theme-page-title').style.display = 'none';
                }

                // Modal
                if(settings.isFrontPage == 1){
                    $('#messageModal').modal('show');
                }
                // Events
                /** Events Main Menu */
                document.getElementById('OpenMainMenu').addEventListener('click', () => {
                    document.getElementById("MainMenu").style.width = "100%";
                    document.getElementById('OpenMainMenu').style.opacity = "0.2";
                });

                document.getElementById('CloseMainMenu').addEventListener('click', () => {
                    document.getElementById("MainMenu").style.width = "0%";
                    document.getElementById('OpenMainMenu').style.opacity = "1";
                });

                /** */
                /** Scrip modal Posters */
                let posters = document.querySelectorAll('.btn-poster');
                posters.forEach((el) => {
                    el.addEventListener('click', function(){
                        let image = this.getAttribute('data-image');
                        document.querySelector('.content-global-modal').innerHTML = "<img src='"+image+"' />";
                        document.querySelector('.global-modal').classList.add('active');
                    });
                });

                document.querySelector('.btn-close-global-modal').addEventListener('click', ()=> {
                    document.body.style.overflow = 'auto';
                    document.querySelector('.global-modal').classList.remove('active');
                    document.querySelector('.content-global-modal').innerHTML = '';
                });

                let nominaciones = document.querySelectorAll('.view-nominaciones .item-view');
                nominaciones.forEach((_el) => {
                    _el.addEventListener('click', function() {
                        let title = this.querySelector('.views-field-title').innerText;
                        let video = this.querySelector('.views-field-field-video-promo iframe') ? this.querySelector('.views-field-field-video-promo iframe').src : 'none';
                        let form = this.querySelector('.views-field-field-ct-iframe iframe') ? this.querySelector('.views-field-field-ct-iframe iframe').src : 'none';
                        let nameWinner = this.querySelector('.views-field-field-nombre-ganador').innerText;
                        let pictureWinner = this.querySelector('.views-field-field-imagen-ganador img').src;
                        let html = ''; 
                            html += '<div class="nominaciones-modal">';
                                html += '<div class="content">';
                                    html += '<h2>'+title+'</h2>';
                                        html += '<div class="video-formulario">';
                                        if(video !== 'none')
                                        { 
                                            html += ' <div class="embed-responsive embed-responsive-16by9">';
                                                html += '<iframe src="'+video+'" class="embed-responsive-item"></iframe>';
                                            html += '</div>';
                                        }

                                        if(form !== 'none')
                                        {
                                            html += '<iframe src="'+form+'" class="formulario"></iframe>';
                                        }
                                            html += '<div class="card-winner">'
                                            html += '<h3>'+nameWinner+'</h3>';
                                            html += '<img src="'+pictureWinner+'" class="picture-winner img-fluid">';
                                            html += '</div>';
                                        html += '</div>';   
                                    html += '</div>';
                                html += '</div>';

                
                        document.body.style.overflow = 'hidden';
                        document.querySelector('.content-global-modal').innerHTML = html;
                        document.querySelector('.global-modal').classList.add('active');
                    });
                });
            }
            loads++;
        }
    }
})(jQuery, Drupal);