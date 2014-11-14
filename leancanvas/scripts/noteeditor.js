// only one editor for the whole app
var NoteEditor = function() {
    var neid = "canvas_main_note_editor";
    var elem, back, editView, headTd, data;
    
    return {
        show: function(text, heading, callData, onSubmit) {
            if (!elem) {
                elem = createElement("div", neid, "NoteEditor_main", null, document.body);
                var table = createElement("table", neid+"&content", "NoteEditor_content", null, elem);
                var tr = createElement("tr", null, "", null, table);
                headTd = createElement("td", null, "NodeEditor_content_heading", null, tr);
                
                // add content
                var ctr = createElement("tr", null, "", null, table);
                var ctd = createElement("td", null, "NodeEditor_content_content", null, ctr);
                editView = createElement("textarea", neid+"&editview", "NodeEditor_content_textfield", null);
                ctd.appendChild(editView);
                
                // add bottom bar with controls
                var btr = createElement("tr", null, "", null, table);
                var btd = createElement("td", null, "NodeEditor_content_bottombar", null, btr);
                var ok = newButton("resources/images/editor_confirm.png", "Ok", "Ok",
                    function() {
                       NoteEditor.hide(onSubmit);
                    }
                );
                var cancel = newButton("resources/images/editor_close.png", "Cancel", "Cancel",
                    function() {
                        NoteEditor.hide();
                    }
                );
                var controls = createElement("div", neid+"&controls", "", null, btd);
                controls.appendChild(ok);
                controls.appendChild(cancel);
            }
            
            editView.value = text;
            headTd.innerHTML = heading;
            data = callData;
            
            if (!back) {
                back = createElement("div", neid+"&background", "NoteEditor_background", null, document.body);
            }
            
            elem.style.display = "block";
            back.style.display = "block";
            
            return false;
        },
        hide: function(onSubmit) {
            if (elem)
                elem.style.display = "none";
            if (editView)
                editView.removeAttribute("autofocus");
            if (back)
                back.style.display = "none";
            if (onSubmit)
                onSubmit.call(this, data, editView.value);
            
            return false;
        }
    }
}();