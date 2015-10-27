
	stardust = {
		createStar: function(container, image, settings) { // Star erstellen
			var top = -Math.floor(Math.random()*Math.floor(0.2*container.height()));
			var left = Math.floor(Math.random()*container.width());
			var elem = $('<div><img src="'+image+'" /></div>');
			elem.css("position","absolute");
			elem.css("top",top+"px");
			elem.css("left",left+"px");
			container.append(elem);
			stardust.animateStar(container,elem,settings,true);
			return elem;
		},
		animateStar: function(container, elem, settings, toLeft) { // Bewegen
			var offset = elem.position();
			if(offset.top >= container.height()) {
				elem.remove();
				var index = Math.floor(Math.random()*settings.images.length);
				stardust.createStar(container,settings.images[index],settings);
				return null;
			}
			var duration = settings.minDuration + Math.floor(Math.random()*settings.minDuration);
			var left = Math.floor(Math.random()*0.15*container.width()) – Math.floor(Math.random()*0.15*container.width());
			var opacity = (Math.floor(Math.random()*10)+1)/10;
			elem.animate({
				top: '+='+Math.floor(Math.random()*10+20)+'%',
				left: '+='+(toLeft ? '2' : '-2')+'%',
				opacity: opacity,
				'-moz-transform': 'rotate(-45deg)'
			}, duration, function() {
				stardust.animateStar(container, elem, settings, !toLeft);
			});
			return elem;
		}
	}
	$.fn.stardust = function(settings) { 
		settings = $.extend({
			images: [ // Die Bilder!
			'http://shizoo-design.de/tutonic/wp-content/uploads/2012/09/star1.png',
			'http://shizoo-design.de/tutonic/wp-content/uploads/2012/09/star2.png',
			'http://shizoo-design.de/tutonic/wp-content/uploads/2012/09/star1.png',
			'http://shizoo-design.de/tutonic/wp-content/uploads/2012/09/star1.png'
			],
			minStars: 20,
			maxStars: 30,
			minDuration: 700 // Millisekunden für Animationsschritt
		}, settings);
		$(this).css("position","relative");
		$(this).css("overflow","hidden");
		var starsCount = Math.floor(Math.random()*(settings.maxStars – settings.minStars)) + settings.minStars;
		for(var i = 0;i<Math.ceil(starsCount/3);i++) {
			var index = Math.floor(Math.random()*settings.images.length);
			stardust.createStar(this,settings.images[index],settings);
		}
		var container = this;
		window.setTimeout(function(){
			for(var i = 0;i<Math.ceil(starsCount/3);i++) {
				var index = Math.floor(Math.random()*settings.images.length);
				stardust.createStar(container,settings.images[index],settings);
			}
			window.setTimeout(function(){
				for(var i = 0;i<Math.ceil(starsCount/3);i++) {
					var index = Math.floor(Math.random()*settings.images.length);
					stardust.createStar(container,settings.images[index],settings);
				}
			},settings.minDuration*1.8);
		},settings.minDuration*1.8);
	}
