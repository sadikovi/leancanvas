# search for dropdown elements
# on click show menu / hide

class Dropdown
    constructor: (@dropdown, @menu) ->
        @assignPropertyToAllChildren @dropdown, "_parent_", @
        for x in @dropdown.childNodes
            @addEventListener(x, "click", (e)=> @toggle()) unless x == @menu
        @isopen = false
        @close()
        # add event handler related to document
        @addEventListener document, "click", (e)=>
            @close() unless "_parent_" of e.target and e.target._parent_ == @

    toggle: -> if @isopen then @close() else @open()

    close: ->
        @removeClass @menu, "transition", "visible"
        @addClass @menu, "transition", "hidden"
        @isopen = false

    open: ->
        @removeClass @menu, "transition", "hidden"
        @addClass @menu, "transition", "visible"
        @isopen = true

    addClass: (elem, classes...) ->
        c = elem.className.split " "
        m = c.concat (x for x in classes when x and x not in c)
        elem.className = m.join " "

    removeClass: (elem, classes...) ->
        c = elem.className.split " "
        elem.className = (x for x in c when x not in classes).join " "

    addEventListener: (elem, event, handler) ->
        if elem.addEventListener
            elem.addEventListener event, handler, false
        else if elem.attachEvent
            elem.attachEvent 'on'+event, handler
        else
            elem['on'+event] = handler

    assignPropertyToAllChildren: (elem, propname, propvalue) ->
        if elem.hasChildNodes()
            @assignPropertyToAllChildren x, propname, propvalue for x in elem.childNodes
        elem[propname] = propvalue

class SelectDropdown extends Dropdown
    constructor: (dropdown, menu, @onselect) ->
        super dropdown, menu
        @assignSelectAction()

    assignSelectAction: ->
        return false unless @menu
        for elem in @menu.childNodes
            elem._parent = @
            @unselect elem
            @addEventListener elem, "click", (e) ->
                e.stopPropagation()
                e.preventDefault()
                if @_isselected_
                    @_parent.unselect @
                    @_parent.onselect?(false, @_parent, @)
                else
                    @_parent.select @
                    @_parent.onselect?(true, @_parent, @)

    select: (elem) ->
        @addClass elem, "selected"
        elem._isselected_ = document.createElement "i", elem
        elem._isselected_.className = "checkmark icon"
        elem.insertBefore elem._isselected_, elem.firstChild if elem.firstChild

    unselect: (elem) ->
        @removeClass elem, "selected"
        elem.removeChild elem._isselected_ if elem._isselected_
        elem._isselected_ = false

    update: (newmenu) ->
        #@menu.innerHTML = ""
        @menu = newmenu
        @assignPropertyToAllChildren @menu, "_parent_", @
        @assignSelectAction()


class DropdownCenter
    constructor: (@parent=document) ->

    search: (parent, onselect) ->
        list = []
        @parent = parent ? @parent
        # all div elements in parent
        d = @parent.getElementsByTagName "div"
        # all div elements with class "dropdown"
        e = (x for x in d when "dropdown" in x.className.split " ")
        # all div elements with class "dropdown" and child "menu"
        for x in e
            f = x.childNodes
            for g in f
                if g.className and "menu" in g.className.split " "
                    # create dropdown object
                    if "selectable" in g.className.split " "
                        dr = new SelectDropdown x, g, onselect
                    else
                        dr = new Dropdown x, g
                    # append to the list
                    list.push dr
                    # iterate to the next dropdown
                    break
        # all dropdowns are in the list
        return list

@dropdownCenter ?= new DropdownCenter
