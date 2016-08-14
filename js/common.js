window.onload = function () {

    //smooth
    (function () {
        'use strict';

        var smooScroll = function (anchor, dur) {

            // how far and how fast
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance / (dur / 16);
            var stopAnim;


            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnim();
            };

            // scroll down ?
            if (increments >= 0) {
                // reach target or end of page
                stopAnim = function () {
                    var travelled = window.pageYOffset;
                    if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                        clearInterval(runAnim);
                    }
                };
            }
            // scrolling up ?
            else {
                // reach anchor or page top
                stopAnim = function () {
                    var travelled = window.pageYOffset;
                    if (travelled <= (endLocation || 0)) {
                        clearInterval(runAnim);
                    }
                };
            }


            var runAnim = setInterval(animateScroll, 16);
        };

        // Define links
        var scrollToggle = document.querySelectorAll('.scroll');

        [].forEach.call(scrollToggle, function (toggle) {

            toggle.addEventListener('click', function (e) {
                e.preventDefault();

                //  calculate distance
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = 750;

                if (dataTarget) {
                    // Scroll to the anchor
                    smooScroll(dataTarget, dataSpeed);
                }
            }, false);
        }); //toggle
    })();  //endof smooth
// ***************************************************************

    // СЛАЙДЕР
    function slider() {
        var sliders = document.getElementById("banner").getElementsByClassName("banner-item").length;
        var n = 0;

        function sec() {
            n = ( n >= sliders) ? 0 : sliders - 1;
            add(n);
        }

        sec();

        function autoPlay() {
            n++;
            sec();
        }

        // автоматическое показ слайдов
        var auto = window.setInterval(autoPlay, 3000);
        // листаем влево
        document.querySelector(".b-nav-left").onclick = function () {
            clearInterval(auto);
            n--;
            //после 5 секунд неактивности запускаем автоматическое показ слайдов
            setTimeout(function () {
                auto = window.setInterval(autoPlay, 3000);
            }, 5000);
            return sec();

        };

        // листаем вправо
        document.querySelector(".b-nav-right").onclick = function () {

            clearInterval(auto);
            n++;

            //после 5 секунд неактивности запускаем автоматическое показ слайдов
            setTimeout(function () {
                auto = window.setInterval(autoPlay, 3000);
            }, 5000);
            return sec();

        };

        // показываем нужный слайд
        function add(n) {
            var obj = document.getElementById("banner").getElementsByClassName("banner-item");
            // скрываем все слайды
            for (var i = 0; i < obj.length; i++) {
                obj[i].classList.remove("show");
            }
            // делаем видимым нужный слайд
            obj[n].classList.add("show");
        }

    }

    slider();
    // endof slider ******************************************************


    function enlange() {


        var childs = document.getElementsByClassName("enlarge");
        var childElems = [];
        for (var i = 0; i < childs.length; i++) {

            if (childs[i].nodeType == 1) {
                childElems.push(childs[i]);
            }
        }
        for (var j = 0; j < childElems.length; j++) {
            childElems[j].onmouseover = function () {
                this.style.width = this.width + "px";
                this.style.width = this.width / 100 * 120 + "px";

            };
            childElems[j].onmouseout = function () {
                this.style.width = "";
            }

        }
    };
    //endof enlarge *****************************************************

    enlange();
    /*
     function Menu(elem) {
     elem.onclick = function (e) {
     var target = e.target;
     var action = target.getAttribute('data-status');
     if (action) {

     a = document.getElementById(action);

     to = a.offsetTop;
     var currentScroll = window.scrollY,
     down = currentScroll < to;

     var scr = setInterval(function () {
     currentScroll = currentScroll + 10 * (down ? 1 : -1);
     window.scrollTo(0, currentScroll);
     if ((down && currentScroll > to) || (!down && currentScroll < to)) {
     clearInterval(scr);
     }
     }, 10);

     }
     };
     }

     new Menu(menu);*/

    function filtr() {
        var tabs = document.getElementById("filtr").querySelector(".filtr-item").getElementsByClassName("let1");
        var nav = document.getElementById("filtr").getElementsByTagName("a");
        for (var i = 0; i < nav.length; i++) {
            nav[i].onclick = function () {

                for (var i = 0; i < nav.length; i++) {
                    nav[i].classList.remove("active");
                }
                this.classList.add("active");

                nava = this.getAttribute("data-filtre");

                // скрываем все елементы
                for (var j = 0; j < tabs.length; j++) {

                    tabs[j].style.opacity = "0";
                    if (nava == "all") {
                        tabs[j].style.opacity = "1";
                    }
                    chek = tabs[j].classList.contains(nava);
                    if (chek) {
                        tabs[j].style.opacity = "1";
                    }
                }
            };
        }
    }

    filtr();


    var olso = true;
    document.addEventListener('scroll', function () {
        var wh = window.pageYOffset + window.innerHeight;
        var gh = document.getElementById("hdoit").offsetTop;

        if (wh > gh) {

            if (olso) {
                chet();
                olso = false;
            }
        }

    })

    function chet() {
        var a = document.getElementsByClassName("hdoit-t");
        for (var i = 0; i < a.length; i++) {

            var c = a[i];
            var b = a[i].innerHTML;

            printNumbersInterval(c, b);

            function printNumbersInterval(c, b) {
                var i = 0;
                var timerId = setInterval(function () {

                    if (i > b) {
                        i = b;
                    }
                    c.innerHTML = parseInt(i);
                    if (i == b) clearInterval(timerId);
                    i += b / 300;
                }, 10);
            }
        }

    }


    var can = true;
    document.addEventListener('scroll', function () {
        var wh = window.pageYOffset + window.innerHeight;
        var gh = document.getElementById("team-card").offsetTop;

        if (wh > gh) {

            if (can) {
                var canvas = document.getElementsByTagName('canvas');

                for (var i = 0; i < canvas.length; i++) {
                    progressBar(canvas[i]);
                }
                can = false;
            }
        }

    });
    // load the canvas
    function progressBar(canvasId) {
        var degreesCall;

        var canvas = canvasId;
        var ctx = canvas.getContext('2d');

        var cWidth = canvas.width;
        var cHeight = canvas.height;
        var progressColor = '#ffe600';
        var circleColor = '#fff';
        var rawPerc = canvas.getAttribute('data-perc');
        var perc = parseInt(rawPerc);
        var degrees = 0;
        var endDegrees = (360 * perc) / 100;

        var lineWidth = 7;

        // console.log(canvasId + ' ' + perc);

        function getDegrees() {
            if (degrees < endDegrees) {
                degrees++;
            } else {
                clearInterval(degreesCall);
            }

            drawProgressBar();
        }

        function drawProgressBar() {
            //clear the canvas after every instance
            ctx.clearRect(0, 0, cWidth, cHeight);

            // let's draw the background circle
            ctx.beginPath();
            ctx.strokeStyle = circleColor;
            ctx.lineWidth = lineWidth - 1;
            ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0, Math.PI * 2, false);
            ctx.stroke();
            // var radians = 0; // We need to convert the degrees to radians

            var radians = degrees * Math.PI / 180;
            // let's draw the actual progressBar
            ctx.beginPath();
            ctx.strokeStyle = progressColor;
            ctx.lineWidth = lineWidth;
            ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
            ctx.stroke();

            // let's get the text
            ctx.fillStyle = progressColor;
            ctx.font = '300 30px Oswald';
            var outputTextPerc = Math.floor(degrees / 360 * 100) + '%';
            var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
            ctx.fillText(outputTextPerc, cWidth / 2 - outputTextPercWidth / 2, cHeight / 2 + 10);
        }

        degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees));
    }

    function team() {
        var a = document.getElementsByClassName("team-j");
        var b = document.getElementsByClassName("team-card-j");
        var c = document.getElementsByClassName("t-close");
        for (var i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function () {

                for (var j = 0; j < b.length; j++) {
                    a[j].classList.remove("go");
                    b[j].classList.remove("show");
                    if (this == a[j]) {
                        b[j].classList.add("show");
                        this.classList.add("go");
                    } else {

                    }
                }
            });
        }

        for (var g = 0; g < c.length; g++) {
            c[g].addEventListener('click', function () {
                for (var k = 0; k < b.length; k++) {
                    b[k].classList.remove("show");
                    a[k].classList.remove("go");
                }
            });
        }
    }

    team();
//
};
