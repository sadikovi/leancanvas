class Tag
    @colors: ["yellow", "green", "blue", "orange", "purple", "red", "pink", "teal"]
    constructor: (@id, @name, @color=Tag.colors[0], @children=[]) -> @type = "tag"
    json: -> type: @type, id: @id, name: @name, color: @color, children: (x.json() for x in @children)
    dom: (withname=false) ->
        if withname
            type: "div", cls: "ui tiny #{@color} label", title: @name
        else
            type: "div", cls: "ui empty circular #{@color} label"


class Action
    constructor: (@id, @name, @handler, @icon) -> @type = "action"
    json: -> type: @type, id: @id, name: @name, icon: @icon
    dom: ->
        type: "button"
        cls: "ui secondary basic mini compact button #{@id}"
        title: @name
        text_last: true
        children: if @icon then type: "i", cls: "#{@icon} icon" else []


class Note
    constructor: (@id, @text, @tags=[], @actions=[]) -> @type = "note"
    modify: (@text, @tag) ->
    json: -> type: @type, id: @id, tags: (x.json() for x in @tags), text: @text, actions: (x.json() for x in @actions)
    dom: ->
        type: "div"
        cls: "ui segment"
        children:
            type: "div"
            cls: "ui comments"
            children:
                type: "div"
                cls: "comment"
                children: [
                    actions =
                        type: "div"
                        cls: "actions"
                        children: (x.dom() for x in @actions)
                    text =
                        type: "div"
                        cls: "text"
                        title: @text
                    tags =
                        type: "div"
                        cls: "extra"
                        children: (x.dom() for x in @tags)
                ]


class Directory
    constructor: (@id, @name="", @placeholder="", @actions=[], @children=[]) -> @type = "directory"
    json: ->
        type: @type
        id: @id
        name: @name
        placeholder: @placeholder
        actions: (x.json() for x in @actions)
        children: (x.json() for x in @children)
    dom: ->
        if @children.length
            directoryChildren = (x.dom() for x in @children)
        else
            directoryChildren = type: "p", cls: "pl-text-prewrap pl-text-muted pl-text-small", title: @placeholder
        # dom
        directory =
            type: "div"
            cls: "item"
            children:
                type: "div"
                cls: "content"
                children:
                    type: "div"
                    cls: "ui segment pl-height-medium"
                    children: [
                        header =
                            type: "div"
                            cls: "ui top attached label"
                            title: "#{@name}"
                        actions =
                            type: "div"
                            cls: "meta"
                            children: (x.dom() for x in @actions)
                        content =
                            type: "div"
                            cls: "description pl-margin-small-top"
                            children:
                                type: "p"
                                children: directoryChildren
                    ]


class Column
    constructor: (@id, @children=[]) -> @type = "column"
    json: -> type: @type, id: @id, children: (x.json() for x in @children)
    dom: ->
        type: "div"
        cls: "column"
        children:
            type: "div"
            cls: "ui items"
            children: (x.dom() for x in @children)


class Domain
    constructor: (@id, @children=[]) -> @type = "domain"
    json: -> type: @type, id: @id, children: (x.json() for x in @children)
    dom: ->
        todigit = (n) ->
            a = "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven"
            return if "#{n}" of a then a["#{n}"] else a["1"]
        type: "div"
        cls: "#{todigit(@children.length)} column row"
        children: (x.dom() for x in @children)


@Tag ?= Tag
@Action ?= Action
@Note ?= Note
@Directory ?= Directory
@Column ?= Column
@Domain ?= Domain
