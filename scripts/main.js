// create data manager
var manager = new DataManager();

function buildCanvas() {
    var content = DEFAULT_CONTENT;
    manager.buildContentFromJSON(content, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler);
    updateDOM();
}

//----------------------------------------------
function updateDOM() {
    for (i=0; i<document.body.childNodes.length; i++) {
        if (document.body.childNodes[i] == manager.root) {
            document.body.removeChild(manager.root);
            break;
        }
    }
    
    manager.updateDOM();
    document.body.appendChild(manager.root);
}

//-------Save on Github-----------------
function saveHandler(trigger, obj) {
    addEvent(trigger, "click",
        function(e) {
            obj.li.startLoading("Saving...");
            manager.saveGistOnGithub(
                function(result) {
                    var result = JSON.parse(result);
                    obj.li.stopLoading();
                    saveShowLink.call(this, obj.li.parent, result);
                },
                function(result) {
                    var result = JSON.parse(result);
                    obj.li.stopLoading();
                    saveShowError.call(this, obj.li.parent, result);
                }
            );
        }
    );
}

function saveShowLink(parent, result) {
    var docUrl = "<a href=\"" + result.html_url + "\" target=\"blank\">" + result.html_url + "</a>";
    var span = createElement("span", null, "", "@"+getCurrentDateTime() + " #Saved file: " + docUrl + ". Dont forget to copy link somewhere!", parent);
}

function saveShowError(parent, result) {
    var docUrl = "<a href=\"" + result.documentation_url + "\" target=\"blank\">" + result.documentation_url + "</a>";
    var span = createElement("span", null, "", "@"+getCurrentDateTime()+" #Error: " + result.message + ", documentation: " + docUrl, parent);
}

//----------Load from Github--------------
function loadHandler(trigger, obj) {
    addEvent(trigger, "click",
        function(e) {
            var title = obj.li.parent;
            title.innerHTML = "";
            var span = createElement("span", "loadgistlink62345", "", "Submit Gist link: ", title);
            var textfield = createElement("input", null, "", null, span);
            textfield.style.width = "200px";
            textfield.focus();
            
            var ok = newButton(Source.IMG_OK_SMALL, "Ok", "Ok",
            function() {
                obj.li.startLoading("Loading gist file...");
                manager.loadGistFromGithub(textfield.value,
                    function(result){
                        var result = JSON.parse(result);
                        obj.li.stopLoading();
                        loadShowResult.call(this, obj.li.parent, result);
                    },
                    function(result) {
                        var result = JSON.parse(result);
                        obj.li.stopLoading();
                        loadShowError.call(this, obj.li.parent, result);
                    }
                );
            }, null);
            var cancel = newButton(Source.IMG_CANCEL_SMALL, "Cancel", "Cancel", function() {obj.li.parent.innerHTML=""});
            span.appendChild(ok);
            span.appendChild(cancel);
        }
    );
}

function loadShowResult(parent, result) {
    var files = result.files;
    var content = null;
    if (files && files[Object.keys(files)[0]].content)
        content = files[Object.keys(files)[0]].content;
    
    manager.buildContentFromJSON(content, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler);
    updateDOM();
}

function loadShowError(parent, result) {
    var docUrl = "<a href=\"" + result.documentation_url + "\" target=\"blank\">" + result.documentation_url + "</a>";
    var span = createElement("span", null, "", "@" + getCurrentDateTime() + " #Error: " + result.message + ", documentation: " + docUrl, parent);
}

//-----------Working with notes------------------

function openEditor(text, note, directory) {
    var isNew = (!note)?true:false;
    var heading = ((isNew)?"New" : "Edit") + " note for \"" + directory.name + "\"";
    NoteEditor.show(text, heading, {note:note, dir:directory, is:isNew, edit:noteEditHandler, remove:noteRemoveHandler},
        function(data, res) {
            if (data.is) {
                var newNote =  new Note(generateId()+"&note", res, data.dir, data.edit, data.remove);
                data.dir.addNote(newNote);
            } else {
                data.note.modify(res);
            }
            updateDOM();
        }
    );
}

function addNoteHandler(trigger, directory) {
    addEvent(trigger, "click", function(e) {
        openEditor("", null, directory);
    });
}

function noteRemoveHandler(trigger, deleteNode) {
    addEvent(trigger, "click", function(e) {
        var parent = deleteNode.parent;
        parent.removeNote(deleteNode.id);
        deleteNode = null;
        updateDOM();
    });
}

function noteEditHandler(trigger, editNode) {
    addEvent(trigger, "click", function(e) {
        openEditor(editNode.getText(), editNode, editNode.parent);
    });
}
