function viewsEditlabelInit() {
    $(".editlabel input").on("keyup", function(event) {
        if(event.which == 13) $(this).blur();
    });    
    
    $('.editlabel label').on("click", function(event) {
    	var label = $(this).parent().find("label");
    	var input = $(this).parent().find("input");
    	input.show();
    	label.hide();
    	input.focus();
    	return false;
    });    

    $('.editlabel input').on("blur", function(event) {
    	var label = $(this).parent().find("label");
    	var input = $(this).parent().find("input");
    	label.html($(input).val());
    	label.show();
    	input.hide();
    	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);   
    });
}