// sources for all the images and other things that have to be linked inside scripts

var Source = {};
var isLocalTest = false;

if (isLocalTest) {
    Source = {
        MAIN_ICON :         "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/main_icon.png",
        IMG_NOTE_ADD :      "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/note_add.png",
        IMG_SPINNER :       "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/spinner.gif",
        IMG_NOTE_EDIT :     "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/note_edit.png",
        IMG_NOTE_DELETE :   "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/note_delete.png",
        IMG_NOTE_MOVE :     "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/note_move.png",
        IMG_MB_DOWN :       "file:///Users/sadikovi/Developer/sadikovi.github.io/resources/images/mb_arrow_down.png",
        dummy: ""
    };
} else {
    Source = {
        MAIN_ICON :         "/resources/images/main_icon.png",
        IMG_NOTE_ADD :      "/resources/images/note_add.png",
        IMG_SPINNER :       "/resources/images/spinner.gif",
        IMG_NOTE_EDIT :     "/resources/images/note_edit.png",
        IMG_NOTE_DELETE :   "/resources/images/note_delete.png",
        IMG_NOTE_MOVE :     "/resources/images/note_move.png",
        IMG_MB_DOWN :       "/resources/images/mb_arrow_down.png",
        dummy: ""
    };
}
