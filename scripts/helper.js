function isArray(obj) {
    if( Object.prototype.toString.call(notes) === '[object Array]' ) {
        return true;
    } else {
        return false;
    }
}

function addEvent(elem, evnt, handler) {
    if (elem.addEventListener)
        elem.addEventListener(evnt, handler, false);
    else if (elem.attachEvent) {
        elem.attachEvent("on"+evnt, handler);
    } else {
        elem["on" + evnt] = null;
    }
}

function removeEvent(elem, evnt, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(evnt, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent("on" + evnt, handler);
    } else {
        elem["on" + evnt] = null;
    }
}

// creates element for DOM
function createElement(tagname, id, aClass, text, parent) {
    var element = document.createElement(tagname);
    element.className = aClass;
    
    if (id != null && id != "")
        element.id = id;
    if (text != null && text != "")
        element.innerHTML = text;
    
    if (parent)
        parent.appendChild(element);
    return element;
}

// creates image
function newImage(src, title, alt) {
    var img = createElement("img", null, "", null);

    img.src = src;
    img.title = title;
    img.alt = alt;
    
    return img;
}

function newSpace() {
    var element = createElement("span", null, "space", null);
    element.style.cssText = "margin-left:5px; margin-right: 5px;"
    return element;
}

function newButton(src, title, alt, callback, text) {
    var img = newImage(src, title, alt);
    img.style.verticalAlign = "middle";
    var textNode = createElement("span", null, null, text, null);
    textNode.style.verticalAlign = "middle";
    
    var span = createElement("span", null, "simplebutton", null, null);
    span.style.cssText = "cursor: pointer";
    
    span.appendChild(newSpace());
    span.appendChild(img);
    span.appendChild(textNode);
    
    if (callback)
        addEvent(span, "click", callback);
    
    return span;
}

// escape special characters in html
var HtmlEscape = function() {};
HtmlEscape.escape = function(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function replaceJSONSpecialChars(text) {
    var r = replaceAll(text, "\r", "\\r");
    r = replaceAll(r, "\n", "\\n");
    r = replaceAll(r, "\"", "\\"+"\"");
    r = replaceAll(r, "\'", "\\"+"\'");
    return r;
}
                                                                           
// generate random sequence for id
function generateId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}

// returns current datetime as string
function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    if(month.toString().length == 1)
        var month = '0'+month;
    if(day.toString().length == 1)
        var day = '0'+day;
    if(hour.toString().length == 1)
        var hour = '0'+hour;
    if(minute.toString().length == 1)
        var minute = '0'+minute;
    if(second.toString().length == 1)
        var second = '0'+second;
    
    var dateTime = day+"/"+month+"/"+year+" "+hour+":"+minute+":"+second;
    return dateTime;
}

function parseGet(val) {
    var result = null, tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
}







