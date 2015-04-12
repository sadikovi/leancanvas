# API
class API
    constructor: ->

    search: (loader, query, page, success, error) -> loader.sendrequest "get", "/api/search?q=#{query}&p=#{page}", {}, null, success, error

    like: (loader, albumid, success, error) -> loader.sendrequest "get", "/api/like?albumid=#{albumid}", {}, null, success, error

    dislike: (loader, albumid, success, error) -> loader.sendrequest "get", "/api/dislike?albumid=#{albumid}", {}, null, success, error

    reset: (loader, albumid, success, error) -> loader.sendrequest "get", "/api/reset?albumid=#{albumid}", {}, null, success, error

    myalbums: (loader, success, error) -> loader.sendrequest "get", "/api/myalbums", {}, null, success, error

@api ?= new API
