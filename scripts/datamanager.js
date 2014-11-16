// Data Manager
var DataManager = function() {
    this.contents = [];
    this.json = "{}";
    this.loader = {};
    this.root = createElement("div", null, "canvas", null, null);

    // constants for saving and loading content from cookies
    this.COOKIE_NAME = "GITHUB_SADIKOVI_LEAN_CANVAS_TEMP_CONURL";
    this.COOKIE_EXPIRE_SEC = 365*24*60*60; // cookie is stored for one year
    // timer for autosave
    this.autosaveTimer = null;
    this.autosaveTime = 20000; // 20 seconds autosave interval

    // [Public]
    // adds content to existing array
    this.addContent = function(content) {
        this.contents.push(content);
    }

    // [Private]
    // updates json for having the latest changes
    this.updateJSON = function() {
        var res = "{ \"data\" : [ ";

        var a = [];
        for (var i=0; i<this.contents.length; i++) {
            a.push(this.contents[i].getJSON());
        }

        this.json = res + a.join(", ") + "] }";
    }

    // [Public]
    // returns the latest json representation of the data
    this.getJSON = function() {
        this.updateJSON();
        return JSON.parse(this.json);
    }

    // [Public]
    // saves data on github (as gist)
    this.saveGistOnGithub = function(success, error) {
        this.createGist(success, error);
    }

    // [Private]
    // creates gist request and sends it to github
    this.createGist = function (success, error) {
        var id = generateId();
        var filename = "leancanvas-" + id + "-save.json";
        var description = "Public Gist: Lean canvas " + id + " save file to keep up";
        var data = {
            "files": {},
            "description": description,
            "public": true
        };

        data["files"][filename] = {
            "content": JSON.stringify(this.getJSON(), null, 4)
        };

        this.loader = new Loader();
        this.loader.send(
                    "POST",
                    true,
                    "https://api.github.com/gists",
                    "application/x-www-form-urlencoded",
                    JSON.stringify(data),
                    function(result) {
                        success.call(this, result);
                    },
                    function(result) {
                        error.call(this, result);
                    }
        );
    }

    // [Public]
    // loads gist from github
    this.loadGistFromGithub = function(link, success, error) {
        var a = link.split("/");
        var gistid = (a.length==0)?"":a[a.length-1];

        this.loader = new Loader();
        this.loader.send(
            "GET",
            true,
            "https://api.github.com/gists/"+gistid,
            "application/x-www-form-urlencoded",
            null,
            function(result) {
                success.call(this, result);
            },
            function(result) {
                error.call(this, result);
            }
        );
    }

    // [Public]
    // builds content from json representation
    // argument can be json string or json object
    this.buildContentFromJSON = function(content, loadHandler, saveHandler, addNoteHandler, noteEditHandler, noteRemoveHandler) {
        if (!content || !loadHandler || !saveHandler || !addNoteHandler || !noteEditHandler || !noteRemoveHandler) {
            throw ("content is not initiliasid properly is wrong");
        }

        var cont = {};
        try {
            if ((typeof content) === "string") {
                cont = JSON.parse(content);
            } else {
                cont = content;
            }
        } catch (e) {
            cont = DEFAULT_CONTENT;
            console.log("something went wrong. Load default content");
        }

        var data = cont.data;

        // 0. clear contents
        this.contents = [];
        this.json = "{}";

        // 1. main block
        var main = data[0];
        var MainContent = new Content(main.parentid);
        var main_columns = main.columns;
        for (var i=0; i<main_columns.length; i++) {
            var column = new Column(main_columns[i].id, MainContent);
            MainContent.addColumn(column);
            var main_directories = main_columns[i].directories;

            // load directories
            for (var j=0; j<main_directories.length; j++) {
                var directory = new Directory(main_directories[j].id, main_directories[j].name, column, addNoteHandler);
                directory.setPlaceholder(main_directories[j].placeholder);
                column.addDirectory(directory);
                // load notes
                var main_notes = main_directories[j].notes;
                for (var k=0; k<main_notes.length; k++) {
                    var note = new Note(main_notes[k].id, main_notes[k].text, directory, noteEditHandler, noteRemoveHandler);
                    directory.addNote(note);
                }
            }
        }

        // 2. bottom block
        var bottom = data[1];
        var BottomContent = new Content(bottom.parentid);
        var bottom_columns = bottom.columns;
        for (var i=0; i<bottom_columns.length; i++) {
            var column = new Column(bottom_columns[i].id, BottomContent);
            BottomContent.addColumn(column);
            var bottom_directories = bottom_columns[i].directories;

            // load directories
            for (var j=0; j<bottom_directories.length; j++) {
                var directory = new Directory(bottom_directories[j].id, bottom_directories[j].name, column, addNoteHandler);
                directory.setPlaceholder(bottom_directories[j].placeholder);
                column.addDirectory(directory);
                // load notes
                var bottom_notes = bottom_directories[j].notes;
                for (var k=0; k<bottom_notes.length; k++) {
                    var note = new Note(bottom_notes[k].id, bottom_notes[k].text, directory, noteEditHandler, noteRemoveHandler);
                    directory.addNote(note);
                }
            }
        }

        // 3. add contents to dataManager
        this.contents.push(MainContent);
        this.contents.push(BottomContent);
    }

    // [Private]
    // builds DOM for current state of the data
    this.buildDOM = function() {
        var MainContent = this.contents[0];
        var BottomContent = this.contents[1];

        var mainDiv = createElement("div", MainContent.parentId, "", null, this.root);
        mainDiv.appendChild(MainContent.generateDOM());

        var bottomDiv = createElement("div", BottomContent.parentId, "", null, this.root);
        bottomDiv.appendChild(BottomContent.generateDOM());
    }

    // [Public]
    // update DOM, so it reflects latest changes
    this.updateDOM = function() {
        this.root.innerHTML = "";
        this.buildDOM();
    }

    // [Public]
    // returns content from cookie, if it is not found returns null
    this.getContentFromCookie = function(tempLoadHandler) {
        var resData = {type : "", message: "", data: null};

        var c = document.cookie;
        if (!c || c.length == 0)
            return null;

        c = "; " + c;
        var parts = c.split("; " + this.COOKIE_NAME + "=");
        if (parts.length == 2) {
            var fileurl = decodeURIComponent(parts[parts.length-1]);
            this.loadGistFromGithub(fileurl,
                /* success */
                function(result) {
                    resData.type = "success";
                    resData.message = "Loaded...";
                    resData.data = result;
                    if (tempLoadHandler) {tempLoadHandler.call(this, resData);}
                    return result;
                },
                /* error */
                function(result) {
                    resData.type = "error";
                    resData.message = "Something went wrong";
                    resData.data = result;
                    if (tempLoadHandler) {tempLoadHandler.call(this, resData);}
                }
            );
        } else {
            resData.type = "warning";
            resData.message = "Cookies are empty. No data is stored.";
            resData.data = null;
            if (tempLoadHandler) {tempLoadHandler.call(this, resData);}
        }

        return null;
    }

    // [Public]
    // saves current content into cookie
    this.saveContentIntoCookie = function(tempSaveHandler) {
        // 1. create gist and get url back
        // 2. save url as cookie
        var fileurl = "";
        var resData = {type : "", message: ""};
        this.saveGistOnGithub(
            /* success */
            function(result) {
                fileurl = result.html_url;
                resData.type = "success";
                resData.message = "Saved...";
                var d = new Date();
                d.setTime(d.getTime() + (this.COOKIE_EXPIRE_SEC*1000));
                var wholestring = this.COOKIE_NAME + "=" + encodeURIComponent(fileurl) + "; "
                                + "expires=" + d.toUTCString() + "; "
                                + "Path=/; Domain=.sadikovi.github.io";
                document.cookie = this.COOKIE_NAME + "=" + encodeURIComponent(fileurl) + "; "
                                + "expires=" + d.toUTCString() + "; "
                                + "Path=/; Domain=.sadikovi.github.io";
                console.log(wholestring);

                if (tempSaveHandler)
                    tempSaveHandler.call(this, resData);
            },
            /* error */
            function(result) {
                fileurl = result.html_url;
                resData.type = "error";
                resData.message = result.message;
                if (tempSaveHandler)
                    tempSaveHandler.call(this, resData);
            }
        );
    }

    // [Public]
    // toggles autosave feature
    this.toggleAutosaveContent = function(isOn, onAutosaved) {
        if (isOn) {
            // turn on and start updating
            if (this.autosaveTimer)
                this.toggleAutosaveContent(!isOn);

            var te = this;
            this.autosaveTimer = setInterval(
                function() {
                    te.saveContentIntoCookie(onAutosavedHandler);
                }, this.autosaveTime);
        } else {
            // turn off and remove all events
            if (this.autosaveTimer)
                clearInterval(this.autosaveTimer);
        }
    }
};
