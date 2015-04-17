class DataResult
    constructor: (@type) ->

class SuccessDataResult extends DataResult
    constructor: (@data) ->
        @type = "success"
        super @type

class ErrorDataResult extends DataResult
    constructor: (@msg) ->
        @type = "error"
        super @type

class WarningDataResult extends DataResult
    constructor: (@msg) ->
        @type = "warning"
        super @type

class DataManager
    constructor: (@loader) ->
        COOKIE_EXPIRE_INTERVAL = 365*24*60*60
        COOKIE_NAME = "sadikovi_lean_canvas_url_cookie"

    parseJson: (result, success, error) ->
        try
            result = JSON.parse(result)
        catch err
            error?(err)
        success?(result)

    saveGistOnGithub: (json, success, error) ->
        fileid = "#{Math.random()}".split(".")[1]
        filename = "leancanvas-data-#{fileid}-save.json"
        description = "Leancanvas template #{fileid}"
        senddata =
            files: {"#{filename}": {content: JSON.stringify json, null, 4}}
            description: description
            public: false
        # send post request
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        payload = JSON.stringify senddata
        @loader.sendrequest "post", "https://api.github.com/gists", headers, payload
        , (status, result) =>
            if result
                @parseJson result
                , ((obj) -> success?(new SuccessDataResult {gistid: obj.id, url: "https://api.github.com/gists/"}))
                , ((err) -> error?(new ErrorDataResult "Error #{err}"))
            else
                error?(new WarningDataResult "Result is empty")
        , (status, result) -> error?(new ErrorDataResult "Error occuried during saving")

    loadGistFromGithub: (gistid, success, error) ->
        # gist id: 079ed7ea5951493514ba
        # send get request
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        @loader.sendrequest "get", "https://api.github.com/gists/#{gistid}", headers, null
        , (status, result) =>
            if result
                @parseJson result
                , ((obj) ->
                    files = (v.content for k, v of obj.files)
                    content = if files.length then files[0] else {}
                    success?(new SuccessDataResult content))
                , ((err) -> error?(new ErrorDataResult "Error #{err}"))
            else
                error?(new WarningDataResult "Result is empty")
        , (status, result) -> error?(new ErrorDataResult "Error occuried during loading")

    saveContentIntoCookie: (gistid, success, error) ->
        if navigator.cookieEnabled
            d = new Date
            d.setTime(d.getTime() + (@COOKIE_EXPIRE_INTERVAL * 1000))
            document.cookie = "#{@COOKIE_NAME}=#{encodeURIComponent gistid};expires=#{d.toUTCString()};Path=/;Domain=.github.io"
            success?(new SuccessDataResult "Saved successfully")
        else
            error?(new ErrorDataResult "Cannot save locally. Cookies are disabled")

    getContentFromCookie: (success, error) ->
        if navigator.cookieEnabled
            c = document.cookie
            if c and c.length
                value = (x for x in c.split(";") when x.split("=")[0] == @COOKIE_NAME)
                gistid = if value and value.length then value[0].split("=")[1].trim() else ""
                success?(gistid)
            else
                error?("Nothing to load. Cookies are empty")
        else
            error?("Cannot get content. Cookies are disabled")

@datamanager ?= new DataManager @loader
