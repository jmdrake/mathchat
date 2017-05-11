function clearForm(form) {
    var fields = form.find(".w3-input");
    var numfields = fields.length;
    for (var i = 0; i < numfields; i++)
        fields[i].value = "";
    form.find(".upload").files = [];
    var img = form.find("#preview-img");
    img.attr('src', '');
    img.hide();
}

function populateDiv(div, record, href) {
    for(var key in record) {
        if (key.startsWith("classLabel"))
            $("." + key).html(unescape(record[key]));                   
        if(key.startsWith("lbl"))
            div.find("#" + key).html(unescape(record[key]));
        if (key.startsWith("img"))
            if (record[key] != "") {
                div.find("#" + key).attr("src", "./uploads/" + record[key]);
                div.find("#" + key).show();
            } else
                div.find("#" + key).hide();
        if(key.startsWith("lnk"))
            div.find("#" + key).attr("href", href + record[key]);
        if (key.startsWith("val"))
            div.find("#" + key).val(unescape(record[key]));
    }
}

function cloneDiv(template, record, href){
    var newDiv = template.clone();
    // populateDiv(newDiv, record, href);
    json2form(newDiv, record, href);
    return newDiv
}


function increment(e){
    e.html(e.html++);
}

function populateList(div, data, template, callback, href){    
    var newDiv;
    for(var i = 0; i < data.length; i++){        
        newDiv = cloneDiv(template, data[i], href);        
        div.append(newDiv);
        newDiv.show();
        if(callback != undefined){
            callback(newDiv, data[i])}}
}
