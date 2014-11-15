// only one editor for the whole app
var NoteEditor = function() {
    var neid = "canvas_main_note_editor";
    var elem, back, editView, headView, data, subm;
    var helpMessage =
        "Shortcuts: <br/>" +
        "[Tab] => focus on editor view<br/>" +
        "[Esc] => close editor<br/>" +
        "[Ctrl+Enter] => submit";
    
    return {
        show: function(text, heading, callData, onSubmit) {
            if (!elem) {
                elem = createElement("div", neid, "NoteEditor_main", null, document.body);
                var table = createElement("table", neid+"&content", "NoteEditor_content", null, elem);
                var tr = createElement("tr", null, "", null, table);
                var td = createElement("td", null, "NoteEditor_content_heading", null, tr);
                
                // add table for controls
                var cotable = createElement("table", null, "", null, td);
                var cotr = createElement("tr", null, "", null, cotable);
                var coatd = createElement("td", null, "", null, cotr);
                headView = createElement("span", null, "", null, coatd);
                var cobtd = createElement("td", null, "NoteEditor_content_heading_controls", null, cotr);
                
                var ok = newButton(Source.IMG_EDITOR_OK, "Ok", "Ok",
                    function() {
                       NoteEditor.hide(true);
                    }
                );
                var cancel = newButton(Source.IMG_EDITOR_CANCEL, "Cancel", "Cancel",
                    function() {
                        NoteEditor.hide(false);
                    }
                );
                var controls = createElement("div", neid+"&controls", "", null, cobtd);
                controls.appendChild(ok);
                controls.appendChild(cancel);
                
                // add content
                var ctr = createElement("tr", null, "", null, table);
                var ctd = createElement("td", null, "NoteEditor_content_content", null, ctr);
                var hdiv = createElement("div", null, "NoteEditor_content_help", helpMessage, ctd);
                editView = createElement("textarea", neid+"&editview", "NoteEditor_content_textfield", null, ctd);
            }
            
            editView.value = text;
            headView.innerHTML = heading;
            data = callData;
            if (onSubmit) {subm = onSubmit};
            
            if (!back) {
                back = createElement("div", neid+"&background", "NoteEditor_background", null, document.body);
            }
            
            elem.style.display = "block";
            back.style.display = "block";
            addEvent(document.body, "keypress", NoteEditor.globalOkEventListener);
            addEvent(document.body, "keydown", NoteEditor.globalCancelEventListener);
            
            return false;
        },
        hide: function(isOk) {
            if (elem)
                elem.style.display = "none";
            if (editView)
                editView.removeAttribute("autofocus");
            if (back)
                back.style.display = "none";
            if (isOk)
                NoteEditor.submit();
            
            removeEvent(document.body, "keypress", NoteEditor.globalOkEventListener);
            removeEvent(document.body, "keydown", NoteEditor.globalCancelEventListener);
            
            return false;
        },
        submit: function() {
            if (subm)
                subm.call(this, data, editView.value);
        },
        // global ok event (press Ctrl+Enter)
        globalOkEventListener: function(e) {
            e = e || window.event;
            if (e.ctrlKey && e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                NoteEditor.hide(true);
                return;
            }
        },
        // global cancel event (press Esc)
        globalCancelEventListener: function(e) {
            e = e || window.event;
            if (e.keyCode == 27) {
                e.preventDefault();
                e.stopPropagation();
                NoteEditor.hide(false);
            }
        }
    }
}();