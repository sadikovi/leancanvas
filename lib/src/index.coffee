canvasmenu = document.getElementById "ln-canvas-menu"
canvasbody = document.getElementById "ln-canvas-body"
canvastags = document.getElementById "ln-canvas-tags"
canvasnote = document.getElementById "ln-canvas-note"
# check that elements are in place
throw ("Canvas is not found") unless canvasmenu and canvasbody and canvastags and canvasnote

# init global variables
[canvaslayout, canvaslayouttags, tagmanager] = [null, null, null]

# dropdown controls
loadinput = @mapper.parseMapForParent {type: "input", inputtype: "text", placeholder: "Paste Gist id or link..."}
loadbtn = @mapper.parseMapForParent {type: "button", cls: "ui primary button pl-text-thin", title: "Go!"}
@util.addEventListener loadbtn, "click", (e) => loadgist loadinput.value

# build menu
mainmenu =
    type: "div"
    cls: "ui fixed main menu"
    children: [
        header =
            type: "div"
            cls: "item pl-text-bold"
            title: "Lean canvas v1.1.0"
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
        previous =
            type: "a"
            cls: "item"
            title: "v1.0.2"
            href: "http://sadikovi.github.io/leancanvas/"
        rightmenu =
            type: "div"
            cls: "right menu"
            children: [
                newcanvas =
                    type: "a"
                    cls: "item"
                    title: "* Lean canvas"
                    onclick: (e) => resetCanvas()
                simplecanvas =
                    type: "a"
                    cls: "item"
                    title: "* Simple canvas"
                    onclick: (e) => resetSimpleCanvas()
                save =
                    type: "a"
                    cls: "item"
                    title: "Save"
                    text_last: true
                    onclick: (e) => savegist(true)
                    children:
                        type: "i"
                        cls: "save icon"
                load =
                    type: "a"
                    cls: "item"
                    title: "Load"
                    text_last: true
                    onclick: (e) => loadlastsave()
                    children:
                        type: "i"
                        cls: "paste icon"
                saveasgist =
                    type: "a"
                    cls: "item"
                    title: "Save as Gist"
                    text_last: true
                    onclick: (e) => savegist(false)
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
                            cls: "menu"
                            children: [
                                input =
                                    type: "div"
                                    cls: "ui action mini input"
                                    children: [loadinput, loadbtn]
                            ]
                    ]
            ]
    ]

# draw menu
@mapper.parseMapForParent mainmenu, canvasmenu
# find dropdown menus
@dropdownCenter.search canvasmenu
# create editor
editor = new @Editor @mapper, @dropdownCenter
mover = new @Mover @mapper

parseTags = (notetags, alltags, collect) ->
    propertags = []
    return propertags unless notetags and "length" of notetags
    for notetag in notetags
        # note tag
        continue unless "type" of notetag and notetag.type == "tag"
        if collect and notetag.id not in (x.id for x in alltags)
            tag = new @Tag notetag.id, notetag.name, [], notetag.color
            propertags.push tag
            alltags.push tag
        else
            propertags.push x for x in alltags when x.id == notetag.id
    return propertags

layoutParseTags = (object) ->
    alltags = if "tags" of object then object.tags else []
    parseTags alltags, [], true

#################################################
# note actions
editNote = (note) ->
    return false if tagmanager.editmode
    editor.show "Edit note for [ #{note.parent.name} ]", note.text, (status, text, tags) =>
        if status
            tag.removeNote note for tag in note.tags
            [note.text, note.tags] = [text, tags]
            tag.addNote note for tag in tags
            refreshCanvas()
        editor.hide()
    , tagmanager.getAllTags(), note.tags

deleteNote = (note) ->
    return false if tagmanager.editmode
    note.parent?.removeNote note
    tag.removeNote note for tag in note.tags
    note.parent = null
    refreshCanvas()

moveNote = (note) ->
    collectDir = (layout) ->
        dirs = []
        recurcollect = (array, dirs) ->
            return false unless array and array.length
            for x in array
                if x instanceof @Directory
                    dirs.push x
                else
                    recurcollect x.children, dirs
        if layout
            recurcollect layout.data, dirs
        return dirs

    # show move dialog
    mover.show "Move note", ((status, selected) =>
        if status
            if selected and selected != note and selected != note.parent
                if selected.type == "directory"
                    note.parent?.removeNote note
                    note.parent = selected
                    selected.addNote note
                else if selected.type == "note" and selected.parent
                    note.parent?.removeNote note
                    note.parent = selected.parent
                    _i = 0
                    for x, i in selected.parent.children
                        _i = i if x == selected
                    selected.parent.children.splice _i, 0, note
            refreshCanvas()
        mover.hide()
    ), collectDir canvaslayout

addNote = (directory) ->
    return false if tagmanager.editmode
    editor.show "Add note for [ #{directory.name} ]", "", (status, text, tags) =>
        if status
            note = new Note "note:#{Math.random()}.0", directory, text, tags, [editNote, deleteNote, moveNote]
            tag.addNote note for tag in tags
            directory?.addNote note
            refreshCanvas()
        editor.hide()
    , tagmanager.getAllTags(), []

# building layout
layout = (object, alltags) ->
    return false unless object
    # domains list, data array, and all tags list
    [domains, data] = [[], object.data]
    return false unless data
    # parse data (convert into array, if necessary)
    data = [data] if "type" of data or "id" of data or "children" of data
    # recursive parsing of layout
    recurLayout = (list, type, collect, alltags, parent) ->
        result = []
        return result unless list and "length" of list
        for item in list
            # data check
            continue unless "type" of item and item.type == type
            # parse element
            if type == "domain"
                element = new @Domain item.id, parent
                element.children = recurLayout item.children, "column", collect, alltags, element
            else if type == "column"
                element = new @Column item.id, parent
                element.children = recurLayout item.children, "directory", collect, alltags, element
            else if type == "directory"
                element = new @Directory item.id, parent, item.name, item.placeholder, [addNote]
                element.children = recurLayout item.children, "note", collect, alltags, element
            else if type == "note"
                tags = parseTags item.tags, alltags, collect
                element = new @Note item.id, parent, item.text, tags, [editNote, deleteNote, moveNote]
                tag.addNote element for tag in tags
            result.push element if element
        return result
    domains = recurLayout data, "domain", false, alltags, null
    return id: object.id, data: domains, tags: alltags

# checking layout to match template
layoutcheck = (layout, template) ->
    recurCheck = (llist, tlist) ->
        return false unless llist and tlist and llist.length == tlist.length
        flag = true
        for t, i in tlist
            continue if t.type in ["note", "tag"] or not t.children
            return false unless t.type == llist[i].type
            flag = flag and recurCheck llist[i]?.children, t.children
        return flag
    return recurCheck layout.data, template.data

refreshCanvas = ->
    @util.clear canvasbody
    @mapper.parseMapForParent (x.dom() for x in canvaslayout.data), canvasbody

resetSimpleCanvas = (obj=@template_simplecanvas) ->
    unless @template_simplecanvas
        @notificationcenter.show @notificationcenter.type.Warning, "Template not found. Default layout will be loaded", null, false, null, null, canvasnote
        resetCanvas()
    else
        resetCanvas obj, @template_simplecanvas

resetCanvas = (obj=@template_leancanvas, template=@template_leancanvas) ->
    canvaslayouttags = layoutParseTags obj
    tagmanager = new @TagManager canvastags, @Tag, canvaslayouttags, =>
        @util.clear tagmanager.parent
        @mapper.parseMapForParent tagmanager.dom(), tagmanager.parent
        refreshCanvas()
    # create tag layout
    @util.clear tagmanager.parent
    @mapper.parseMapForParent tagmanager.dom(), tagmanager.parent
    # create general layout
    canvaslayout = layout obj, canvaslayouttags
    # perform check and report error
    unless obj == template
        unless layoutcheck obj, template
            @notificationcenter.show @notificationcenter.type.Warning, "Layout does not match template. Default layout will be loaded", null, false, null, null, canvasnote
            resetCanvas(@template_leancanvas)
            return false
    refreshCanvas()
    # show notification
    if obj == template
        @notificationcenter.show @notificationcenter.type.Success, "Layout reset", null, false, null, null, canvasnote

# save something on github
savegist = (locally=false) ->
    # show loading notification
    savenote = @notificationcenter.show @notificationcenter.type.Info, "Saving...", -1, true, null, null, canvasnote
    # build payload
    payload =
        id: canvaslayout.id
        data: (x.json() for x in canvaslayout.data)
        tags: (x.json() for x in tagmanager.getAllTags())
    @datamanager.saveGistOnGithub payload
    , (result) =>
        if result.type == "success"
            if locally
                gistid = result.data.gistid
                @datamanager.saveContentIntoCookie gistid,
                (=> @notificationcenter.change savenote, @notificationcenter.type.Success, "Saved successfully", 10000, false, (->), null),
                ((result) => @notificationcenter.change savenote, @notificationcenter.type.Error, "#{result.msg}", null, false, null, (->))
            else
                @notificationcenter.change savenote, @notificationcenter.type.Success, "Saved, here is link: #{result.data.url}#{result.data.gistid}", 10000, false, (->), null
        else
            @notificationcenter.change savenote, @notificationcenter.type.Warning, "#{result.msg}", null, false, null, (->)
    , (result) =>
        @notificationcenter.change savenote, @notificationcenter.type.Error, "#{result.msg}", null, false, null, (->)

loadgist = (gistid) ->
    # show loading notification
    loadnote = @notificationcenter.show @notificationcenter.type.Info, "Loading...", -1, true, null, null, canvasnote
    @datamanager.loadGistFromGithub gistid
    , (result) =>
        if result.type == "success"
            # parse json
            @datamanager.parseJson(result.data
            , (obj) =>
                if obj.id and obj.id == @template_simplecanvas.id
                    resetSimpleCanvas(obj)
                else
                    resetCanvas(obj)
                @notificationcenter.change loadnote, @notificationcenter.type.Success, "Loaded", null, false, (->), null
            , (err) => @notificationcenter.change loadnote, @notificationcenter.type.Error, "Error: #{err}", null, false, null, (->))
        else
            @notificationcenter.change loadnote, @notificationcenter.type.Warning, "#{result.msg}", null, false, null, (->)
    , (result) =>
        @notificationcenter.change loadnote, @notificationcenter.type.Error, "#{result.msg}", null, false, null, (->)

loadlastsave = ->
    # load saved canvas from the start or load default
    @datamanager.getContentFromCookie (res) =>
        loadgist res.data
    , (err) =>
        @notificationcenter.show @notificationcenter.type.Warning, "#{err.msg}", null, false, null, null, canvasnote
        resetCanvas()

# automatically call load last save
loadlastsave()
