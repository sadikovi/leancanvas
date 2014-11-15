var TopBar = function(id, parent, loadHandler, saveHandler) {
    if (!id || !parent)
        throw ("topbar arguments are not initialised properly");
    
    this.id = id;
    this.parent = parent;
    this.li = null; // for loading indicator
    
    this.generateDOM = function() {
        // create a column
        var content = createElement("table", this.id, "Canvas_column_table", null);
        // add row element
        var contentTr = createElement("tr", null, "", null, content);
        // add column element
        var contentTd = createElement("td", null, "Canvas_main_column_row", null, contentTr);
        
        // create title and content
        var titleBar = this.buildTitleBar();
        contentTd.appendChild(titleBar);
        
        return content;
    }
    
    // build title bar
    this.buildTitleBar = function() {
        var menu = createElement("div", this.id+"&topbar", "", null, null);
        // create menu table
        var menuTable = createElement("table", null, "Row_content_title_menu", null, menu);
        var menuTableTr = createElement("tr", null, "", null, menuTable);
        
        // add title
        var title = createElement("td", null, "", null, menuTableTr);
        this.li = new LoadingIndicator(this.id + "&loadInd", title);
        
        // add controls
        var menuTableTdBar = createElement("td", null, "Row_content_title_menu_bar", null, menuTableTr);
        var menuTableTdBarSpanLoad = newButton(Source.IMG_GITHUB_LOAD, "Load from Github", "Load from Github", null, "Load from Github");
        if (loadHandler)
            loadHandler.call(this, menuTableTdBarSpanLoad, this);
        
        var menuTableTdBarSpanSave = newButton(Source.IMG_GITHUB_SAVE, "Save on Github", "Save on Github", null, "Save on Github");
        if (saveHandler)
            saveHandler.call(this, menuTableTdBarSpanSave, this);
        
        var login = createElement("a", null, "", "Login", menuTableTdBar);
        login.href = "https://github.com/login/oauth/authorize?client_id=74f038939436ecfc8eb1&scope=gist";
        
        menuTableTdBar.appendChild(menuTableTdBarSpanLoad);
        menuTableTdBar.appendChild(newSpace());
        menuTableTdBar.appendChild(menuTableTdBarSpanSave);
        
        return menu;
    }
    
    this.getJSON = function() {
        var res = "{ \"id\" : \"" + this.id + "\" }";
        return res;
    }
}