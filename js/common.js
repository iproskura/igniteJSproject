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
// *********************************

    // С****************************
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


        var auto = window.setInterval(autoPlay, 3000);

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
                this.style.width = this.width / 100 * 120 + "px"; //enlarge by 20%
            };
            childElems[j].onmouseout = function () {
                this.style.width = "";
            }
        }
    };
    //endof enlarge ******************************

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

    });

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

//    endof team


//    form validation
    // function toolTipShower(e) {
    //     var ttip = document.getElementById("tip");
    //
    //     tip.innerHTML = e.target.dataset.tooltip;
    //     ttip.style.width = e.target.offsetWidth;
    //     ttip.style.left = e.target.getBoundingClientRect().left + "px";
    //     ttip.style.top = e.target.getBoundingClientRect().top - 25 + "px";
    // }

    var formChilds = document.querySelectorAll("#formValidate input");
    var tipTargets = [];

    for (var i = 0; i < formChilds.length; i++) {
        if (formChilds[i].nodeType == 1 && formChilds[i].hasAttribute("data-tooltip")) {
            tipTargets.push(formChilds[i]);
        }
    }

    var sendMsgBtn = document.getElementById("sendMsgBtn");

    // В поле Name допускаются только буквы английского алфавита.
    // В поле Email допускаются толко буквы английского алфавита, цифры, знак подчеркивание и симвом @.
    // В поле Subject допускаются только буквы английского алфавита и цифры.
    var namePattern = /[a-z]/gi;
    // var emailPattern = /[.-a-z0-9@]/gi;                           //TODO bug
    var emailPattern = /b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;   //TODO bug
    var subjectPattern = /\w/gi;


    function validator(e) {
        var pattern;

        //tooltip section
        var ttip = document.getElementById("tip");
        tip.innerHTML = e.target.dataset.tooltip;
        ttip.style.width = e.target.offsetWidth;
        ttip.style.left = e.target.getBoundingClientRect().left + "px";
        ttip.style.top = e.target.getBoundingClientRect().top - 25 + "px";
        ttip.style.display = "none";
        //endof tooltip

        switch (e.target.name) {
            case "Name":
                pattern = namePattern;
                break;
            case "Email":
                pattern = emailPattern;
                break;
            case "Subject":
                pattern = subjectPattern;
                break
        }

        if (!e.target.value.match(pattern)) {
            ttip.style.display = "";
        } else {
            ttip.style.display = "none";
        }
    }

    function removeTip() {
        var ttip = document.getElementById("tip");
        ttip.style.display = "none";
    }

    // ttip/validation targets
    for (var j = 0; j < tipTargets.length; j++) {
        // tipTargets[j].addEventListener("invalid", toolTipShower);
        tipTargets[j].addEventListener("keypress", validator);
        tipTargets[j].addEventListener("blur", removeTip);
    }
//  endof form validation

//    #logoslider
    var logoslider = {
        slides: ["logo1.png", "logo2.png", "logo3.png", "logo4.png", "logo5.png", "logo6.png", "logo7.png"],
        frame: 0,
        set: function (image) {
            document.getElementById("logoslider").style.backgroundImage = "url(img/clients/" + image + ")";
        },

        init: function () {
            this.set(this.slides[this.frame]);
        },

        right: function () {
            this.frame++;
            if (this.frame == this.slides.length) this.frame = 0;
            this.set(this.slides[this.frame]);
        }
    };

    setInterval(function () {
        logoslider.right();
    }, 3000);
//    endof #logoslider

//    functions call section ******************

    slider();
    filtr();
    enlange();
    team();
    logoslider.init();
};
