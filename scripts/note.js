// Note object

var Note = function(noteId, text, directory, editHandler, removeHandler) {
    if (!noteId || !directory)
        throw ("Note arguments are not initialised properly");
    
    if (!editHandler || !removeHandler)
        throw ("handlers are undefined");
    
    this.id = noteId;
    this.text = text;
    this.parent = directory;
    this.DOM = null;
    
    this.modify = function(text) {
        this.text = text;
    }
    
    this.getText = function() {
        return this.text;
    }
    
    this.generateDOM = function() {
        var note = createElement("div", this.id, "Row_content_note", null, null);
        
        // build note menu
        var noteMenu = createElement("div", null, "", null, note);
        var nTable = createElement("table", null, "Row_content_note_menu", null, noteMenu);
        var nTableTr = createElement("tr", null, "", null, nTable);
        var nTableTrTd = createElement("td", null, "Row_content_note_menu_element", null, nTableTr);
        
        // add note controls
        var nTableTrTdSpanDelete = newButton(Source.IMG_NOTE_DELETE, "Delete note", "Delete note", null);
        var nTableTrTdSpanEdit = newButton(Source.IMG_NOTE_EDIT, "Edit note", "Edit note", null);
        // add handlers
        removeHandler.call(this, nTableTrTdSpanDelete, this);
        editHandler.call(this, nTableTrTdSpanEdit, this);
        
        nTableTrTd.appendChild(nTableTrTdSpanEdit);
        nTableTrTd.appendChild(nTableTrTdSpanDelete);
        
        // build note text
        var noteText = createElement("div", null, "", null, note);
        var nTextSpan = createElement("p", null, "Row_content_note_menu_text", this.getText(), noteText);
        
        return note;
    }
    
    this.getJSON = function() {
        var res = "{ \"id\" : \"" + this.id
        + "\", \"text\" : \"" + replaceJSONSpecialChars(this.getText()) + "\" }";
        
        return res;
    }
}