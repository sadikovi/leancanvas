var header = function() {
    var parent, changer, controls;
    var loader, loaderInput, loadIsOn=false;
    var loadSubmitter, saveSubmitter;
    var spinner;
    var messenger;

    return {
        display: function(elem, onLoadSubmit, onSaveSubmit) {
            if (!elem)
                throw ("Parent is not specified");
            parent = elem;
            var table = createElement("table", parent.id+"&htable", "header_table", null, parent);
            var tr = createElement("tr", null, "", null, table);
            changer = createElement("td", null, "header_table_title", null, tr);
            controls = createElement("td", null, "header_table_controls", null, tr);

            var load = newButton(Source.IMG_GITHUB_LOAD, "Load from Github", "Load from Github", header.toggleLoad, "Load from Github");
            var save = newButton(Source.IMG_GITHUB_SAVE, "Save on Github", "Save on Github", header.toggleSave, "Save on Github");
            controls.appendChild(load);
            controls.appendChild(save);

            if (onLoadSubmit)
                loadSubmitter = onLoadSubmit;
            if (onSaveSubmit)
                saveSubmitter = onSaveSubmit;

            spinner = new LoadingIndicator(parent.id+"&loadingindicator", changer);
        },
        toggleLoad: function() {
            if (!loader) {
                loader = createElement("span", null, "", "Submit Gist link: ", changer);
                loaderInput = createElement("input", null, "header_load_textfield", null, loader);

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
        }
    }
}();
