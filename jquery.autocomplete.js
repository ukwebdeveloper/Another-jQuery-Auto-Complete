/**
 * jQuery Auto Complete - built with jQuery 1.7.0
 * Author : Richard Sussex 
 * Twitter : ukwebdeveloper
 * GitHub : ukwebdeveloper)
 */

(function( $ ){
	
  $.fn.autoComplete = function( options ) {

	// the element name
	var fieldName = $(this).attr('name');

	// add a class to this element 
	$(this).addClass('autoComplete-active');
	  
	// remove the name of this field
	$(this).attr('name', null);

	// create a hidden field with the same name
	var hiddenField = '<input type="hidden" class="autoComplete-hiddenField" name="'+fieldName+'" />';
	 
	// create defaults, extend them with any options that were provided
    var settings = $.extend( {
      'url'           : null,
      'minchars'	  : 4
    }, options);

	// wrap this element
	$(this).wrap('<div class="autoComplete-holder">');

	// reference the parent wrapper
	var parentWrapper = $(this).parent('.autoComplete-holder');

	// add the hidden field
	$(parentWrapper).prepend(hiddenField);

	// on key up
    $(this).keyup(function(event) {
    	
    	// keys not triggered
    	var ignoredKeys = [8, 13, 16, 17, 18, 19, 20, 27, 32, 33, 34, 35, 37, 38, 39, 40, 36, 45, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
    
    	// if event key code not in ignoredKeys are
    	if($.inArray(event.keyCode, ignoredKeys) == -1) {
    	
			// remove existing .list-holder
			$('.list-holder', parentWrapper).remove();
		    
			// the value of this element
			var currentValue = $(this).val();
	
			// store a reference to this for use inside $.ajax
			var e = this;
			
		    // if the length is greater than or equal to settings.minchars
			if(currentValue.length >= settings.minchars) {

				// get the data with $.ajax
				$.ajax({
					url : settings.url, // url
					dataType : 'json',  // json dataType
					data : 'searchTerm='+currentValue, // send the serach term
					success : function(data) {
						
						// remove the list holder
						$('.list-holder', parentWrapper).remove(); 
						
						// html var
						var html = '';
						
						// loop through the data and create li fields
						for(var i in data) {
							var html = html + '<li id="'+data[i].id+'">'+data[i].label+'</li>';
						}
						
						// check the position of e and append accordingly
						if($(e).css('position') == 'absolute') {

							// position of this element
							var position = $(e).position();
							
							// top of this element
							var top = position.top;
							
							// add the outer height of this element to the top value 
							top = (top + $(e).outerHeight());
							
							// left of this element
							var left = position.left;
							
							// append the list-holder
							$(parentWrapper).append('<div class="list-holder" style="position:absolute;left:'+left+'px;top:'+top+'px;width:'+($(e).outerWidth()-2)+'px;"><ul>'+html+'</ul></div>');
						
						} else {
							// append the list-holder
							$(parentWrapper).append('<div class="list-holder" style="position:absolute;width:'+($(e).outerWidth()-2)+'px;"><ul>'+html+'</ul></div>');
						}
						
						// add a click function to the list-holder li's (the search terms)
						$('ul li', parentWrapper).click(function() {
							
							// put the id of the selection in the hidden field
							$('.autoComplete-hiddenField', parentWrapper).val($(this).attr('id'));
							
							// put the value of the selection in the search field
							$(e).val($(this).text());
	
							// slideUp the list-holder
							$('.list-holder', parentWrapper).slideUp(400,function() {
								// remove on list-holder from the DOM
								$('.list-holder', parentWrapper).remove(); 
							});
							
						});
					} 
				});
			}
    	} 
    });
  };
})( jQuery );