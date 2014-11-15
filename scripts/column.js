// content manages directories
var Column = function(id, content) {
    if (!id || !content)
        throw ("column arguments are not defined");
    
    this.id = id;
    this.parent = content;
    this.directories = [];
    
    
    this.addDirectory = function(directory) {
        if (!directory || !directory.id)
            throw ("directory is undefined");
        this.directories[this.directories.length] = directory;
    }
    
    this.removeDirectory = function(id) {
        for (i=0; i<this.directories.length; i++)
            if (this.directories[i] === id) {
                this.directories.splice(i, 1);
                return;
            }
    }
    
    this.exists = function(id) {
        if (id && this.getDirectory(id) != null)
            return true;
        else
            return false;
    }
    
    this.getDirectory = function(id) {
        for (i=0; i<this.directories.length; i++)
            if (this.directories[i].id === id)
                return this.directories[i];
        return null;
    }
    
    this.generateDOM = function() {
        var main = createElement("table", null, "Canvas_column_table", null, null);
        
        for (var j=0; j<this.directories.length; j++) {
            var tr = createElement("tr", null, "", null, main);
            var td = createElement("td", null, "", null, tr);
            
            var n = this.directories[j];
            td.appendChild(n.generateDOM());
        }
         
        return main;
    }
    
    this.getJSON = function() {
        var res = "{ \"id\" : \"" + this.id
        + "\", \"directories\" : "
        + "[ ";
        
        var a = [];
        for (var i=0; i<this.directories.length; i++) {
            var n = this.directories[i];
            a.push(n.getJSON());
        }
        
        return res + a.join(", ") + " ] }";
    }
}

