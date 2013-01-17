window.jokr = (function(window, document, undefined )
{
	var jokr = {};
	jokr.random = function (min, max)
	{
		return Math.floor(Math.random()*(max+1-min)+min);
	};
	
	return jokr;
  
})(window, window.document); 
