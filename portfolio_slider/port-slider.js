
$(function () {

function portSlidePanel (direction) {

 
//устанавливаем смещение при прокрутке слайдов
var iter = 201 //Смещение слайдов
var hideLeft =  '-='+iter;
var hideRight = '+='+iter;

	


//функция помещения набора нужных узлов в массив
function changeNodes (div) {
var items = [];
	for(c=i=0;i<div.childNodes.length;i++){
	  if (div.childNodes[i].nodeType==1){
	   items[c] = div.childNodes[i];
	   c++;
		}
	}
	return items;
}

//применяем функцию
var items = changeNodes(slider);

/* var items = [];
	for(c=i=0;i<slider.childNodes.length;i++){
	  if (slider.childNodes[i].nodeType==1){
	   items[c] = slider.childNodes[i];
	   c++;
	}
	} */
	
//Устанавливаем коэфициент умножения отступов для последующих в списке слайдов
var countLeft = items.length-1;
	//если направление прокрутки налево
if ( direction == 'left' ) {
//функция перестановки слайдов
var changeFirst = function () {


//устанавливаем первый в списке слайд в кнец списка и изменяем ему left
 slider.appendChild(items[0]);
setTimeout(function () {items[0].style.left = iter * countLeft;},100); 

/* setTimeout(function () {items[0].style.left = 206 *4 },500);

setTimeout(function () {slider.appendChild(items[0]) },500); */

}
//анимируем и вызываем функцию перестановки 
sliderPanels.animate({
left: hideLeft
}, 1000)
setTimeout(changeFirst,1000)

}
//если направление прокрутки направо, то
else {
//функция перестановки наоборот
var changeLast = function () {
	slider.insertBefore(items[countLeft], items[0] );
	items[items.length -1].style.left = -iter;
	
}
	changeLast()
	sliderPanels.animate({
	left: hideRight
	}, 1000)
	/* setTimeout(changeLast,1000) */

}
 


 }

/* var $slider = $('#main-slider-block'); */

var sliderPanels = $('#main-slider-block .port-slide');
var slider = document.getElementById('main-slider-block'); 

 
/* var $navWrap = $('<div id="full-slider-nav"></div>').appendTo( $headerBlock ); */
var $navLeft = $('#port-nav-left');
var $navRight = $('#port-nav-right');
/* var $headerBlock = $('#header-block');  */

  
/* alert($sliderPanels.css("left")); 
 */


 var limitExecByInterval = function(fn, time) {	
	var lock, execOnUnlock, args;
	return function() {
		args = arguments;
		if (!lock) {				
			lock = true;
			var scope = this;
			setTimeout(function(){
				lock = false;
				if (execOnUnlock) {
					args.callee.apply(scope, args);
					execOnUnlock = false;
				}
			}, time);
			return fn.apply(this, args);
		} else execOnUnlock = true;
	}
}
 
var newFunc = limitExecByInterval(portSlidePanel, 1500); 


$navLeft.click(function() {


newFunc('right');

/* setTimeout(function() { portSlidePanel('right') }, 1000); */



/* slide('photobar', 500, 'right'); */

});
 
$navRight.click(function() {

newFunc('left');
/* slide('photobar', 500, 'left'); */

/* setTimeout(function() { portSlidePanel('left') }, 1000); */
/* slide('photobar', 500, 'left'); */
});
//видимый блок по умолчанию
  document.getElementById('showblock').getElementsByTagName('div')[0].style.display = 'block'; 

showPortBlock.prev = 0;
	
})



function showPortBlock(id) {
/* var showblock = document.getElementById('showblock');
var showItems = cangeNodes (showblock); */
if(id != showPortBlock.prev) {
$('#showblock').children('div').eq(showPortBlock.prev).fadeOut(1000);
$('#showblock').children('div').eq(id).fadeIn(1000);
showPortBlock.prev = id;
}
/* $('#showblock div').eq(3).fadeIn(1000); */
/*  alert(id); */
/* $('#main-slider-block div').click(function() {
	$(this).eq(showPortBlock.prev).fadeOut(500);
	})  */
}