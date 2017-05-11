function readURL(input, previewimg) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(previewimg).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadAnonymousFile(input, fileext, callback){
    var file_data = $(input).prop('files')[0];
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    form_data.append('ext', fileext);
    form_data.append('type', input.id);
    $.ajax({
        url: './php/uploadAnonymousFile.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            callback(php_script_response); // display response from the PHP script, if any
        }        
    })
}

function uploadFile(input, filename, callback) {
    var file_data = $(input).prop('files')[0];
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    form_data.append('name', filename);
    $.ajax({
        url: './php/upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            callback(php_script_response); // display response from the PHP script, if any
        }
     });    
}

function uploadImageFile(input, filename, callback){
    if (input.prop('files').length > 0) { 
        var fileext = input.prop('files')[0]["type"].split("/")[1];
        if("PNGJPGJPEGGIF".indexOf(fileext.toUpperCase()) >= 0) {
            uploadFile(input, filename + "." + fileext, function (res) {
                if (res.indexOf("Successful:")==0) {
                    callback(filename + "." + fileext)
                } else {
                    callback(res);
                }
            })
        } else {
            callback("Error: Only png, jpg, jpeg and gif files allowed.")
        }
    } else {
        callback("Error: No file selected");
    }
}

function uploadValidFile(input, filename, extension, callback) {
    if (input.prop('files').length > 0) { 
        var fileext = input.prop('files')[0]["type"].split("/")[1];
        if(extension.indexOf(fileext.toUpperCase()) >= 0) {
            uploadFile(input, filename + "." + fileext, function (res) {
                if (res.indexOf("Successful:")==0) {
                    callback(filename + "." + fileext)
                } else {
                    callback(res);
                }
            })
        } else {
            callback("Error: Wrong extension.")
        }
    } else {
        callback("Error: No file selected");
    }    
}

function getFileType(s) {
    if(s.indexOf("image")>=0) return "image";
    if(s.indexOf("audio")>=0) return "audio";
    if(s.indexOf("video")>=0) return "video";
}

var fileextentions = {"image":"|PNG|JPG|JPEG|GIF|","audio":"|MP3|OGG|WAV|","video":"|MP4|MPEG|OGG|"};
function uploadAttachment(input, callback) {
    var files = $(input).prop('files');
    if(files.length > 0){
        var fileext = files[0]["type"].split("/")[1];
        filetype = getFileType(input.id);
        if(fileextentions[filetype].indexOf("|" + fileext.toUpperCase() + "|") >= 0) {
            uploadAnonymousFile(input, fileext, function(results){
                callback(results)
            })
        } else {
            callback("Error: unsupported file type")
        }
    } else {
        callback("Error: no file attached")
    }
}

