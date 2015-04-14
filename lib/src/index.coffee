canvasmenu = document.getElementById "ln-canvas-menu"
canvasbody = document.getElementById "ln-canvas-body"
canvastags = document.getElementById "ln-canvas-tags"
# check that elements are in place
throw ("Canvas is not found") unless canvasmenu and canvasbody and canvastags

# build menu
leftmenu = [
    header =
        type: "div"
        cls: "item pl-text-bold"
        title: "Lean canvas"
    github =
        type: "a"
        cls: "item"
        title: "Github"
        href: "https://github.com/sadikovi/leancanvas"
        text_last: true
        children:
            type: "i"
            cls: "github icon"
    about =
        type: "a"
        cls: "item"
        title: "About"
        href: "/about"
]

# controls
newcanvas = @mapper.parseMapForParent {type: "a", cls: "item", title: "New canvas"}
save = @mapper.parseMapForParent {type: "a", cls: "item", title: "Save", text_last: true, children: {type: "i", cls: "save icon"}}
saveasgist = @mapper.parseMapForParent {type: "a", cls: "item", title: "Save as Gist", text_last: true, children: {type: "i", cls: "github alternate icon"}}
loadinput = @mapper.parseMapForParent {type: "input", inputtype: "text", placeholder: "Paste link..."}
loadbtn = @mapper.parseMapForParent {type: "button", cls: "ui primary button pl-text-thin", title: "Go!"}

rightmenu = [
    newcanvas, save, saveasgist,
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
                cls: "menu"
                children: [
                    input =
                        type: "div"
                        cls: "ui action mini input"
                        children: [loadinput, loadbtn]
                ]
        ]
]
# draw menu
#@mapper.parseMapForParent @collection.createMenu(leftmenu, rightmenu), canvasmenu
# find dropdown menus
#@dropdownCenter.search canvasmenu

# create canvas
actions = ->
    note: [
        new @Action "edit", "Edit", null, "edit"
        new @Action "delete", "Delete", null, "delete"
    ]
    directory: [
        new @Action "add", "+ note", null, null
    ]

parseTags = (notetags, alltags, collect) ->
    propertags = []
    return propertags unless notetags and "length" of notetags
    for notetag in notetags
        # note tag
        continue unless "type" of notetag and notetag.type == "tag"
        if collect and notetag.id not in (x.id for x in alltags)
            tag = new @Tag notetag.id, notetag.name, notetag.color
            propertags.push tag
            alltags.push tag
        else
            propertags.push x for x in alltags when x.id == notetag.id
    return propertags

layout = (object, actions) ->
    return false unless object
    # domains list, data array, and all tags list
    [domains, data, alltags] = [[], object.data, if "tags" of object then object.tags else []]
    return false unless data
    # parse all tags if provided
    alltags = parseTags alltags, [], true
    collect = if alltags.length == 0 then true else false
    # parse data (convert into array, if necessary)
    data = [data] if "type" of data or "id" of data or "children" of data
    domains = recurLayout data, "domain", collect, alltags, actions
    return data: domains, tags: alltags

recurLayout = (list, type, collect, alltags, actions) ->
    result = []
    return result unless list and "length" of list
    for item in list
        # data check
        continue unless "type" of item and item.type == type
        # parse element
        if type == "domain"
            element = new @Domain item.id
            element.children = recurLayout item.children, "column", collect, alltags, actions
        else if type == "column"
            element = new @Column item.id
            element.children = recurLayout item.children, "directory", collect, alltags, actions
        else if type == "directory"
            element = new @Directory item.id, item.name, item.placeholder, actions.directory
            element.children = recurLayout item.children, "note", collect, alltags, actions
        else if type == "note"
            tags = parseTags item.tags, alltags, collect
            element = new @Note item.id, item.text, tags, actions.note
        result.push element if element
    return result

canvaslayout = layout @defaultlayout, actions()
tagmanager = new @TagManager canvastags, @Tag, canvaslayout.tags, =>
    @util.clear tagmanager.parent
    @mapper.parseMapForParent tagmanager.dom(), tagmanager.parent
# create tag layout
#@mapper.parseMapForParent tagmanager.dom(), tagmanager.parent
# draw canvas layout
#@mapper.parseMapForParent (x.dom() for x in canvaslayout.data), canvasbody


editor = new @Editor @mapper, -> console.log "test"
editor.show("Edit note for directory 1", "Hello World!", (status, text, meta) ->
    console.log status, text, meta
    editor.hide()
)
@dropdownCenter.search editor.itself, (status, parent, elem) -> console.log status, elem
