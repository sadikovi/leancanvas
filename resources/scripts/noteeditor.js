// only one editor for the whole app
var NoteEditor = function() {
    var neid = "note_editor";
    var elem, back, editView, tags, headView, data, subm;
    var helpMessage =
        "Shortcuts: <br/>" +
        "[Tab] - focus on editor view<br/>" +
        "[Esc] - close editor<br/>" +
        "[Ctrl+Enter] - submit";

    return {
        show: function(text, tag, heading, callData, onSubmit) {
            if (!elem) {
                elem = Util.createElement("div", neid, "noteeditor", null, document.body);
                var table = Util.createElement("table", neid+"&content", "noteeditor_heading", null, elem);
                var tr = Util.createElement("tr", null, "", null, table);
                var tdh = Util.createElement("td", null, "hAlignLeft", null, tr);
                var tdc = Util.createElement("td", null, "hAlignRight", null, tr);

                headView = Util.createElement("span", null, "hMargined_normal", null, tdh);

                var ok = Util.createButton(null, false, "green hMargined_small", "Ok", tdc,
                    function() {
                       NoteEditor.hide(true);
                   },
                   null
                );
                var cancel = Util.createButton(null, false, "gray hMargined_small", "Cancel", tdc,
                    function() {
                        NoteEditor.hide(false);
                    }
                );

                var cn = Util.createElement("div", null, "noteeditor_content centered hAlignCenter", null, elem);
                tags = TagManager.showTagPanel(cn, tag);
                Util.createElement("div", null, "noteeditor_content alert tip-blue hMargined_normal vMargined_normal hAlignLeft", helpMessage, cn);
                editView = Util.createTextarea(null, "gTextarea noteeditor_content text hMargined_normal", "Type something...", cn);
            }

            TagManager.selectTag(tags, tag);
            editView.value = text;
            headView.innerHTML = heading;
            data = callData;
            if (onSubmit) {subm = onSubmit};

            if (!back) {
                back = Util.createElement("div", neid+"&background", "noteeditor_background", null, document.body);
            }

            elem.style.display = "block";
            back.style.display = "block";
            Util.addEventListener(document.body, "keydown", NoteEditor.globalOkEventListener);
            Util.addEventListener(document.body, "keydown", NoteEditor.globalCancelEventListener);

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

            Util.removeEventListener(document.body, "keydown", NoteEditor.globalOkEventListener);
            Util.removeEventListener(document.body, "keydown", NoteEditor.globalCancelEventListener);

            return false;
        },
        submit: function() {
            if (subm)
                subm.call(this, data, editView.value, TagManager.getSelectedTag(tags));
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
