// content manages directories
var Content = function(parentId) {
    if (!parentId)
        throw ("parent id is undefined");
    
    this.parentId = parentId;
    this.isActive = true;
    this.columns = [];
    
    this.addColumn = function(column) {
        if (!column || !column.id)
            throw ("column is undefined");
        this.columns[this.columns.length] = column;
    }
    
    this.removeColumn = function(id) {
        for (i=0; i<this.columns.length; i++)
            if (this.columns[i].id === id) {
                this.columns.splice(i, 1);
                return;
            }
    }
    
    this.exists = function(id) {
        if (id && this.getColumn(id) != null)
            return true;
        else
            return false;
    }
    
    this.getColumn = function(id) {
        for (i=0; i<this.columns.length; i++)
            if (this.columns[i].id === id)
                return this.columns[i];
        return null;
    }
    
    this.generateDOM = function() {
        var main = createElement("table", null, "Canvas_main", null, null);
        var tr = createElement("tr", null, "", null, main);
        
        for (var i=0; i<this.columns.length; i++) {
            var td = createElement("td", null, "Canvas_main_column", null, tr);
            var span = createElement("span", null, "", null, td);
            
            var n = this.columns[i];
            span.appendChild(n.generateDOM());
        }
        
        return main;
    }
    
    this.getJSON = function() {
        var res = "{ \"parentid\" : \"" + this.parentId
                    + "\", \"columns\" : "
                    + "[ ";
        
        var a = [];
        for (var i=0; i<this.columns.length; i++) {
            var n = this.columns[i];
            a.push(n.getJSON());
        }
        
        return res + a.join(", ") + " ] }";
    }
}
