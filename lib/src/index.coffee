_canvas = document.getElementById "ln-canvas"
throw ("Canvas is not found") unless _canvas

# build menu
leftmenu = [
    header =
        type: "div"
        cls: "item pl-text-bold"
        title: "Lean canvas {2014}"
    github =
        type: "a"
        cls: "item"
        title: "Github"
        text_last: true
        children:
            type: "i"
            cls: "github icon"
    about =
        type: "a"
        cls: "item"
        title: "About"
]

rightmenu = [
    newcanvas =
        type: "a"
        cls: "item"
        title: "New canvas"
    save =
        type: "a"
        cls: "item"
        title: "Save"
        text_last: true
        children:
            type: "i"
            cls: "save icon"
    saveasgist =
        type: "a"
        cls: "item"
        title: "Save as Gist"
        text_last: true
        children:
            type: "i"
            cls: "github alternate icon"
    loadgist =
        type: "div"
        cls: "ui dropdown item"
        text_last: true
        children: [
            github =
                type: "i"
                cls: "github alternate icon"
            span =
                type: "span"
                title: "Load Gist"
            dropdown =
                type: "i"
                cls: "dropdown icon"
            menu =
                type: "div"
                cls: "menu transition visible"
                children: [
                    input =
                        type: "div"
                        cls: "ui action mini input"
                        children: [
                            input =
                                type: "input"
                                inputtype: "text"
                                placeholder: "Insert link"
                            btn =
                                type: "button"
                                cls: "ui primary button pl-text-thin"
                                title: "Load"
                        ]
                ]
        ]
]

mainmenu = @collection.createMenu(leftmenu, rightmenu)
divider = @collection.createCanvasDivider()
@mapper.parseMapForParent mainmenu, _canvas
@mapper.parseMapForParent divider, _canvas
