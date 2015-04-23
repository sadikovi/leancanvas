class ModalView
    # generic modal view to show
    constructor: (mapper, @content=[]) ->
        throw ("Mapper is undefined") unless mapper
        @id = "modalview:#{Math.random()}.0"
        @ishidden = true
        @hideclass = "ui dimmer page transition hidden pl-hidden"
        @showclass = "ui dimmer page transition visible active"
        # add dom to document.body
        @itself = mapper.parseMapForParent @dom(), document.body
        # locking mechanism (by default it is off)
        @ison = false

    # inject dom using mapper
    dom: ->
        type: "div"
        id: "#{@id}"
        cls: "#{@hideclass}"
        children:
            type: "div"
            cls: "ui small modal transition visible active scrolling"
            children: @content

    show: (handler) ->
        return false if @ison
        a = @itself ? document.getElementById @id
        a?.className = "#{@showclass}"
        # make it on
        @ison = true
        # call handler
        handler?(true)

    hide: (handler) ->
        return false unless @ison
        a = @itself ? document.getElementById @id
        a?.className = "#{@hideclass}"
        # make it off
        @ison = false
        # call handler
        handler?(false)


class Editor extends ModalView
    # Editor class that takes text as content
    constructor: (mapper, metacontent=null, desccontent=null) ->
        throw ("Mapper is undefined") unless mapper
        # properties
        @title = "Editor"
        # templates
        header = type: "div", cls: "ui tip attached label", title: "#{@title}"
        # pointers to the templates
        @header = mapper.parseMapForParent header
        @handler = null

        content =
            type: "div"
            cls: "ui segment"
            children: [
                @header
                content =
                    type: "div"
                    cls: "ui items"
                    children:
                        type: "div"
                        cls: "item"
                        children:
                            type: "div"
                            cls: "content"
                            children: [
                                meta =
                                    type: "div"
                                    cls: "meta-content pl-container-center"
                                    children: metacontent
                                desc =
                                    type: "div"
                                    cls: "description pl-container-center"
                                    children:
                                        type: "div"
                                        cls: "ui form"
                                        children: desccontent
                                extra =
                                    type: "div"
                                    cls: "ui compact basic segment pl-container-center"
                                    children: [
                                        ok =
                                            type: "div"
                                            cls: "ui small secondary basic button"
                                            title: "Ok"
                                            onclick: => @callback?(true)
                                        cancel =
                                            type: "div"
                                            cls: "ui small secondary basic button"
                                            title: "Cancel"
                                            onclick: => @callback?(false)
                                    ]
                            ]
            ]
        # call super with editor content and onupdate
        super mapper, content

    show: (title, handler) ->
        @header.innerHTML = "#{@title}" + if title then " | #{title}" else ""
        @handler = handler ? null
        super()

    hide: ->
        @header.innerHTML = "#{@title}"
        @handler = null
        super()

    callback: (status) -> @handler?(status)


class TextEditor extends Editor
    # Editor class that takes text as content
    constructor: (mapper, meta) ->
        throw ("Mapper is undefined") unless mapper
        # properties
        @text = ""
        # templates
        @textarea = mapper.parseMapForParent {type: "textarea", title: "#{@text}"}
        metacontent =
            type: "div"
            cls: "meta-content pl-container-center"
            children: meta
        desc =
            type: "div"
            cls: "description pl-container-center"
            children:
                type: "div"
                cls: "ui form"
                children:
                    type: "div"
                    cls: "field"
                    children: @textarea
        # call super with editor content and onupdate
        super mapper, metacontent, desc

    show: (title, text, handler) ->
        @textarea.value = if text then "#{text}" else "#{@text}"
        super title, handler

    hide: ->
        @textarea.value = @text
        super()


class NoteEditor extends TextEditor
    constructor: (@mapper, dropdownCenter) ->
        @tagsmenu = @mapper.parseMapForParent {type: "div", cls: "menu selectable"}
        @labels = @mapper.parseMapForParent {type: "div", cls: "item"}
        @selectedTags = []
        tagselector =
            type: "div"
            cls: "ui segment"
            children:
                type: "div"
                cls: "ui horizontal list"
                children: [
                    selecttags =
                        type: "div"
                        cls: "item"
                        children:
                            type: "div"
                            cls: "ui floating dropdown"
                            children: [
                                selectbtn =
                                    type: "div"
                                    cls: "ui small basic button"
                                    title: "Select tags"
                                @tagsmenu
                            ]

                    @labels
                ]
        super mapper, tagselector
        list = dropdownCenter.search(@itself, (status, parent, elem) =>
            # update labels
            [@labels.innerHTML, @selectedTags] = ["", []]
            for elem in parent.menu.childNodes
                if elem and elem._isselected_ and elem._tag_
                    @mapper.parseMapForParent elem._tag_.dom(true), @labels
                    @selectedTags.push elem._tag_
        )
        @dropdown = if list and list.length > 0 then list[0] else null

    show: (title, text, handler, alltags=[], notetags=[]) ->
        [@tagsmenu.innerHTML, @labels.innerHTML, @selectedTags] = ["", "", []]
        for tag in alltags
            item =
                type: "div"
                id: "#{tag.id}"
                cls: "item"
                title: "#{tag.name}"
                text_last: true
                children:
                    type: "div"
                    cls: "ui #{tag.color} empty circular label"
            elem = @mapper.parseMapForParent item, @tagsmenu
            elem._tag_ = tag
        @dropdown?.update @tagsmenu
        # update elems
        for elem in @tagsmenu.childNodes
            if elem.id in (x.id for x in notetags)
                @dropdown?.select elem
                @mapper.parseMapForParent elem._tag_.dom(true), @labels
                @selectedTags.push elem._tag_
        super title, text, handler

    callback: (status) ->
        if status
            @handler?(status, @textarea.value, @selectedTags)
        else
            @handler?(status)


class List
    constructor: (@name, @object, @onselect, children=[], mapper) ->
        [@collapsed, @selected] = [true, false]
        @itself = mapper.parseMapForParent {type: "a", cls: "item", children:[]}
        @toggler = mapper.parseMapForParent {type: "i", cls: "triangle icon", onclick: (e)-> @_parent_.toggle()}, @itself
        @toggler._parent_ = @
        # metaitem for text selection
        @selectlabel = mapper.parseMapForParent {type: "div", cls: "ui label", title: "#{@name}", onclick: (e)-> @_parent_.select()}
        @selectlabel._parent_ = @
        metaitem =
            type: "div"
            cls: "content"
            children: @selectlabel
        mapper.parseMapForParent metaitem, @itself
        if children and children.length
            @box = mapper.parseMapForParent {type: "div", cls: "list", children: children}, @itself
        @collapse()
        @unselect()

    collapse: ->
        @box?.className = "ui list pl-hidden"
        @toggler?.className = "right triangle icon"
        @collapsed = true

    expand: ->
        @box?.className = "ui list pl-visible"
        @toggler?.className = "down triangle icon"
        @collapsed = false

    toggle: ->
        if @collapsed
            @expand()
        else
            @collapse()

    select: ->
        return false if @selected
        @selected = true
        @selectlabel?.className = "ui blue label"
        @onselect?(@)

    unselect: ->
        return false unless @selected
        @selected = false
        @selectlabel?.className = "ui label"

    dom: -> @itself


class MoveEditor extends Editor
    constructor: (@mapper) ->
        @navigator = @mapper.parseMapForParent {type: "div",cls: "ui list"}
        @selected = null
        description =
            type: "div"
            cls: "ui segment"
            title: "[Directory] -> note is appended, [note] -> note is added before selected"
        navigation =
            type: "div"
            cls: "ui segment pl-scrollable-box"
            children: @navigator
        super @mapper, description, navigation

    buildList: (array) ->
        # directory has name and children
        # note has name
        return null unless array and array.length
        lists = []
        for x in array
            type = x?.type
            name = x.name ? (if x.text.length > 50 then "#{x.text[0..50]}..." else x.text)
            children = @buildList x.children
            list = new List "#{type} [ #{name} ]", x, @resetSelected, children, @mapper
            lists.push list.dom()
        return lists

    show: (title, handler, directories) ->
        @navigator.innerHTML = ""
        @selected = null
        lists = @buildList directories
        if lists and lists.length
            @navigator.appendChild x for x in lists
        super title, handler

    hide: ->
        @selected = null
        super()

    resetSelected: (note) =>
        @selected?.unselect()
        @selected = note

    callback: (status) -> @handler?(status, @selected?.object)


@Editor ?= NoteEditor
@Mover ?= MoveEditor
