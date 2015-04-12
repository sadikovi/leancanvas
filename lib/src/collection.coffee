# just collection of objects to map as DOM elements
class Collection
    constructor: ->

    createMenu: (leftelements, rightelements) ->
        if rightelements
            rightmenu =
                type: "div"
                cls: "right menu"
                children: rightelements
            leftelements.push rightmenu
        # main menu
        mainmenu =
            type: "div"
            cls: "row"
            children:
                type: "div"
                cls: "column"
                children:
                    type: "div"
                    cls: "ui fixed main menu"
                    children: leftelements

    createCanvasDivider: () ->
        divider =
            type: "div"
            cls: "row"
            children:
                type: "div"
                cls: "divider"



@collection ?= new Collection
