class ModalView
    # generic modal view to show
    constructor: (mapper, @content=[]) ->
        throw ("Mapper is undefined") unless mapper
        @id = "#{Math.random()}.0"
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
                                            onclick: => @handler?(true, @textarea.value)
                                        cancel =
                                            type: "div"
                                            cls: "ui small secondary basic button"
                                            title: "Cancel"
                                            onclick: => @handler?(false)
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


class NoteEditor extends Editor
    constructor: (mapper) ->
        tagselector =
            type: "div"
            cls: "ui segment"
            children: [
                selecttags =
                    type: "div"
                    cls: "ui floating dropdown small basic button"
                    title: "Select tags"
                    children: [
                        menu =
                            type: "div"
                            cls: "menu selectable transition visible"
                            children: [
                                item1 =
                                    type: "div"
                                    cls: "item"
                                    title: "Important"
                                    text_last: true
                                    children:
                                        type: "div"
                                        cls: "ui red empty circular label"
                                item2 =
                                    type: "div"
                                    cls: "item"
                                    title: "Idea"
                                    text_last: true
                                    children:
                                        type: "div"
                                        cls: "ui yellow empty circular label"
                                item3 =
                                    type: "div"
                                    cls: "item"
                                    title: "Startup"
                                    text_last: true
                                    children:
                                        type: "div"
                                        cls: "ui blue empty circular label"
                            ]
                    ]
                labels =
                    type: "div"
                    cls: "ui basic segment"
                    children:
                        type: "div"
                        cls: "ui breadcrumb"
                        children:
                            type: "div"
                            cls: "section"
                            children:
                                type: "div"
                                cls: "ui green small label"
                                title: "sample"
            ]

        super mapper, tagselector


@Editor ?= NoteEditor
