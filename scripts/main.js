// create data manager
var manager = new DataManager();
// identify global parent id
var GLOBAL_PARENT_ID = "wrapper_canvas_main";
// identify global notify parent id
var GLOBAL_NOTIFY_ID = "notify_wrapper";

// autosave feature
var isAutosaveOn = false;


// called  only once at the begging of the loading the page
function buildCanvas() {
    var globalParent = document.getElementById(GLOBAL_PARENT_ID);

    if (!globalParent)
        throw ("global div is not found!");

    // 1. build header
    var b = document.getElementById(globalParent.id+"&header_holder");
    if (!b)
        throw ("header div is not found!");
    header.display(b, loadHandler, saveHandler, msaveHandler, crnewHandler);

    // 2. init notifications
    NotificationCenter.init("notify_wrapper");

    // 3. build main body
    // get content from cookie or (if it is empty) load default content
    manager.getContentFromCookie(
        function(resData) {
            var tres = resData.data || DEFAULT_CONTENT;
            manager.buildContentFromJSON(tres, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler);
            updateDOM();
            processResult(resData);
        }
    );

    // 4. enable/disable autosave
    // page is loaded
    // now it is good time to start a timer to update [aka "autosave content"] cookie
    // but before that check if cookies are enabled
    if (!navigator.cookieEnabled) {
        // display notification that cookies disabled and turn off autosave
        isAutosaveOn = false;
        NotificationCenter.showNotification(NotificationType.WARNING, "Cookies are disabled. Autosave is off");
    } else if (isAutosaveOn) {
        NotificationCenter.showNotification(NotificationType.WARNING, "Autosave is on");
    } else {
        NotificationCenter.showNotification(NotificationType.WARNING, "Autosave is off");
    }

    manager.toggleAutosaveContent(isAutosaveOn, msaveHandler);
}

//----------------------------------------------
function updateDOM() {
    var globalParent = document.getElementById(GLOBAL_PARENT_ID);
    var localParent = document.getElementById(globalParent.id+"&body_holder");

    if (!localParent)
        throw ("footer div is not found!");

    for (i=0; i<localParent.childNodes.length; i++) {
        if (localParent.childNodes[i] == manager.root) {
            localParent.removeChild(manager.root);
            break;
        }
    }

    manager.updateDOM();
    localParent.appendChild(manager.root);
}

//-------Save on Github-----------------
function saveHandler(spinner) {
    header.hideAll();
    spinner.startLoading("Saving...");
    manager.saveGistOnGithub(
        function(result) {
            var result = JSON.parse(result);
            spinner.stopLoading();
            saveShowLink.call(this, result);
        },
        function(result) {
            var result = JSON.parse(result);
            spinner.stopLoading();
            saveShowError.call(this, result);
        }
    );
}

function saveShowLink(result) {
    var docUrl = "<a href=\"" + result.html_url + "\" target=\"blank\">" + result.html_url + "</a>";
    var msg = "@"+getCurrentDateTime() + " #Saved file: " + docUrl + ". Dont forget to copy link somewhere!";
    header.showMessage(msg);
}

function saveShowError(result) {
    var docUrl = "<a href=\"" + result.documentation_url + "\" target=\"blank\">" + result.documentation_url + "</a>";
    var msg = "@"+getCurrentDateTime()+" #Error: " + result.message + ", documentation: " + docUrl;
    header.showMessage(msg);
}

//----------Load from Github--------------
function loadHandler(text, spinner) {
    spinner.startLoading("Loading gist file...");
    manager.loadGistFromGithub(text,
        function(result) {
            var result = JSON.parse(result);
            spinner.stopLoading();
            loadShowResult.call(this, result);
        },
        function(result) {
            var result = JSON.parse(result);
            spinner.stopLoading();
            loadShowError.call(this, result);
        }
    );
}

function loadShowResult(result) {
    var files = result.files;
    var content = null;
    if (files && files[Object.keys(files)[0]].content)
        content = files[Object.keys(files)[0]].content;

    manager.buildContentFromJSON(content, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler);
    updateDOM();
}

function loadShowError(result) {
    var docUrl = "<a href=\"" + result.documentation_url + "\" target=\"blank\">" + result.documentation_url + "</a>";
    var msg = "@" + getCurrentDateTime() + " #Error: " + result.message + ", documentation: " + docUrl;
    header.showMessage(msg);
}

//-----------Autosave and manual save and load---------------
function processResult(resData) {
    if (!resData)
        return;
    if (resData.type == "success") {
        NotificationCenter.showNotification(NotificationType.SUCCESS, resData.message);
    } else if (resData.type == "error") {
        NotificationCenter.showNotification(NotificationType.ERROR, resData.message);
    } else {
        NotificationCenter.showNotification(NotificationType.WARNING, resData.message);
    }
}

// handler for manual saving upon Github
function msaveHandler() {
    manager.saveContentIntoCookie(
        /* callback */
        function(resData) {
            processResult(resData);
        }
    );
}

//-----------Create new content-----------
function crnewHandler() {
    manager.buildContentFromJSON(DEFAULT_CONTENT, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler);
    updateDOM();
    NotificationCenter.showNotification(NotificationType.SUCCESS, "#Content updated. Start new...");
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
