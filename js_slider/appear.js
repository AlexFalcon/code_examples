anima.iter = 0;
function anima(tagId,alfa,step,direct,recurse){
 div = document.getElementById(tagId);
//Для соответствия страницы с верхним элементом в списке тут надо будет менять элементы в div;
 //Выбираем все рисунки слайдшоу
	function changePict(div) {
	 var items = new Array();
	 for(c=i=0;i<div.childNodes.length;i++){
	  if (div.childNodes[i].tagName=="IMG"){
	   items[c] = div.childNodes[i];
	   c++;
	  }
	 }
	 return items;
	}
	
var items = changePict(div);
 
 var last = items[items.length-1];
 var next = items[items.length-2];
 var first = items[0];
 
if(direct == 'left') { 

 last.style.opacity= alfa/100;
 last.style.filter= "progid:DXImageTransform.Microsoft.Alpha(opacity="+alfa+")";
 last.style.filter= "alpha(opacity="+alfa+")";

 if ((alfa-step)>0){
 
   setTimeout("anima('"+tagId+"',"+(alfa-step)+","+step+",'"+direct+"');",50);

 }else{

  next.style.opacity= 1;
  next.style.filter= "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
  next.style.filter= "alpha(opacity=100)";

  var tmp = last;
  div.removeChild(last);
  div.insertBefore(tmp,items[0]);
  tmp.style.opacity= 1;
  tmp.style.filter= "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
  tmp.style.filter= "alpha(opacity=100)";

/*   setTimeout( "slide('"+tagId+"',1000)", 4000 ); */
 
 }
 }else{
	
	if (recurse == false) {
	var alfa = 0;
	first.style.opacity = 0;
	first.style.filter= "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
	first.style.filter= "alpha(opacity=0)";
	/* var current = first;
	div.removeChild(first); */
	div.appendChild(first);
	
	//Выбираем все рисунки слайдшоу
	var items = changePict(div);
	
	}

	if (alfa < 100) {
	anima.iter++;
	var last = items[items.length-1];
	var alfa = alfa + step;
	
	last.style.opacity= alfa/100;
	
	last.style.filter= "progid:DXImageTransform.Microsoft.Alpha(opacity="+alfa+")";
	last.style.filter= "alpha(opacity="+alfa+")";
	//alert(anima.iter);
	/* setTimeout("anima('"+tagId+"',"+alfa+","+step+",'"+direct+"', "+true+");",0); */
	anima(tagId,alfa,step,direct,true);
	}
	
 }
 
 
}

//эта функция делает видимым блок с рисунками для слайдшоу (изначально он невидим, чтобы избежать мерцания во время загрузки картинок) и запускает анимацию


function slide(tagId,speed, direct){
 div = document.getElementById('photobar');
 if (div.style.visibility!="visible"){
      div.style.visibility = "visible";
 }
 items = div.getElementsByTagName('img');
 if (items.length>0){
  anima(tagId,100,5, direct, false);
 }
}


/* setTimeout( "slide('photobar', 1000);",5000 ); */