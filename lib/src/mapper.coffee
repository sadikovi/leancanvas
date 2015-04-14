class Mapper
    constructor: ->

    # just creates element and assigns to parent
    createElement: (type, parent) ->
        t = document.createElement type
        parent.appendChild t if parent
        return t

    addEventListener: (elem, event, handler) ->
        if elem.addEventListener
            elem.addEventListener event, handler, false
        else if elem.attachEvent
            elem.attachEvent 'on'+event, handler
        else
            elem['on'+event] = handler

    # parses map for parent specified
    # does not do anything, if map or parent is undefined
    parseMapForParent: (map, parent) =>
        # return if something is wrong
        return false unless map
        # mappers
        mprs =
            type: 'type'
            cls: 'cls'
            id: 'id'
            title: 'title'
            href: 'href'
            src: 'src'
            inputvalue: 'inputvalue'
            inputtype: 'inputtype'
            placeholder: 'placeholder'
            optionselected: 'optionselected'
            children: 'children'
            text_last: 'text_last' # add children before HTML text
            onclick: 'onclick' # adds onclick event
            onkeyup: 'onkeyup' # adds onkeyup event
        # map can be object or array, or DOM element
        if "nodeName" of map
            # hack - add DOM element
            parent.appendChild map if parent
        else if mprs.type of map
            # create object and add to parent
            c = @createElement map[mprs.type], parent
            c.id = map[mprs.id] if mprs.id of map
            c.className = map[mprs.cls] if mprs.cls of map
            c.href = map[mprs.href] if mprs.href of map
            c.src = map[mprs.src] if mprs.src of map
            # input parameters
            c.value = map[mprs.inputvalue] if mprs.inputvalue of map
            c.type = map[mprs.inputtype] if mprs.inputtype of map
            c.placeholder = map[mprs.placeholder] if mprs.placeholder of map
            c.selected = map[mprs.optionselected] if mprs.optionselected of map
            # events
            if mprs.onclick of map and map[mprs.onclick]
                @addEventListener c, 'click', (e) -> map[mprs.onclick].call @, e
            if mprs.onkeyup of map and map[mprs.onkeyup]
                @addEventListener c, 'keyup', (e) -> map[mprs.onkeyup].call @, e
            # add DOM element text node
            if mprs.title of map
                t = document.createTextNode map[mprs.title]
                if mprs.children of map
                    map[mprs.children] = [map[mprs.children]] unless length of map
                    if mprs.text_last of map and map[mprs.text_last]
                        map[mprs.children].push t
                    else
                        map[mprs.children].unshift t
                else
                    map[mprs.children] = [t]
            @parseMapForParent map[mprs.children], c if mprs.children of map
        else
            @parseMapForParent item, parent for item in map
        # return element
        return c

# create global mapper
@mapper ?= new Mapper
