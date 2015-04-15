class DragUtil
    constructor: (@draggable=null) ->

    addClass: (elem, classes...) ->
        c = elem.className.split " "
        m = c.concat (x for x in classes when x and x not in c)
        elem.className = m.join " "

    removeClass: (elem, classes...) ->
        c = elem.className.split " "
        elem.className = (x for x in c when x not in classes).join " "

    createElement: (type, cls, parent) ->
        t = document.createElement type
        t.className = cls if cls
        parent.appendChild t if parent
        return t

    addEventListener: (elem, event, handler) ->
        if elem.addEventListener
            elem.addEventListener event, handler, false
        else if elem.attachEvent
            elem.attachEvent 'on'+event, handler
        else
            elem['on'+event] = handler

    removeEventListener: (elem, event, handler) ->
        if elem.removeEventListener
            elem.removeEventListener event, handler, false
        else if elem.detachEvent
            elem.detachEvent('on'+event, handler)
        else
            elem['on'+event] = null

    mouseCoords: (e) ->
        if e.pageX and e.pageY
            x: e.pageX, y: e.pageY
        else
            x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: e.clientY + document.body.scrollTop  - document.body.clientTop

    getPosition: (target) ->
        [left, top] = [0, 0]
        while true
            left += target.offsetLeft
            top += target.offsetTop
            target = target.offsetParent
            break unless target and target.offsetParent
        x: left, y: top

    getMouseOffset: (target, e) ->
        e ?= window.event
        [docpos, mousepos] = [@getPosition(target), @mouseCoords(e)]
        x: mousepos.x - docpos.x, y: mousepos.y - docpos.y

    showDraggable: (item) ->
        @draggable ?= @createElement "div", "draggable", document.body
        @draggable.original = item
        @addClass item, "inactive"
        @addClass @draggable, "drag-on"
        return @draggable

    hideDraggable: ->
        return false until @draggable
        @removeClass @draggable, "drag-on"
        @removeClass @draggable.original, "drag-on" if @draggable.original


class Dragflix
    constructor: (@util) ->
        throw ("Util is undefined") unless @util
        [@drag, @offset, @dropTargets] = [null, null, []]
        [@onactionended, @ontargetabove, @ontargetleave, @ondropabove, @ondrag] =
            [null, null, null, null, null]

    setActionEnded: (onActionEnded) -> @onactionended = onActionEnded

    setDrag: (onDrag) -> @ondrag = onDrag

    setDrop: (onDropAboveTarget, onDropMissed) -> [@ondropabove, @ondropmissed] = [onDropAboveTarget, onDropMissed]

    setMoveOver: (onTargetAbove, onTargetLeave) -> [@ontargetabove, @ontargetleave] = [onTargetAbove, onTargetLeave]

    startup: ->
        return false unless document.body
        @util.addEventListener document.body, "mousemove", @mouseMove
        @util.addEventListener document.body, "mouseup", @mouseUp
        return true

    cleanup: ->
        return false unless document.body
        @util.removeEventListener document.body, "mousemove", @mouseMove
        @util.removeEventListener document.body, "mouseup", @mouseUp

    targetFound: (mousePos, onTargetAbove, onTargetLeave) ->
        for target in @dropTargets
            targpos = @util.getPosition target
            [targwidth, targheight] = [parseInt(target.offsetWidth), parseInt(target.offsetHeight)]

            if mousepos.x > targpos.x and mousepos.x < (targpos.x+targwidth) and mousepos.y > targpos.y and mousepos.y < (targpos.y+targheight)
                onTargetAbove?(target)
            else
                onTargetLeave?(target)

    setDragCoords: (mousepos, offset) ->
        return false unless @drag
        @drag.style.top = "#{mousepos.y - offset.y}px"
        @drag.style.left = "#{mousepos.x - offset.x}px"

    mouseMove: (e) ->
        e ?= window.event
        mousepos = @util.mouseCoords e

        if @drag
            @setDragCoords mousepos, @offset
            @targetFound mousepos, @ontargetabove, @ontargetleave
        e.preventDefault()
        e.stopPropagation()

    mouseUp: (e) ->
        e ?= window.event
        mousepos = @util.mouseCoords e
        if @drag
            @setDragCoords mousepos, @offset
            @util.targetFound mousepos, @ondropabove, @ondropmissed
        drag = null
        @cleanup()
        onactionended?()
        e.preventDefault()
        e.stopPropagation()

    makeDraggable: (firer, item) ->
        return false unless item and firer
        @util.addEventListener firer, "mousedown", (e) =>
            return false unless e.button == 0
            @startup()

            drag = @util.showDraggable item
            @offset = x: drag.offsetWidth/4, y: drag.offsetHeight/2
            mousepos = @util.mouseCoords e
            @setDragCoords mousepos, @offset

            # remove draggable from drop targets
            @dropTargets = (x for x in @dropTargets when item.obj != x.obj)

            @ondrag?(drag)
            e.preventDefault()
            e.stopPropagation()

    addDropTarget: (dropTarget) -> @dropTargets.push dropTarget
