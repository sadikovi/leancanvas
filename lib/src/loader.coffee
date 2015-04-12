class Loader
    constructor: ->

    # requests are always asynchronous
    # method is post or get
    # url
    # headers is an object {key1: value1, key2: value2}
    # payload is data to send
    # success is function called when response is OK
    # error is function called when response is KO
    sendrequest: (method, url, headers, payload, success, error) ->
        xmlhttp = if window.XMLHttpRequest then new XMLHttpRequest else new ActiveXObject "Microsoft.XMLHTTP"
        # set state change function
        xmlhttp.onreadystatechange= ->
            if xmlhttp.readyState is 4
                if 200 <= xmlhttp.status < 300
                    success xmlhttp.status, xmlhttp.responseText
                else
                    error xmlhttp.status, xmlhttp.responseText
        # prepare and send request (always async)
        xmlhttp.open method, url, true
        for key, value of headers
            xmlhttp.setRequestHeader key, value
        xmlhttp.send(payload);

# set global loader
@loader ?= new Loader
