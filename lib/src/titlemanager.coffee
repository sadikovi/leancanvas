class UpdateTitlePanel
    constructor: (@textvalue, onupdate) ->
        @textvalue ?= ""
        # divider
        @divider = type: "div", cls: "divider"
        # input
        @input =
            type: "div"
            cls: "ui mini input"
            children:
                type: "input"
                inputtype: "text"
                inputvalue: @textvalue
                onkeyup: (e)=> @textvalue = e.target.value
        # submit button
        @ok =
            type: "div"
            cls: "ui circular mini icon basic button"
            onclick: => onupdate true, @textvalue
            children: type: "i", cls: "checkmark icon"
        # cancel button
        @cancel =
            type: "div"
            cls: "ui circular mini icon basic button"
            onclick: => onupdate false
            children: type: "i", cls: "remove icon"
        @controls = [@input, @ok, @cancel]

    dom: () ->
        type: "div"
        cls: "item"
        children:
            type: "div"
            cls: "ui small breadcrumb"
            children: (type: "div", cls: "section", children: [x, @divider] for x in @controls)

class TitleElement
    constructor: (@textvalue, @manager) ->
        @id = "titleelement:#{Math.random()}.0"
        @placeholder = "Add title"

    text: -> @textvalue or @placeholder

    dom: ->
        type: "div"
        id: "#{@id}"
        cls: "item"
        children:
            type: "div"
            cls: "content"
            children:
                type: "div"
                cls: "ui breadcrumb"
                children: [
                    edit =
                        type: "div"
                        cls: "section"
                        children:
                            type: "div"
                            cls: "ui secondary basic mini icon button"
                            onclick: => @manager.editTitle @
                            children:
                                type: "i"
                                cls: "write icon"
                    divider =
                        type: "div"
                        cls: "divider"
                    title =
                        type: "div"
                        cls: "section #{if @textvalue then "pl-text-primary" else "pl-text-muted"}"
                        title: "#{@text()}"
                ]

class TitleManager
    constructor: (@parent, @onupdate) ->
        @elements = {}
        @editmode = false

    addTitle: (titlevalue) ->
        element = new TitleElement titlevalue, @
        @elements[element.id] = element

    editTitle: (element) ->
        return false if @editmode
        @editmode = true
        @elements[element.id] = new UpdateTitlePanel element.textvalue, (status, newvalue) =>
            if status
                element.textvalue = newvalue
            @elements[element.id] = element
            @editmode = false
            @onupdate?()
        @onupdate?()

    getTitle: ->
        [first, ...] = (v.textvalue for k, v of @elements)
        first

    dom: ->
        type: "div"
        cls: "row"
        children:
            type: "div"
            cls: "column"
            children:
                type: "div"
                cls: "ui basic segment"
                children:
                    type: "div"
                    cls: "ui horizontal list"
                    children: (v.dom() for k, v of @elements)


@TitleManager ?= TitleManager
