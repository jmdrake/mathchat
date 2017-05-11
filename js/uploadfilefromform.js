function uploadFileFromForm(form, suffix){
    input = form.find(".upload");
    var file = "";
    if (input.prop('files').length > 0) {
        var fileext = input.prop('files')[0]["type"].split("/")[1];
        var filename = input.attr("id") + suffix + "." + fileext;
        file = filename;
        uploadFile(input, filename, function(res){console.log("Uploading results " + res)});
    }         
    return file;
}
