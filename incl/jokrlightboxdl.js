(function($)
		  	  {
		  	  	  $.fn.jokrLightbox = function(options)
		  	  	  {
		  	  	  	  console.log(options.background);
		  	  	  	  options = $.extend({}, $.fn.jokrLightbox.defaults, options);
		  	  	  	  
		  	  	  	  
		  	  	  	  
		  	  	  	  var height, width;
					  height= window.innerHeight || $(window).height();
					  width = window.innerWidth  || $(window).width();
		  	  	  	  return this.each(function()
		  	  	  	  	  {
							  
							  $("<div id='lightbox'></div>")
							  .appendTo("body")
							  .click(function()
								  {
									  $(this).remove();
									  $(".lightbox-panel").remove();
								  })
							  .css(
								  {  
									  'display':'none',
									  'background':'#000000',
									  'opacity':'0.9',
									  'filter':'alpha(opacity=90)',
									  'position':'fixed',
									  'top':'0px',
									  'left':'0px',
									  'min-width':'100%',
									  'min-height':'100%',
									  'z-index':'1000'
								  });
							  
							  
							  $("<div class='lightbox-panel'></div>")
							  .appendTo("body")
							  .css(
								  {
								  	  	 
										 'display':'none',
										 'position':'fixed',
										 'top':'100px',
										 'margin':'0 auto',
										 'float':'none',
										 'background': options.background,
										 'padding':'10px 15px 10px 15px',
										 'border':'2px solid #CCCCCC',
										 'z-index':'1001',
										 'left':( (width/2) - ($(this).width() ) )+'px',
								  });
							  $('<img>')
								.attr('src', options.src)
								.appendTo(".lightbox-panel")
								.css(
									{
										'display':'block',
										'margin':'0 auto',
										'padding':'0',
										'float':'none',
										'max-height':'700px',
										'max-width':'700px'
									 });
								
								
							  $("#lightbox, .lightbox-panel").fadeIn(300);
							  $(this).scrollTop();
							  console.log("jokrlightbox!");
						  });
				  };
		 
		  	  	  $.fn.jokrLightbox.defaults =
		  	  	  {
					'background' : '#EEE',
				  }
		 
		  	  }) (jQuery);
		  
		  $('.jokrlightbox').click(function()
		  	  {
		  	  	  var src = $(this).attr('src');
		  	  	  $(this).jokrLightbox({'src': src});
		  	  });
