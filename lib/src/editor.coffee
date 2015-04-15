class ModalView
    # generic modal view to show
    constructor: (mapper, @content=[]) ->
        throw ("Mapper is undefined") unless mapper
        @id = "modalview:#{Math.random()}.0"
        @ishidden = true
        @hideclass = "ui dimmer modals page transition hidden pl-hidden"
        @showclass = "ui dimmer modals page transition visible active"
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
    constructor: (mapper, meta) ->
        throw ("Mapper is undefined") unless mapper
        # properties
        [@title, @text, @meta] = ["Editor", "", (meta ? [])]
        # templates
        header = type: "div", cls: "ui tip attached label", title: "#{@title}"
        metacontent = type: "div", cls: "meta-content pl-container-center", children: @meta
        textarea = type: "textarea", title: "#{@text}"
        # pointers to the templates
        @header = mapper.parseMapForParent header
        @metaarea = mapper.parseMapForParent metacontent
        @textarea = mapper.parseMapForParent textarea
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
                                @metaarea
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

    show: (title, text, handler) ->
        @header.innerHTML = "#{@title}" + if title then " | #{title}" else ""
        @textarea.value = if text then "#{text}" else "#{@text}"
        @handler = handler ? null
        super()

    hide: ->
        @header.innerHTML = "#{@title}"
        @textarea.value = @text
        @handler = null
        super()

    callback: (status) ->
        if status
            @handler?(status, @textarea.value)
        else
            @handler?(status)


class NoteEditor extends Editor
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

@Editor ?= NoteEditor
