var Directory = function(id, name, content, callback) {
    if (!id || !name || !content || !callback)
        throw ("directory arguments are not initialised properly");
    
    this.id = id;
    this.name = name;
    this.notes = [];
    this.parent = content;
    this.placeholder = ""; // shown when there is no notes
    
    this.setPlaceholder = function(text) {
        this.placeholder = text;
    }
    
    this.addNote = function(note) {
        if (!note || !note.id)
            throw ("note is undefined");
        this.notes[this.notes.length] = note;
    }
    
    this.removeNote = function(id) {
        for (i=0; i<this.notes.length; i++)
            if (this.notes[i].id === id) {
                this.notes.splice(i, 1);
                return;
            }
    }
    
    this.exists = function(id) {
        if (id && this.getNote(id) != null)
            return true;
        else
            return false;
    }
    
    this.getNote = function(id) {
        for (i=0; i<this.notes.length; i++)
            if (this.notes[i].id === id)
                return this.notes[i];
        
        return null;
    }
    
    // build title bar
    this.buildDirectoryTitleBar = function(addNoteHandler) {
        var menu = createElement("div", this.id+"&titlebar", "", null, null);
        // create menu table
        var menuTable = createElement("table", null, "Row_content_title_menu", null, menu);
        var menuTableTr = createElement("tr", null, "", null, menuTable);
        
        // add title
        var menuTableTdTitle = createElement("td", null, "Row_content_title_menu_text", null, menuTableTr);
        var menuTableTdTitleSpan = createElement("span", null, "", this.name, menuTableTdTitle);
        
        // add controls
        var menuTableTdBar = createElement("td", null, "Row_content_title_menu_bar", null, menuTableTr);
        var menuTableTdBarSpan = newButton("resources/images/note_add.png", "Add note", "Add note", null);
        // 1. Add note
        addNoteHandler.call(this, menuTableTdBarSpan, this);
        menuTableTdBar.appendChild(menuTableTdBarSpan);
        
        return menu;
    }
    
    // build content notes
    this.buildDirectoryContentNotes = function() {
        var content = createElement("div", this.id+"&content", "Row_content", null, null);
        var contentTable = createElement("table", this.id+"&contentTable", "Row_content_table", null, content);
        
        if (this.notes.length > 0) {
            for (var k=0; k<this.notes.length; k++) {
                var tr = createElement("tr", null, "", null, contentTable);
                var td = createElement("td", null, "", null, tr);
                
                var n = this.notes[k].generateDOM();
                td.appendChild(n);
            }
        } else {
            var tr = createElement("tr", null, "", null, contentTable);
            var td = createElement("td", null, "", null, tr);
            var p = createElement("p", null, "Row_content_table_placeholder", this.placeholder, td);
        }
        
        
        return content;
    }
    
    this.generateDOM = function() {
        // create a column
        var content = createElement("table", this.id, "Canvas_column_table", null);
        // add row element
        var contentTr = createElement("tr", null, "", null, content);
        // add column element
        var contentTd = createElement("td", null, "Canvas_main_column_row", null, contentTr);
        
        // create title and content
        var titleBar = this.buildDirectoryTitleBar(callback);
        var contentNotes = this.buildDirectoryContentNotes();
        
        contentTd.appendChild(titleBar);
        contentTd.appendChild(contentNotes);
        
        return content;
    }
    
    this.getJSON = function() {
        var res = "{ \"id\" : \"" + this.id
            + "\", \"name\" : \"" + replaceJSONSpecialChars(this.name)
            + "\", \"placeholder\" : \"" + replaceJSONSpecialChars(this.placeholder)
            + "\", \"notes\" : "
            + "[ ";
        
        var a = [];
        for (var i=0; i<this.notes.length; i++) {
            var n = this.notes[i];
            a.push(n.getJSON());
        }
        
        return res + a.join(", ") + " ] }";
    }
}