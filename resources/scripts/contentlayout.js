/*
 * Start content layout for header, footer, notes and etc.
 *
 */

var CONTENT_LAYOUT = function() {
    return {
        /* content for header */
        header: function() {
            var hcontent = {
                title : [
                    { type: "image", id: "main_icon_logo", class: "logo hMargined_normal", src: Source.MAIN_ICON, title: null },
                    { type: "text", id: null, class: "logo", text: "Lean Canvas" }
                ],
                buttons: [
                    { type: "button", id: null, isMini: false, class: "simple hMargined small", text: "New", handler: globalNewHandler, img: null },
                    { type: "button", id: null, isMini: false, class: "simple hMargined small", text: "Save", handler: globalSaveHandler, img: null },
                    { type: "button", id: null, isMini: false, class: "simple hMargined small", text: "Save as Gist", handler: globalSaveGistHandler, img: null },
                    { type: "mbutton", id: null, isMini: false, class: "gray hMargined small", text: "Load Gist",
                        content: {
                            data: [
                                {data: [
                                        { type: "input", id: "modal_view_load_gist_input", class: "gInput modal-view-content-input hMargined_large vMargined_large", placeholder: "Paste Gist link" },
                                        { type: "button", id: null, isMini: false, class: " gray hMargined_small hAlignRight", text: "Load", handler: globalLoadGistHandler, img: null }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            };

            return hcontent;
        },

        /* content for header about */
        header_about: function() {
            var hcontent = {
                title : [
                    { type: "image", id: "main_icon_logo", class: "logo hMargined_normal", src: Source.MAIN_ICON, title: null },
                    { type: "text", id: null, class: null, text: "Lean Canvas" }
                ],
                buttons: [
                    {type: "button", id: null, isMini: false, class: "simple hMargined_small", text: "Back to Lean Canvas",
                        handler: function() {window.location.replace("http://sadikovi.github.io/leancanvas/");} , img: null }
                ]
            };

            return hcontent;
        },

        /* content for footer */
        footer: function() {
            var fcontent = {
                left: [
                    { type: "text", id: null, class: "hMargined_large", text: "@2014 Lean Canvas" },
                    { type: "link", id: null, class: "hMargined_large", text: "About", url: "about.html", target: "blank" }
                ],
                right: [
                    { type: "link", id: null, class: "hMargined_large", text: "@sadikovi", url: "https://github.com/sadikovi/", target: "blank" }
                ]
            };

            return fcontent;
        },

        /* global directory content */
        directory: function() {
            var dcontent = {
                buttons: [
                    {type: "button", id: null, isMini: false, class: "simple hMargined_small", text: "&nbsp;", handler: addNoteHandler , img: Source.IMG_NOTE_ADD }
                ]
            };

            return dcontent;
        },

        /* global note content */
        note: function() {
            var ncontent = {
                buttons: {
                    left: [
                        {type: "button", id: null, isMini: false, class: "simple font_small isDraggable", text: "&nbsp;", handler: null, img: Source.IMG_NOTE_MOVE }
                    ],
                    right: [
                        {type: "button", id: null, isMini: false, class: "simple font_small", text: "&nbsp;", handler: editNoteHandler, img: Source.IMG_NOTE_EDIT },
                        {type: "button", id: null, isMini: false, class: "simple font_small", text: "&nbsp;", handler: deleteNoteHandler, img: Source.IMG_NOTE_DELETE }
                    ]
                }
            };

            return ncontent;
        }
    }
}();
