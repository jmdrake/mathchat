/**
* User: jmdrake
* Filename : form2json.js
* Inputs: form
* Outputs: JSON object from form input tags
*/

function strescape(s) {
    if(s)
        return s.replace(/'/g, "%27").replace(/"/g, "%22")
}

function form2json(form){
   // console.log($(formname));
    var inputfields = form.find(".w3-input");
    var radiofields = form.find(".w3-radio");
    var json = {};
    for (i = 0; i < inputfields.length; i++) {
        json[inputfields[i].name] = strescape(inputfields[i].value);
    }
        

    for (i = 0; i < radiofields.length; i++)
        if (radiofields[i].checked) {
            json[radiofields[i].name] = radiofields[i].value;
        }            

    for (i = 0; i < json.length; i++ )
    for(key in json) {
        if(json[key]==null) 
            json[key] ="";
        if (Array.isArray(json[key]))
            json[key] = JSON.stringify(json[key]);
    }
    return json;
}

function inputs2json(form){
   // console.log($(formname));
    var inputfields = form.find("input");
    // var radiofields = form.find(".w3-radio");
    var json = {};
    for (i = 0; i < inputfields.length; i++) {
        switch(inputfields[i].type) {
            case "radio":
                if (inputfields[i].checked)
                    json[inputfields[i].name] = inputfields[i].value;
                break;
            case "checkbox":
                var name = inputfields[i].name;
                if (json[name] == undefined)
                    json[name] = [];
                if (inputfields[i].checked)
                    json[name][json[name].length] = inputfields[i].value;                
                break;
            default:
                json[inputfields[i].name] = strescape(inputfields[i].value);
        }
    }
        
    var selectfields = form.find("select");
    for (i = 0; i < selectfields.length; i++)
        json[selectfields[i].name] = form.find("#" + selectfields[i].name).val(); 

    var textareafields = form.find("textarea");
    for (i = 0; i < textareafields.length; i++)
        json[textareafields[i].name] = strescape(textareafields[i].value);
    
    for(key in json) {
        if(json[key]==null) 
            json[key] ="";
    }
    return json;
}


