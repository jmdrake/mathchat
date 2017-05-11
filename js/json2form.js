function json2form(div, record, href) {
    for(var key in record) {
        element = div.find("#" + key);
        var value = unescape(record[key]);        
        if(element.get(0) != undefined)
            switch(element.get(0).tagName){
                case "INPUT":
                    element.val(value);
                    break;
                case "TEXTAREA":
                    element.val(value);
                    break;
                case "DIV":
                    element.html(value);
                    break;
                case "SPAN":
                    element.html(value);
                    break;
                case "IMG":
                    if(value != "") {
                        element.attr("src", href + record[key]);
                        element.show();                        
                    }                        
                    break;
                case "AUDIO":
                    if (value != "") {
                        element.find("source").attr("src", href + record[key])
                        element.attr("style", "");                        
                    }                        
                    break;
                case "VIDEO":
                    if (value != "") {
                        element.find("source").attr("src", href + record[key])
                        element.attr("style", "");                        
                    }                  
                    break;                
            }
    }    
}