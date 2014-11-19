var ModalView = function() {
    return {
        showModalView: function(parent, isLeft, isUp, content) {
            var div = Util.createElement("div", null, "modal-view", null, document.body);
            var w = div.offsetWidth;
            var h = div.offsetHeight;

            var top, left;
            if (isLeft) {
                left = parent.getBoundingClientRect().right-w + "px";
            } else {
                left = (parent.getBoundingClientRect().left) + "px";
            }

            if (isUp) {
                top = parent.getBoundingClientRect().top-h + "px";
            } else {
                top = (parent.getBoundingClientRect().bottom) + "px";
            }

            div.style.top = top;
            div.style.left = left;
            div.back = Util.createElement("div", null, "modal-view-hidden-background", null, document.body);

            // build content
            if (content) {
                var tb = Util.createElement("table", null, "gTable", null, div);
                for (var i=0; i<content.data.length; i++) {
                    var tr = Util.createElement("tr", null, "", null, tb);
                    var td = Util.createElement("td", null, "modal-view-content-row"+((i==content.data.length-1)?" last-row ":""), null, tr);
                    var a = Util.createElement("a", null, "modal-view-content-row-link", null, td);
                    for (var j=0; j<content.data[i].data.length; j++) {
                        var el = ContentManager.createContentObject(content.data[i].data[j], a);
                        // always add handler to remove modal view, if it is button
                        if (content.data[i].data[j].type == "button") {
                            Util.addEventListener(el, "click", function() {
                                ModalView.removeModalView(parent);
                                parent.isModalViewShown = false;
                                parent.modalView = null;
                            });
                        }
                    }
                }
            }

            return div;
        },
        removeModalView: function(parent) {
            Util.removeClass(parent, "selected");
            var d = parent.modalView;
            if (d)
                document.body.removeChild(d);
            if (d.back)
                document.body.removeChild(d.back);
        }
    }
}();
