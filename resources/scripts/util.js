var Util = function() {
    return {
        /* check for old IE versions */
        isBadIE: function() {
            if (window.attachEvent && !window.addEventListener) {
                return true;
            } else {
                return false;
            }
        },

        /* check if object is array */
        isArray: function(obj) {
            if( Object.prototype.toString.call(obj) === '[object Array]' ) {
                return true;
            } else {
                return false;
            }
        },

        /* add event listener and remove event listener */
        addEventListener: function(elem, evnt, handler) {
            if (elem.addEventListener)
                elem.addEventListener(evnt, handler, false);
            else if (elem.attachEvent) {
                elem.attachEvent("on"+evnt, handler);
            } else {
                elem["on" + evnt] = null;
            }
        },
        removeEventListener: function(elem, evnt, handler) {
            if (elem.removeEventListener) {
                elem.removeEventListener(evnt, handler, false);
            } else if (elem.detachEvent) {
                elem.detachEvent("on" + evnt, handler);
            } else {
                elem["on" + evnt] = null;
            }
        },
        /* check if event occures on element or its children */
        isEventForElement: function(event, element) {
            if (!event || !element)
                return false;

            var c = element.children;
            if (event.target == element) {
                return true;
            } else if (event.target != element && (!c || c.length == 0)) {
                return false;
            } else {
                var bl = false;
                for (var i=0; i<c.length; i++)
                    bl = bl || Util.isEventForElement(event, c[i]);
                return bl;
            }
        },

        /* add class to element and remove class from element */
        addClass: function(elem, classname) {
            if (!elem) {return;}
            elem.className += " " + classname;
        },
        removeClass: function(elem, classname) {
            if (!elem) {return;}
            var newclassname = "";
            var a = elem.className.split(" ");
            for (var i=0; i<a.length; i++)
                if (a[i] != classname)
                    newclassname += " " + a[i];
            elem.className = newclassname.replace(/^\s+|\s+$/gm,'');
        },
        hasClass: function(elem, classname) {
            if (!elem) {return;}
            var a = elem.className.split(" ");
            for (var i=0; i<a.length; i++)
                if (a[i] == classname)
                    return true;
            return false;
        },
        /* PHP special chars decode function */
        htmlspecialchars_decode: function(string, quote_style) {
            var optTemp = 0, i = 0, noquotes = false;
            if (typeof quote_style === 'undefined')
                quote_style = 2;

            string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');

            var OPTS = {
                'ENT_NOQUOTES': 0,
                'ENT_HTML_QUOTE_SINGLE': 1,
                'ENT_HTML_QUOTE_DOUBLE': 2,
                'ENT_COMPAT': 2,
                'ENT_QUOTES': 3,
                'ENT_IGNORE': 4
            };

            if (quote_style === 0)
                noquotes = true;

            if (typeof quote_style !== 'number') {
                quote_style = [].concat(quote_style);
                for (i = 0; i < quote_style.length; i++) {
                    if (OPTS[quote_style[i]] === 0) {
                        noquotes = true;
                    } else if (OPTS[quote_style[i]]) {
                        optTemp = optTemp | OPTS[quote_style[i]];
                    }
                }
                quote_style = optTemp;
            }

            if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
                string = string.replace(/&#0*39;/g, "'");
            }

            if (!noquotes) {
                string = string.replace(/&quot;/g, '"');
            }

            string = string.replace(/&amp;/g, '&');

            return string;
        },
        /* PHP special chars escape function */
        htmlspecialchars: function(string, quote_style, charset, double_encode) {
            var optTemp = 0, i = 0, noquotes = false;
            if (typeof quote_style === 'undefined' || quote_style === null)
                quote_style = 2;

            string = string.toString();
            if (double_encode !== false)
                string = string.replace(/&/g, '&amp;');

            string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            var OPTS = {
                'ENT_NOQUOTES': 0,
                'ENT_HTML_QUOTE_SINGLE': 1,
                'ENT_HTML_QUOTE_DOUBLE': 2,
                'ENT_COMPAT': 2,
                'ENT_QUOTES': 3,
                'ENT_IGNORE': 4
            };

            if (quote_style === 0)
                noquotes = true;

            if (typeof quote_style !== 'number') {
                quote_style = [].concat(quote_style);
                for (i = 0; i < quote_style.length; i++) {
                    if (OPTS[quote_style[i]] === 0) {
                        noquotes = true;
                    } else if (OPTS[quote_style[i]]) {
                        optTemp = optTemp | OPTS[quote_style[i]];
                    }
                }
                quote_style = optTemp;
            }

            if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
                string = string.replace(/'/g, '&#039;');
            }

            if (!noquotes) {
                string = string.replace(/"/g, '&quot;');
            }

            return string;
        },

        /* replace all occuriences in string */
        replaceAll: function(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        },

        /* replace json special characters */
        replaceJSONSpecialChars: function(text) {
            var r = Util.replaceAll(text, "\r", "\\r");
            r = Util.replaceAll(r, "\n", "\\n");
            r = Util.replaceAll(r, "\"", "\\"+"\"");
            r = Util.replaceAll(r, "\'", "\\"+"\'");
            return r;
        },

        /* generate random id value */
        generateId: function(l) {
            var length = (l) ? l : 7;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i=0; i < length; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },

        /* return current date and time in format: dd/mm/yyyy hh:mi:ss */
        getCurrentDateTime: function() {
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
        },

        /* parse current url and return GET parameter by key */
        parseGet: function(val, url) {
            var link = (url) ? url : location.search;
            var result = null, tmp = [];
            var items = link.substr(1).split("&");
            for (var index = 0; index < items.length; index++) {
                tmp = items[index].split("=");
                if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
            }
            return result;
        },

        /********************************/
        /* build html objects functions */

        createElement: function(tagname, id, aClass, text, parent) {
            var element = document.createElement(tagname);

            if (aClass != null && aClass != "")
                element.className = aClass;
            if (id != null && id != "")
                element.id = id;
            if (text != null && text != "")
                element.innerHTML = text;

            if (parent)
                parent.appendChild(element);

            return element;
        },
        createImage: function(id, aClass, src, title, parent) {
            var img = Util.createElement("img", id, aClass, null, parent);

            img.src = src;
            //img.title = title;
            //img.alt = title;

            return img;
        },
        createButton: function(id, isMini, aClass, text, parent, handler, img) {
            var a = Util.createElement("a", id, ((isMini==false)?"button":"minibutton") + " " + aClass, null, parent);
            // adding text
            var s = Util.createElement("span", null, null, text, a);
            // adding image
            if (!isMini && img) {
                var is = Util.createElement("span", null, null, null, a);
                Util.createImage(null, "button_img hMargined_small", img, text, is);
            }

            // adding handler
            if (handler)
                Util.addEventListener(a, "click", handler);

            // add event listeners for "selected" state
            Util.addEventListener(a, "mousedown", function(e) {
                if (e.button == 0)
                    Util.addClass(a, "selected");
            });
            Util.addEventListener(a, "mouseup", function(e) {
                if (e.button == 0)
                    Util.removeClass(a, "selected");
            });
            Util.addEventListener(document.body, "mouseup", function(e) {
                if (e.button == 0 && Util.hasClass(a, "selected") && e.target != a)
                    Util.removeClass(a, "selected");
            });

            return a;
        },
        createModalButton: function(id, isMini, aClass, text, parent, content) {
            var a = Util.createElement("a", id, ((isMini==false)?"button":"minibutton")+" modal-view-parent "+aClass, null, parent);
            var s = Util.createElement("span", null, null, text, a);
            var is = Util.createElement("span", null, null, null, a);
            Util.createImage(null, "button_img hMargined_small", Source.IMG_MB_DOWN, "text", is);

            a.isModalViewShown = false;
            a.modalView = null;

            Util.addEventListener(a, "click", function(e) {
                if (!a.isModalViewShown)  {
                    a.modalView = ModalView.showModalView(a, true, false, content);
                    a.isModalViewShown = true;
                } else {
                    ModalView.removeModalView(a);
                    a.isModalViewShown = false;
                    a.modalView = null;
                }
                e.stopPropagation();
            });

            Util.addEventListener(a, "mousedown", function(e) {
                if (e.button == 0)
                    Util.addClass(a, "selected");
                e.stopPropagation();
            });

            Util.addEventListener(document.body, "mouseup", function(e) {
                if (e.button == 0 && Util.hasClass(a, "selected") && e.target != a && a.isModalView == false)
                    Util.removeClass(a, "selected");
                e.stopPropagation();
            });

            Util.addEventListener(document.body, "click", function(e) {
                if (a.isModalViewShown && !Util.isEventForElement(e, a) && !Util.isEventForElement(e, a.modalView)) {
                    ModalView.removeModalView(a);
                    a.isModalViewShown = false;
                    a.modalView = null;
                }
                e.stopPropagation();
            });

            return a;
        },
        createLink: function(id, aClass, text, url, target, parent) {
            var a = Util.createElement("a", id, aClass, text, parent);
            a.href = url;
            a.target = target;
            a.setAttribute("tabindex", "-1");
            return a;
        },
        createTextfield: function(id, aClass, placeholder, parent) {
            var t = Util.createElement("input", id, "gTextInput" + " " + ((aClass)?aClass:""), null, parent);
            t.type = "text";
            if (placeholder)
                t.placeholder = placeholder;
            return t;
        },
        createTextarea: function(id, aClass, placeholder, parent) {
            var t = Util.createElement("textarea", id, "gTextarea" + " " + ((aClass)?aClass:""), null, parent);
            if (placeholder)
                t.placeholder = placeholder;
            return t;
        }
    }
}();
