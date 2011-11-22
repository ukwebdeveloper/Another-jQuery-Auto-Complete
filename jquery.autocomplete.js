/**
 * jQuery Auto Complete - built with jQuery 1.7.0
 * Author : Richard Sussex 
 * Twitter : ukwebdeveloper
 * GitHub : ukwebdeveloper)
 */

(function( $ ){
		
  $.fn.autoComplete = function( options ) {

	// the fields name
	var fieldName = $(this).attr('name');

	// add a class to this field 
	$(this).addClass('autoComplete-active');
	  
	// remove this the name of this field and create a hidden field with the same name
	$(this).attr('name', null);

	var hiddenField = '<input type="hidden" class="autoComplete-hiddenField" name="'+fieldName+'" />';
	 
	// Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'url'           : null,
      'minchars'	  : 4
    }, options);

	// wrap the field
	$(this).wrap('<div class="autoComplete-holder">');

	// this parent wrapper
	var parentWrapper = $(this).parent('.autoComplete-holder');

	// add the hidden field
	$(parentWrapper).prepend(hiddenField);

	// position
	var position = this.position();
	
	// var top
	var top = position.top;
	top = (top + $(this).outerHeight());
	
	// var left
	var left = position.left;

	// on key up
    $(this).keyup(function() {
    	
		// remove existing
		$('.list-holder', parentWrapper).remove();
	    
		// current value
		var currentValue = $(this).val();

		// store a reference to this
		var thisElement = this;
		
	    // if the length is greater than or equal to 4
		if(currentValue.length >= settings.minchars) {

			// get the data
			$.ajax({
				url : settings.url,
				dataType : 'json',
				data : 'searchTerm='+currentValue,
				success : function(data) {
					// var html
					var html = '';
					
					// data
					for(var i in data) {
						var html = html + '<li id="'+data[i].id+'">'+data[i].label+'</li>';
					}
					
					// append the list holder
		    		$(thisElement).after('<div class="list-holder" style="position:absolute;left:'+left+'px;top:'+top+'px;width:'+($(thisElement).outerWidth()-2)+'px;"><ul>'+html+'</ul></div>');

					// add a click function to the list-holder
					$('ul li', parentWrapper).click(function() {
						
						// put the id in the hidden field
						$('.autoComplete-hiddenField', parentWrapper).val($(this).attr('id'));
						
						// put the value in the search field
						$(thisElement).val($(this).text());

						// remove existing
						$('.list-holder', parentWrapper).slideUp(400,function() {
							$('.list-holder', parentWrapper).remove(); 
						});
						
					});
				} 
			});
		}
    });
  };
})( jQuery );