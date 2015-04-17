class UpdateTagPanel
    constructor: (@colors, @colorvalue, @textvalue, onupdate) ->
        @colors ?= []
        @colorvalue ?= @colors[0]
        @colorindex = i for k, i in @colors when k == @colorvalue
        @textvalue ?= ""
        # divider
        @divider = type: "div", cls: "divider"
        # color picker
        @picker =
            type: "div"
            cls: "ui mini icon #{@colorvalue} button"
            onclick: (e) =>
                target = if e.target.tagName == "I" then e.target.parentNode else e.target
                @colorvalue = @colors[++@colorindex %% @colors.length]
                target.className = "ui mini icon #{@colorvalue} button"
            children: type: "i", cls: "circle thin icon"
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
            onclick: => onupdate true, @textvalue, @colorvalue
            children: type: "i", cls: "checkmark icon"
        # cancel button
        @cancel =
            type: "div"
            cls: "ui circular mini icon basic button"
            onclick: => onupdate false
            children: type: "i", cls: "remove icon"
        @controls = [@picker, @input, @ok, @cancel]

    dom: () ->
        type: "div"
        cls: "item"
        children:
            type: "div"
            cls: "ui small breadcrumb"
            children: (type: "div", cls: "section", children: [x, @divider] for x in @controls)

class TagManagerAction
    constructor: (@name, @action) ->
    dom: ->
        type: "div"
        cls: "ui secondary basic mini button"
        title: "#{@name}"
        onclick: @action

class TagElement
    constructor: (@tag, @manager) ->
        edit = new TagControl "Edit", => @manager.editTag?(@tag)
        del = new TagControl "Delete", => @manager.deleteTag?(@tag)
        @controls = [edit, del]

    dom: ->
        controls = (x.dom() for x in @controls)
        tagsection = type: "div", cls: "section tag", children: @tag.dom(true)
        controls.unshift tagsection
        # return tagelement dom
        type: "div"
        cls: "item"
        children:
            type: "div"
            cls: "ui small breadcrumb"
            children: controls

class TagControl
    constructor: (@name, @handler) ->
    dom: ->
        control = []
        # add divider
        dvd = type: "div", cls: "divider"
        elem = type: "a", cls: "section #{@name}", title: @name, onclick: @handler
        control.push dvd, elem
        return control

class TagManager
    constructor: (@parent, @Tag, tags, @onupdate) ->
        throw ("Parent is undefined") unless @parent and @Tag
        @actions = [
            new TagManagerAction "+ tag", => @addTag?()
        ]
        @tags = {}
        @tags[tag.id] = new TagElement tag, @ for tag in tags
        @editmmode = false

    addTag: ->
        return false if @editmode
        @editmode = true
        tagid = "tag:#{Math.random()}.0"
        @tags[tagid] = new UpdateTagPanel @Tag.colors, null, null, (status, text, color) =>
            if status and text and text != "" and color and color in @Tag.colors
                tag = new @Tag tagid, text, [], color
                @tags[tagid] = new TagElement tag, @
            else
                delete @tags[tagid]
            @editmode = false
            @onupdate?()
        @onupdate?()

    editTag: (tag) ->
        return false if @editmode
        @editmode = true
        @tags[tag.id] = new UpdateTagPanel @Tag.colors, tag.color, tag.name, (status, text, color) =>
            if status
                tag.name = text if text and text != ""
                tag.color = color if color and color in @Tag.colors
            @tags[tag.id] = new TagElement tag, @
            @editmode = false
            @onupdate?()
        @onupdate?()

    deleteTag: (tag) ->
        return false if @editmode
        editmode = true
        delete @tags[tag.id] if tag
        note.removeTag tag for note in tag.notes if tag
        editmode = false
        @onupdate?()

    dom: ->
        type: "div"
        cls: "row"
        children:
            type: "div"
            cls: "column"
            children:
                type: "div"
                cls: "ui segment"
                children:
                    type: "div"
                    cls: "ui horizontal list"
                    children: [
                        actions =
                            type: "div"
                            cls: "item"
                            children: (x.dom() for x in @actions)
                        tags =
                            type: "div"
                            cls: "item"
                            children:
                                type: "div"
                                cls: "ui horizontal list"
                                children: (v.dom() for k, v of @tags)
                    ]
                    
    getAllTags: -> (v.tag for k, v of @tags)

@TagManager ?= TagManager
