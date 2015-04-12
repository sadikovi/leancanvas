class Util
    constructor: ->

    createElement: (tagname, id, cls, text, parent) ->
        return false unless tagname
        elem = document.createElement tagname
        elem.className = cls if cls
        elem.id = id if id
        elem.innerHTML = text if text
        parent.appendChild elem if parent
        return elem

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

    addClass: (elem, cls) ->
        elem.className += ' '+cls unless cls in elem.className.split ' '

    removeClass: (elem, cls) ->
        b = (x for x in elem.className.split(' ') when x != cls)
        elem.className = b.join ' '

    hasClass: (elem, cls) ->
        return cls in elem.className.split ' '


class NotificationCenter
    constructor: ->
        @time = 3000
        @util = new Util
        @title_ok = 'Ok'
        @title_cancel = 'Cancel'
        # global notification types
        @type =
            Info: 'INFO'
            Success: 'SUCCESS'
            Warning: 'WARNING'
            Error: 'ERROR'
        # style classes for notification
        @classes =
            notification: 'notification'
            notification_content_cell: 'notification-content-cell'
            notification_on: 'notification-on'
            notification_off: 'notification-off'
            notification_success: 'notification-success'
            notification_warning: 'notification-warning'
            notification_error: 'notification-error'
            notification_control: 'notification-control'
            loading_indicator: 'loading-indicator'
            loading_indicator_spinner: 'loading-indicator-spinner'
            loading_indicator_mask: 'loading-indicator-mask'
            loading_indicator_masked_circle: 'loading-indicator-masked-circle'
            loading_indicator_success: 'loading-indicator-success'
            loading_indicator_warning: 'loading-indicator-warning'
            loading_indicator_error: 'loading-indicator-error'

    change: (notification, type, msg, time, isLoader, okhandler, cancelhandler) ->
        return false unless notification
        # remove previous class
        if notification.type and notification.type.cls
            @util.removeClass notification.main.element, notification.type.cls
        # type of notification
        typeobj = @_getType type
        @util.addClass notification.main.element, typeobj.cls if typeobj.cls
        # reassign notification type
        notification.type = typeobj
        # text node message
        notification.textnode.element.innerHTML = msg if msg
        # loading indicator
        notification.loadnode.element.innerHTML = ''
        @_createLoadingIndicator notification.loadnode.element, typeobj.licls if isLoader
        # control panel
        # clear actions
        @_removeActionHandlers notification
        @_removeControlPanel notification
        if okhandler or cancelhandler
            # create control panel
            t = @_createControlPanel notification, okhandler, cancelhandler
        # set notification timeout
        @_setHideTimeout(notification, time)

    create: (type, msg, time, isLoader, okhandler, cancelhandler, parent) ->
        return false unless parent
        # structure of notification
        notification =
            parent: parent
            type: null
            main:
                element: null
            loadnode:
                element: null
            textnode:
                element: null
            controlnode:
                element: null
                ok:
                    element: null
                    handler: null
                cancel:
                    element: null
                    handler: null

        notification.main.element = @util.createElement 'div', null, @classes.notification, null, parent
        notification.loadnode.element = @util.createElement 'div', null, @classes.notification_content_cell, null, notification.main.element
        notification.textnode.element = @util.createElement 'div', null, @classes.notification_content_cell, msg, notification.main.element
        notification.controlnode.element = @util.createElement 'div', null, @classes.notification_content_cell, null, notification.main.element
        # call change to populate notification
        @change notification, type, msg, time, isLoader, okhandler, cancelhandler
        return notification

    show: (type, msg, time, isLoader, okhandler, cancelhandler, parent) ->
        t = @create type, msg, time, isLoader, okhandler, cancelhandler, parent
        @_fadeIn t.main.element, null
        return t

    hide: (notification) ->
        return false unless notification and notification.parent
        @_removeActionHandlers notification
        t = notification.main.element
        @_fadeOut t, ()=>notification.parent.removeChild t

    _fadeOut: (element, callback) ->
        [op, time] = [1, 12]
        element.style.opacity = op
        # declare action
        action = () =>
            if op <= 0.1
                clearInterval timer
                @util.addClass element, @classes.notification_off
                @util.removeClass element, @classes.notification_on
                callback.call @ if callback
            else
                element.style.opacity = op
                element.style.filter = 'alpha(opacity='+(op*100)+')'
                op -= op * 0.1
        # set interval
        timer = setInterval action, time

    _fadeIn: (element, callback) ->
        [op, time] = [0.1, 12]
        element.style.opacity = op
        @util.addClass element, @classes.notification_on
        @util.removeClass element, @classes.notification_off
        # declare action
        action = () =>
            if op >= 1
                clearInterval timer
                callback.call @ if callback
            else
                element.style.opacity = op
                element.style.filter = 'alpha(opacity='+(op*100)+')'
                op += op * 0.1
        # set interval
        timer = setInterval action, time

    _getType: (type) ->
        obj =
            cls: null
            licls: null
        if @type.Success is type
            obj.cls = @classes.notification_success
            obj.licls = @classes.loading_indicator_success
        else if @type.Warning is type
            obj.cls = @classes.notification_warning
            obj.licls = @classes.loading_indicator_warning
        else if @type.Error is type
            obj.cls = @classes.notification_error
            obj.licls = @classes.loading_indicator_error
        return obj

    _createLoadingIndicator: (parent, typecls=false) ->
        main = @util.createElement 'div', null, @classes.loading_indicator, null, parent
        spinner = @util.createElement 'div', null, @classes.loading_indicator_spinner, null, main
        mask = @util.createElement 'div', null, @classes.loading_indicator_mask, null, spinner
        maskcircle = @util.createElement 'div', null, @classes.loading_indicator_masked_circle, null, mask
        @util.addClass maskcircle, typecls if typecls
        return main

    _createControlPanel: (notification, okhandler, cancelhandler) ->
        return null unless okhandler or cancelhandler
        # get parent
        parent = notification.controlnode.element
        # build control panel
        [ok, cancel] = [null, null]
        if okhandler
            ok = @util.createElement 'a', null, @classes.notification_control, @title_ok, parent
        if cancelhandler
            cancel = @util.createElement 'a', null, @classes.notification_control, @title_cancel, parent
        notification.controlnode.ok.element = ok
        notification.controlnode.cancel.element = cancel
        # set handlers
        @_setControlPanelHanders notification, okhandler, cancelhandler

    _setControlPanelHanders: (notification, okhandler, cancelhandler) ->
        return null unless okhandler or cancelhandler
        if okhandler
            notification.controlnode.ok.handler = () =>
                @_setHideTimeout notification, 0
                okhandler.call @
            @util.addEventListener notification.controlnode.ok.element, 'click', notification.controlnode.ok.handler
        if cancelhandler
            notification.controlnode.cancel.handler = () =>
                @_setHideTimeout notification, 0
                cancelhandler.call @
            @util.addEventListener notification.controlnode.cancel.element, 'click', notification.controlnode.cancel.handler

    _removeActionHandlers: (notification) ->
        return false unless notification
        ok = notification.controlnode.ok
        cancel = notification.controlnode.cancel
        # remove event listeners
        @util.removeEventListener ok.element, 'click', ok.handler if ok.element
        @util.removeEventListener cancel.element, 'click', cancel.handler if cancel.element

    _removeControlPanel: (notification) ->
        return false unless notification
        notification.controlnode.element.innerHTML = ""
        # ok
        notification.controlnode.ok.element = null
        notification.controlnode.ok.handler = null
        # cancel
        notification.controlnode.cancel.element = null
        notification.controlnode.cancel.handler = null

    _setHideTimeout: (notification, time) ->
        clearTimeout notification.timeout if notification.timeout
        time ?= @time
        if time >= 0
            action = () => @hide notification
            notification.timeout = setTimeout action, time

# init global notification center
@notificationcenter ?= new NotificationCenter
