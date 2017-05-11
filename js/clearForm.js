/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 09:13 PM
* To change this template use Tools | Templates.
*/

function clearForm(form){
   // console.log($(formname));
    fields = form.find(".w3-input");    
    var numfields = fields.length;    
    for(var i=0; i<numfields; i++) {
        fields[i].value = "";
    }
}