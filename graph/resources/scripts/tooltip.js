var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 400;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tts,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tts == null){
				tts = document.createElement('div');
				tts.setAttribute('id',id);
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				tts.appendChild(c);
				document.body.appendChild(tts);
				tts.style.opacity = 0;
				tts.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tts.style.display = 'block';
			c.innerHTML = v;
			tts.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tts.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tts.offsetWidth > maxw){tts.style.width = maxw + 'px'}
			h = parseInt(tts.offsetHeight) + top;
			clearInterval(tts.timer);
			tts.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
        pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tts.style.top = /*(u - h) + 'px'*/ (u+12) + 'px';
			tts.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tts.style.opacity = alpha * .01;
				tts.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tts.timer);
				if(d == -1){tts.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tts.timer);
			tts.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();
