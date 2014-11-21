// Data Manager
var DataManager = function() {
    return {
        COOKIE_EXPIRE_INTERVAL: function() {
            return 365*24*60*60;
        },
        COOKIE_NAME: function() {
            return "sadikovi_lean_canvas_url_cookie";
        },
        COOKIE_NAME_ACCESS_TOKEN: function() {
            return "sadikovi_lean_canvas_access_token";
        },

        /* util parse function
         * if parse succeeds then succeed function is called
         * otherwise fail function is called
         */
        parseJSON: function(result, succeed, fail) {
            try {
                result = JSON.parse(result);
                if (succeed)
                    succeed.call(this, result);
            } catch (err) {
                var res = {
                    message: ((err.message)?err.message:err),
                    documentation_url: "https://www.google.com/"
                };

                if (fail)
                    fail.call(this, res);
            }
        },

        // [Public]
        // saves data on github (as gist)
        saveGistOnGithub: function (json, success, error) {
            var id = Util.generateId();
            var filename = "leancanvas-" + id + "-save.json";
            var description = "Public: Lean canvas " + id + " save file to keep up";
            var data = {
                "files": {},
                "description": description,
                "public": true
            };

            data["files"][filename] = {
                "content": JSON.stringify(json, null, 4)
            };

            var loader = new Loader();
            loader.send(
                "POST",
                true,
                "https://api.github.com/gists",
                "application/x-www-form-urlencoded",
                JSON.stringify(data),
                /* success */
                function(result) {
                    DataManager.parseJSON(result, success, error);
                },
                /* error */
                function(result) {
                    DataManager.parseJSON(result, error, error);
                }
            );
        },

        // [Public]
        // loads gist from github
        loadGistFromGithub: function(link, success, error) {
            var a = link.split("/");
            var gistid = (a.length==0)?"":a[a.length-1];

            var loader = new Loader();
            loader.send(
                "GET",
                true,
                "https://api.github.com/gists/"+gistid,
                "application/x-www-form-urlencoded",
                null,
                /* success */
                function(result) {
                    try {
                        var files = JSON.parse(result).files;
                        if (files && files[Object.keys(files)[0]].content) {
                            content = files[Object.keys(files)[0]].content;
                            var res = JSON.parse(content);

                            if (typeof res !== 'object')
                                throw ("Content is not an object");

                            if (success)
                                success.call(this, res);
                        }
                    } catch (err) {
                        var res = {
                            message: ((err.message)?err.message:err),
                            documentation_url: "https://www.google.com/"
                        };

                        if (error) {
                            error.call(this, res);
                        }
                    }
                },
                /* error */
                function(result) {
                    DataManager.parseJSON(result, error, error);
                }
            );
        },

        // [Public]
        // returns loaded content from stored in cookie url, if it is not found returns null
        getContentFromCookie: function(success, error) {
            if (!navigator.cookieEnabled) {
                var res = {message: "Cookies are disabled", documentation_url: "https://www.google.com/" }
                if (error)
                    error.call(this, res);

                return;
            }

            var c = document.cookie;
            if (!c || c.length == 0)
                c = "";

            c = "; " + c;
            var parts = c.split("; " + DataManager.COOKIE_NAME() + "=");

            if (parts.length == 2) {
                var fileurl = decodeURIComponent(parts[parts.length-1]);
                DataManager.loadGistFromGithub(fileurl,
                    /* success */
                    function(result) {
                        if (success)
                            success.call(this, result);
                    },
                    /* error */
                    function(result) {
                        if (error)
                            error.call(this, result);
                    }
                );
            } else {
                var res = {
                    message: "Cookies are empty or undefined. No data is loaded.",
                    documentation_url: "https://www.google.com/"
                };

                if (error)
                    error.call(this, res);
            }
        },

        // [Public]
        // saves current content upon Github and saves url into cookie
        saveContentIntoCookie: function(json, success, error) {
            // 1. create gist and get url back
            // 2. save url as cookie

            if (!navigator.cookieEnabled) {
                var res = {message: "Cookies are disabled", documentation_url: "https://www.google.com/" }
                if (error)
                    error.call(this, res);

                return;
            }

            DataManager.saveGistOnGithub(
                json,
                /* success */
                function(result) {
                    var d = new Date();
                    d.setTime(d.getTime() + (DataManager.COOKIE_EXPIRE_INTERVAL()*1000));
                    document.cookie = DataManager.COOKIE_NAME() + "=" + encodeURIComponent(result.html_url) + "; "
                                    + "expires=" + d.toUTCString() + "; "
                                    + "Path=/; Domain=.sadikovi.github.io";
                    if (success)
                        success.call(this, result);
                },
                /* error */
                function(result) {
                    if (error)
                        error.call(this, result);
                }
            );
        }
    }
}();
