//disabling ajax default caching
$.ajaxSetup ({  
    cache: false  
});
function getSelectionText(){
	var text = '';
	if(window.getSelection){//for all browsers except IE
		text = window.getSelection().toString();
	}
	else if(//for IE
		document.selection && document.selection.type != 'Control'){
		text = document.selection.createRange().text;
	}
	return text;
}

jQuery(document).ready(function(){
	function loadHighlightedContent()
	{
		$.ajax({
			url : 'dbtohtml.php',
			type : 'post',
			dataType: 'JSON',
			success : function(e) {
				console.log(e);
				// Get the size of an object
				Object.size = function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
				};
				var size = Object.size(e);
				
				var a = jQuery('body').html();
				for(var i=1;i<=size;i++)
				{
					a = a.replace(e[i],'<span style="background:yellow;">'+e[i]+'</span>');
				}
				jQuery('body').html(a);
				console.log('done');
			}, 
			error :function() {
			console.log('error in retrieving');
			} 
		});
	}
	loadHighlightedContent();
	$('body').mouseup(function(e){
		var selectedText = getSelectionText();
		var processURL = "./htmltodb.php";
		console.log(selectedText);
		if(selectedText != ""){
			$.ajax({
				type: "POST",
				url: processURL,
				data: "username=sahil&text="+selectedText,
				success: function(){
					loadHighlightedContent();
				}
			});//end of ajax call
			loadHighlightedContent();
			console.log(selectedText);
		}
	});//end of mouse event
});//end of document ready event
