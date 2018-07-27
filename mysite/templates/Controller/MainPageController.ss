<!DOCTYPE html>
<html lang="$ContentLocale">
<head>
    <% base_tag %>
    <title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/solid.css"
          integrity="sha384-S2gVFTIn1tJ/Plf+40+RRAxBCiBU5oAMFUJxTXT3vOlxtXm7MGjVj62mDpbujs4C" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/fontawesome.css"
          integrity="sha384-0b7ERybvrT5RZyD80ojw6KNKz6nIAlgOKXIcJ0CV7A6Iia8yt2y1bBfLBOwoc9fQ" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    $MetaTags(false)
</head>
<body class="w-100 h-100 position-absolute">
<div id="particles-js" class="w-100 h-100 position-fixed"></div>
<div id="root" class="w-100 h-100 position-absolute">
</div>

<script src="/scripts/particles.js"></script>
<script>
    window.addEventListener('load', function () {
        particlesJS("particles-js", {
            "fps_limit": 2,
            "particles": {
                "fps_limit": 2,
                "number": {"value": 160, "density": {"enable": true, "value_area": 800}},
                "color": {"value": "#ffffff"},
                "shape": {
                    "type": "circle",
                    "stroke": {"width": 0, "color": "#000000"},
                    "polygon": {"nb_sides": 5},
                    "image": {"src": "img/github.svg", "width": 100, "height": 100}
                },
                "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {"enable": true, "speed": 1, "opacity_min": 0, "sync": false}
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {"enable": false, "speed": 4, "size_min": 0.3, "sync": false}
                },
                "line_linked": {"enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {"enable": false, "rotateX": 600, "rotateY": 600}
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {"enable": true, "mode": "bubble"},
                    "onclick": {"enable": true, "mode": "repulse"},
                    "resize": true
                },
                "modes": {
                    "grab": {"distance": 400, "line_linked": {"opacity": 1}},
                    "bubble": {"distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3},
                    "repulse": {"distance": 400, "duration": 0.4},
                    "push": {"particles_nb": 4},
                    "remove": {"particles_nb": 2}
                }
            },
            "retina_detect": true
        });
    }, true);
</script>
</body>
</html>
