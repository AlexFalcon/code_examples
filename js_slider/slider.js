

$(function() {
function slidePanel( newPanel, direction ) {
// define the offset of the slider obj, vis a vis the document
var offsetLeft = $slider.offset().left;
 

var hideLeft = -1 * ( offsetLeft + $slider.width() );

var hideRight = $slider.width();

 

if ( direction == 'left' ) {
var currPos = hideLeft;
var nextPos = hideRight;
}
else {
var currPos = hideRight;
var nextPos = hideLeft;
}
 

$slider.children('.slide-panel.active').animate({
left: currPos
}, 1000, function() {
$(this).removeClass('active');
});

$( $sliderPanels[newPanel] ).css('left', nextPos).addClass('active').animate({
left: 0
}, 1000 );
}


var $slider = $('#full-slider');
var $sliderPanels = $slider.children('.slide-panel');
 

var $navLeft = $('#full-slider-nav-left');
var $navRight = $('#full-slider-nav-right');

var currPanel = 0;
var funcPanel = 0;
 




function autoSlide (funcPanel, sliderPanels) {
	funcPanel = currPanel;
	funcPanel++;
	if ( funcPanel >= sliderPanels.length ) funcPanel = 0;
	//alert(funcPanel);
	slidePanel(funcPanel, 'left');
	slide('photobar', 500, 'left');
	
	
	var fu = function() {autoSlide(funcPanel, sliderPanels)};
	setTimeout(fu, 20000);
	currPanel = funcPanel; //синхронизируем значения
	
}

 var fun = function() {autoSlide(funcPanel,  $sliderPanels)}; 
setTimeout(fun, 8000); 


$navLeft.click(function() {
fun = 0; //обнуляем вызов функции, если есть клик
 currPanel--;
// check if the new panel value is too small
if ( currPanel < 0 ) currPanel = $sliderPanels.length-1;
//alert(currPanel);
slidePanel(currPanel, 'right');
slide('photobar', 500, 'right');
funcPanel = currPanel;
});
 
$navRight.click(function() {
fun = 0;  //обнуляем вызов функции, если есть клик
currPanel++; 
// check if the new panel value is too big
if ( currPanel >= $sliderPanels.length ) currPanel = 0;
//alert(currPanel);
slidePanel(currPanel, 'left');
slide('photobar', 500, 'left');
funcPanel = currPanel; //синхронизируем
});
	
});