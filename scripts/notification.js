// notification center to serve all kinds of notifications
var NotificationType = {
    INFO    :   "INFO",
    SUCCESS :   "SUCCESS",
    WARNING :   "WARNING",
    ERROR   :   "ERROR"
};

var NotificationCenter = function() {
    var time = 5000; // 5 seconds to show notification
    var parent = null;

    return {
        init: function(id) {
            parent = document.getElementById(id);
            if (!parent)
                throw ("Parent for notifications is undefined");
        },
        showNotification: function(type, message) {
            if (!parent)
                throw ("Parent for notifications is undefined");

            var typeclass = "";
            if (type == NotificationType.SUCCESS) {
                typeclass = "notify_success";
            } else if (type == NotificationType.WARNING) {
                typeclass = "notify_warning";
            } else if (type == NotificationType.ERROR) {
                typeclass = "notify_error";
            } else {
                typeclass = "notify_info";
            }

            var ospan = createElement("span", null, "notify " + typeclass, null, parent);
            var ispan = createElement("span", null, "", message, ospan);
            setTimeout(function() {NotificationCenter.hideNotification(ospan);}, time);
        },
        hideNotification: function(notification) {
            if (!parent)
                throw ("Parent for notifications is undefined");

            if (!notification)
                return;
            parent.removeChild(notification);
        }
    }
}();
