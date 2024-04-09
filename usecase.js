<!-- Script to add splide slider and CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide-core.min.css" integrity="sha256-ZAXImCY06SjVuIrJfWUETkyCctX5aGdL1AVEBX5CxZA=" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js" integrity="sha256-FZsW7H2V5X9TGinSjjwYJ419Xka27I8XPDmWryGlWtw=" crossorigin="anonymous"></script>

<script>
var splide = new Splide( '#splide-celo', {
  fixedWidth: '640px',
  start:1,
	perMove: 1,
  gap: '16px',
  pagination: false,
  type   : 'slide',
	focus  : 'center',
  heightRatio:0.3,
  breakpoints: {
		991: {
    	start:0,
    	arrows: false,
    	drag: 'free',
      snap: true,
      focus  : 'start',
			fixedWidth: false,
      perPage:2,
		},
    479: {
    	heightRatio:0.5,
			perPage:1,
      gap: '0.75rem',
		},
  }
} );
splide.mount();
</script>

<script>
var splide = new Splide( '#spotlight-slider', {
  perPage:3,
  start:1,
	perMove: 1,
  gap: '16px',
  pagination: false,
  type   : 'loop',
	focus  : 'center',
  breakpoints: {
		991: {
    	start:0,
    	arrows: false,
    	drag: 'free',
      snap: true,
      focus  : 'start',
      perPage:2,
		},
    479: {
			perPage:1,
      gap: '0.75rem',
		},
  }
} );
splide.mount();
</script>
