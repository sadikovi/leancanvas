var LoadingIndicator = function(id, parent) {
    if (!id || !parent)
        throw ("loading indicator parameters are not defined properly");
    
    this.id = id;
    this.parent = parent;
    this.isActive = false;
    this.node = null;
    
    this.startLoading = function(text) {
        if (this.isActive)
            return;
        
        this.isActive = true;
        this.buildNode(text);
    }
    
    this.stopLoading = function() {
        if (!this.isActive)
            return;
        
        this.isActive = false;
        this.removeNode();
    }
    
    this.buildNode = function(text) {
        this.removeNode();
        
        if (!this.node) {
            var t = createElement("div", this.id, "", null, null);
            var ttable = createElement("table", null, "", null, t);
            var ttr = createElement("tr", null, "", null, ttable);
            var ttdIm = createElement("td", null, "", null, ttr);
            var ttdTx = createElement("td", null, "", null, ttr);
        
            var im = newImage(Source.IMG_SPINNER, "Loading", "Loading");
            im.style.width = "20px";
            im.style.height = "20px";
            ttdIm.appendChild(im);
            var span = createElement("span", null, "", text, ttdTx);
            span.style.color = "#BBBBBB";
            span.style.fontSize = "11pt";
        
            this.textNode = span;
            this.node = t;
        }
        
        this.parent.appendChild(this.node);
    }
    
    this.removeNode = function() {
        if (this.node) {
            this.parent.removeChild(this.node);
            this.node = null;
        }
    }
}