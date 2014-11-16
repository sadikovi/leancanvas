var header = function() {
    var parent, changer, controls;
    var loader, loaderInput, loadIsOn=false;
    var loadSubmitter, saveSubmitter, msaveSubmitter;
    var spinner;
    var messenger;

    return {
        display: function(elem, onLoadSubmit, onSaveSubmit, onMSaveSubmit) {
            if (!elem)
                throw ("Parent is not specified");
            parent = elem;
            var table = createElement("table", parent.id+"&htable", "header_table", null, parent);
            var tr = createElement("tr", null, "", null, table);
            changer = createElement("td", null, "header_table_title", null, tr);
            controls = createElement("td", null, "header_table_controls", null, tr);

            // for manual save
            var msave = newButton(Source.IMG_CONTENT_SAVE, "Save", "Save", header.save, "Save");
            controls.appendChild(msave);
            controls.appendChild(newSpace(10)); // to separate one section from another

            // for github
            var load = newButton(Source.IMG_GITHUB_LOAD, "Load Gist", "Load Gist", header.toggleLoad, "Load Gist");
            var save = newButton(Source.IMG_GITHUB_SAVE, "Save as Gist", "Save as Gist", header.toggleSave, "Save as Gist");
            controls.appendChild(load);
            controls.appendChild(save);

            if (onLoadSubmit)
                loadSubmitter = onLoadSubmit;
            if (onSaveSubmit)
                saveSubmitter = onSaveSubmit;
            if (onMSaveSubmit)
                msaveSubmitter = onMSaveSubmit;

            spinner = new LoadingIndicator(parent.id+"&loadingindicator", changer);
        },
        toggleLoad: function() {
            if (!loader) {
                loader = createElement("span", null, "", "Submit Gist link: ", changer);
                loaderInput = createElement("input", null, "header_load_textfield", null, loader);
                loaderInput.type = "text";

                var ok = newButton(Source.IMG_OK_SMALL, "Ok", "Ok", header.submit);
                var cancel = newButton(Source.IMG_CANCEL_SMALL, "Cancel", "Cancel", header.hide);
                loader.appendChild(ok);
                loader.appendChild(cancel);
            }

            if (loadIsOn) {
                loader.style.display = "none";
                loaderInput.blur();
                loadIsOn = false;
            } else {
                // hide any messages in header
                header.hideMessage();

                loader.style.display = "";
                loaderInput.focus();
                loaderInput.value = "";
                loadIsOn = true;
            }
        },
        hide: function() {
            loadIsOn = true;
            header.toggleLoad();
        },
        submit: function() {
            header.hide();
            if (loadSubmitter)
                loadSubmitter.call(this, loaderInput.value, spinner);
        },
        toggleSave: function() {
            if (saveSubmitter)
                saveSubmitter.call(this, spinner);
        },
        showMessage: function(msg) {
            header.hide();

            if (!messenger)
                messenger = createElement("span", null, "", null, changer);

            // simply add message as inner html
            messenger.innerHTML = msg;
            messenger.style.display = "";
        },
        hideMessage: function() {
            if (messenger)
                messenger.style.display = "none";
        },
        hideAll: function() {
            header.hide();
            header.hideMessage();
        },
        save: function() {
            if (msaveSubmitter)
                msaveSubmitter.call(this);
        }
    }
}();
