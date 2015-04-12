// notification center to serve all kinds of notifications
var NotificationType = {
    INFO    :   "INFO",
    SUCCESS :   "SUCCESS",
    WARNING :   "WARNING",
    ERROR   :   "ERROR"
};

var NotificationCenter = function() {
    var time = 3000; // 3 seconds to show notification
    var parent = null;

    return {
        /* initialize Notification center withing parent with id */
        init: function(id) {
            parent = document.getElementById(id);
            if (!parent)
                throw ("Parent for notifications is undefined");
        },
        /* returns elements class for specified type */
        classForType: function(type) {
            if (type == NotificationType.SUCCESS) {
                return "notify_success";
            } else if (type == NotificationType.WARNING) {
                return "notify_warning";
            } else if (type == NotificationType.ERROR) {
                return "notify_error";
            } else {
                return "notify_info";
            }
        },
        /* returns notification with specified type, message, and isLoading feature */
        create: function(type, message, isLoading) {
            if (!parent)
                throw ("Parent for notifications is undefined");

            var typeclass = NotificationCenter.classForType(type);
            var ospan = Util.createElement("span", null, "notify off " + typeclass, null, null);
            parent.appendChild(ospan);

            if (isLoading) {
                var p = Util.createElement("span", null, "", null, ospan);
                Util.createImage(null, "notify_img hMargined_small", Source.IMG_SPINNER, "loading", p);
                ospan.image = p;
            }

            var ispan = Util.createElement("span", null, "", message, ospan);
            ospan.child = ispan;
            return ospan;
        },
        /* changes specified notification type and text */
        change: function(notification, type, message, isLoading) {
            notification.className = "notify" + " " + NotificationCenter.classForType(type);
            if (notification.child)
                notification.child.innerHTML = message;
            if (notification.image && !isLoading)
                notification.removeChild(notification.image);
        },

        /* shows notification by creating one and showing for timeout */
        show: function(type, message, timeout, isLoading) {
            var t = NotificationCenter.create(type, message, isLoading);
            NotificationCenter.showN(t, timeout);
        },
        /* shows specified notification for a certain timeout */
        showN: function(notification, timeout) {
            NotificationCenter.fadeIn(notification,
                function() {
                    if (!timeout || timeout >= 0) {
                        setTimeout(function() {NotificationCenter.hide(notification);}, ((timeout)?timeout:time));
                    }
                }
            );
        },

        /* hides notification by removing it from parent */
        hide: function(notification) {
            if (!parent)
                throw ("Parent for notifications is undefined");

            if (!notification)
                return;

            NotificationCenter.fadeOut(notification,
                function() {
                    parent.removeChild(notification);
                }
            );
        },

        /* fade out */
        fadeOut: function(element, callback) {
            var op = 1;
            element.style.opacity = op;
            var timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    Util.removeClass(element, "on");
                    Util.addClass(element, "off");
                    callback.call(this);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, 12);
        },

        /* fade in */
        fadeIn: function(element, callback) {
            var op = 0.1;
            element.style.opacity = op;
            Util.removeClass(element, "off");
            Util.addClass(element, "on");

            var timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                    callback.call(this);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
            }, 12);
        }
    }
}();
