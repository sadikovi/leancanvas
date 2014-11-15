var Loader = function() {
    var xmlhttp = null;
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    this.xmlhttp = xmlhttp;
    
    this.send = function(method, isAsync, url, contentType, params, success, error) {
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && (xmlhttp.status>=200 && xmlhttp.status<300)) {
                if (success)
                    success.call(this, xmlhttp.responseText);
            } else if (xmlhttp.readyState == 4) {
                if (error)
                    error.call(this, xmlhttp.responseText);
            }
        }
        
        xmlhttp.open(method, url, isAsync);
        xmlhttp.setRequestHeader("Content-type", contentType);
        xmlhttp.send(params);
    }
};