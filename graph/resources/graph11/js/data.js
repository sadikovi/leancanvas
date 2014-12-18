// data
var data = {
    sources: [
        {
            id: 1001, name: "Avondale, 3 bedrooms",
            desc: "Sunny recently painted 3 bedroom bungalow with large deck and great views.",
            type: "source",
            value: 530,
            target: 111,
            isUni: false,
            properties:{
                price: 530,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-816241316.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/full/348741440.jpg"
            }
        },
        {
            id: 1002,
            name: "Avondale, 3 bedrooms",
            desc: "Stunning, fully furnished, brand new townhouse available for Corporate Business travellers or Holiday Makers looking for a short or long term rental within close proximity to the City.",
            type: "source",
            value: 750,
            target: 111,
            isUni: false,
            properties: {
                price: 750,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-808894215.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/344730075.jpg"
            }
        },
        {
            id: 1003,
            name: "Avondale, 2 bedrooms",
            desc: "Lovely rear unit with high foundation on a sunny and spacious section.",
            type: "source",
            value: 360,
            target: 111,
            isUni: false,
            properties: {
                price: 360,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822800470.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352944486.jpg"
            }
        },
        {
            id: 1004,
            name: "Avondale, 3 bedrooms",
            desc: "You couldn't find a better house in one of Auckland's fastest growing suburbs, with easy access to the train and motorways. Elevated, sunny and with views to the harbour and Waitakere Ranges.",
            type: "source",
            value: 600,
            target: 111,
            isUni: false,
            properties: {
                price: 600,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822507964.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352810636.jpg"
            }
        },
        {
            id: 1005,
            name: "City Centre, 3 bedrooms",
            desc: "Cosy and tidy 3-bedroom Furnished apartment in Kiwi on Queen (421 Queen Street).",
            type: "source",
            value: 600,
            target: 112,
            isUni: false,
            properties: {
                price: 600,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-820560835.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/351479863.jpg"
            }
        },
        {
            id: 1006,
            name: "City Centre, 1 bedroom",
            desc: "Excellent condition 1 bedroom apartment up at secured 7th floor of the elegant Guardian Building.",
            type: "source",
            value: 350,
            target: 112,
            isUni: false,
            properties: {
                price: 350,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-819264588.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350408120.jpg"
            }
        },
        {
            id: 1007,
            name: "City Centre, 2 bedrooms",
            desc: "Close to all tertiary facilities, shops, public transport in central Auckland.",
            type: "source",
            value: 350,
            target: 112,
            isUni: false,
            properties: {
                price: 350,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818957754.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350269676.jpg"
            }
        },
        {
            id: 1008,
            name: "City Centre, 4 bedrooms",
            desc: "Large 4 bedroom apartment on peaceful Vincent St. Quick stroll to the CBD, and Downtown.",
            type: "source",
            value: 990,
            target: 112,
            isUni: false,
            properties: {
                price: 990,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-800355102.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/341396395.jpg"
            }
        },
        {
            id: 1009,
            name: "Greenlane, 4 bedrooms",
            desc: "Featuring three very generous bedrooms plus a single bedroom, two modern bathrooms and a modern kitchen, stonex benches, butlers sink, 90cm oven with gas hob.",
            type: "source",
            value: 700,
            target: 113,
            isUni: false,
            properties: {
                price: 700,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822857259.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352946008.jpg"
            }
        },
        {
            id: 1010,
            name: "Greenlane, 2 bedrooms",
            desc: "As New As Brand New - 2 bedrooms with Garage - in Double Grammar School zone.",
            type: "source",
            value: 520,
            target: 113,
            isUni: false,
            properties: {
                price: 520,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818979437.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350285227.jpg"
            }
        },
        {
            id: 1011,
            name: "Greenlane, 3 bedrooms",
            desc: "Lovely three bedroom home set off the road on a fully fenced manicured section.",
            type: "source",
            value: 600,
            target: 113,
            isUni: false,
            properties: {
                price: 600,
                bedrooms: 3,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-817832355.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/349741422.jpg"
            }
        },
        {
            id: 1012,
            name: "Greenlane, 2 bedrooms",
            desc: "Ideal for professionals or a young family wanting a cosy, recently renovated two level unit to come home to. You may have used the train - the station is nearby, the bus - just off the main bus route, or the motorway - Greenlane off-ramp easily accessible.",
            type: "source",
            value: 480,
            target: 113,
            isUni: false,
            properties: {
                price: 480,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-817832355.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/349741422.jpg"
            }
        },
        {
            id: 1013,
            name: "Albany, 3 bedrooms",
            desc: "A brand new townhouse is now available for rent.",
            type: "source",
            value: 620,
            target: 121,
            isUni: false,
            properties: {
                price: 620,
                bedrooms: 3,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-823270404.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353125739.jpg"
            }
        },
        {
            id: 1014,
            name: "Albany, 1 bedroom",
            desc: "Small but exceptionally cute.",
            type: "source",
            value: 300,
            target: 121,
            isUni: false,
            properties: {
                price: 300,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-823269919.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353125629.jpg"
            }
        },
        {
            id: 1015,
            name: "Albany, 3 bedrooms",
            desc: "Three bedroom, 2 bathroom (one en-suite) brick and tile house backing onto a golf course.",
            type: "source",
            value: 580,
            target: 121,
            isUni: false,
            properties: {
                price: 580,
                bedrooms: 3,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822941538.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353001649.jpg"
            }
        },
        {
            id: 1016,
            name: "Albany, 4 bedrooms",
            desc: "Bright and sunny four bedroom property in highly sought after location.",
            type: "source",
            value: 590,
            target: 121,
            isUni: false,
            properties: {
                price: 590,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822479479.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/341689173.jpg"
            }
        },
        {
            id: 1017,
            name: "Birkenhead, 2 bedrooms",
            desc: "Two bedroom stand alone house with large front lawn. Sunny with views.",
            type: "source",
            value: 420,
            target: 122,
            isUni: false,
            properties: {
                price: 420,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822138088.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352683722.jpg"
            }
        },
        {
            id: 1018,
            name: "Birkenhead, 4 bedrooms",
            desc: "High quality spacious family home and granny flat.",
            type: "source",
            value: 700,
            target: 122,
            isUni: false,
            properties: {
                price: 700,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-820391508.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/351345253.jpg"
            }
        },
        {
            id: 1019,
            name: "Birkenhead, 3 bedrooms",
            desc: "A warm and sunny two level three bedroom townhouse with a deck for outdoor living and also a small grassed area.",
            type: "source",
            value: 495,
            target: 122,
            isUni: false,
            properties: {
                price: 495,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-817829959.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/349785990.jpg"
            }
        },
        {
            id: 1020,
            name: "Birkenhead, 3 bedrooms",
            desc: "At the end of a quiet cul-de-sac style street, this fabulous easycare home has a lovely bushy outlook towards the reserve providing privacy and security.",
            type: "source",
            value: 950,
            target: 122,
            isUni: false,
            properties: {
                price: 950,
                bedrooms: 3,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-810967102.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/345905734.jpg"
            }
        },
        {
            id: 1021,
            name: "Glenfield, 3 bedrooms",
            desc: "This is a one of a kind family home with three bedrooms, bathroom, seperate toilet, modern kitchen with 2x dishdrawers, wastemaster and small breakfast bar upstairs.",
            type: "source",
            value: 565,
            target: 123,
            isUni: false,
            properties: {
                price: 565,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-823030348.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353004796.jpg"
            }
        },
        {
            id: 1022,
            name: "Glenfield, 3 bedrooms",
            desc: "This wonderful home is situated off the road, on a gated section.",
            type: "source",
            value: 480,
            target: 123,
            isUni: false,
            properties: {
                price: 480,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-823029501.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353004716.jpg"
            }
        },
        {
            id: 1023,
            name: "Glenfield, 1 bedroom",
            desc: "This comfortable unit has its own parking & separate entry, generous full kitchen & laundry, spacious lounge, bathroom.",
            type: "source",
            value: 315,
            target: 123,
            isUni: false,
            properties: {
                price: 315,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-821739297.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352417411.jpg"
            }
        },
        {
            id: 1024,
            name: "Glenfield, 2 bedrooms",
            desc: "This property is a stand alone two bedroom townhouse with stunning water and sunset views.",
            type: "source",
            value: 470,
            target: 123,
            isUni: false,
            properties: {
                price: 470,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822601627.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352883355.jpg"
            }
        },
        {
            id: 1025,
            name: "Addington, 3 bedrooms",
            desc: "Updated three double bedroom characater house. All bedrooms have built in wardrobes. All EQC work complete.",
            type: "source",
            value: 440,
            target: 211,
            isUni: false,
            properties: {
                price: 440,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822582369.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352813378.jpg"
            }
        },
        {
            id: 1026,
            name: "Addington, 2 bedrooms",
            desc: "A lovely sunny modern 2 bedroom townhouse with small sunny side courtyard (low maintenance), 5 mins walk to Hagley Park, close to Christchurch City Centre, the Addington Business Hub, and Christchurch Hospital.",
            type: "source",
            value: 495,
            target: 211,
            isUni: false,
            properties: {
                price: 495,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822190382.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352705044.jpg"
            }
        },
        {
            id: 1027,
            name: "Addington, 1 bedroom",
            desc: "Your own cool pad in Addington: Drive-in remote auto garage door – internal access, security sensor lights, Fresh modern Scandi-look refurbishment – all newly painted, brand new flooring / blinds, Bright, light, with a touch of retro / industrial style.",
            type: "source",
            value: 295,
            target: 211,
            isUni: false,
            properties: {
                price: 295,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-821074183.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352133049.jpg"
            }
        },
        {
            id: 1028,
            name: "Addington, 3 bedrooms",
            desc: "2 storied apartment with open plan living down stairs and bedrooms upstairs.",
            type: "source",
            value: 500,
            target: 211,
            isUni: false,
            properties: {
                price: 500,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818761867.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350109386.jpg"
            }
        },
        {
            id: 1029,
            name: "City Centre, 1 bedroom",
            desc: "This listing is a room for rent with an ensuite bathroom and kitchenette in a three bedroom house with a full kitchen and lounge to share.",
            type: "source",
            value: 280,
            target: 212,
            isUni: false,
            properties: {
                price: 280,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822927834.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352677257.jpg"
            }
        },
        {
            id: 1030,
            name: "City Centre, 2 bedrooms",
            desc: "This fully furnished apartment is so close to the CBD. Ideal situation for the busy executive or professional couple.",
            type: "source",
            value: 450,
            target: 212,
            isUni: false,
            properties: {
                price: 450,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822416568.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352751923.jpg"
            }
        },
        {
            id: 1031,
            name: "City Centre, 2 bedrooms",
            desc: "Central Christchurch. Sunny spacious 2 bedroom flat available now. Newly redecorated, heat pump and garage.",
            type: "source",
            value: 320,
            target: 212,
            isUni: false,
            properties: {
                price: 320,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-821436684.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352454211.jpg"
            }
        },
        {
            id: 1032,
            name: "City Centre, 3 bedrooms",
            desc: "Featuring three bedrooms, two double and one single this two level townhouse has just been completely refurbished throughout to a high standard.",
            type: "source",
            value: 525,
            target: 212,
            isUni: false,
            properties: {
                price: 525,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818764267.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350111390.jpg"
            }
        },
        {
            id: 1033,
            name: "Ilam, 3 bedrooms",
            desc: "This well presented home features an open plan kitchen and dining area, separate spacious lounge and a fantastic outdoor living space consisting of a north facing decking.",
            type: "source",
            value: 430,
            target: 213,
            isUni: false,
            properties: {
                price: 430,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-823308909.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353169202.jpg"
            }
        },
        {
            id: 1034,
            name: "Ilam, 3 bedrooms",
            desc: "With new paint, carpet and curtains this home is perfect if you are needing somewhere to call home while your property is repaired.",
            type: "source",
            value: 525,
            target: 213,
            isUni: false,
            properties: {
                price: 525,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822943709.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/353002326.jpg"
            }
        },
        {
            id: 1035,
            name: "Ilam, 5 bedrooms",
            desc: "5 large bedrooms in this split level home. Main bedroom has huge wardrobe space and an ensuite.",
            type: "source",
            value: 650,
            target: 213,
            isUni: false,
            properties: {
                price: 650,
                bedrooms: 5,
                bathrooms: 3,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822050968.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352983222.jpg"
            }
        },
        {
            id: 1036,
            name: "Ilam, 1 bedroom",
            desc: "Brand new house, double glazing,silencer insulation in between each room, extremely warm and private, high standard living home for young people.",
            type: "source",
            value: 255,
            target: 213,
            isUni: false,
            properties: {
                price: 255,
                bedrooms: 1,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-820689304.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/254005464.jpg"
            }
        },
        {
            id: 1037,
            name: "Lincoln, 4 bedrooms",
            desc: "Drive down the long driveway and once you see this home and garden you will never want to leave.",
            type: "source",
            value: 520,
            target: 221,
            isUni: false,
            properties: {
                price: 520,
                bedrooms: 4,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-819840791.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350960039.jpg"
            }
        },
        {
            id: 1038,
            name: "Lincoln, 3 bedrooms",
            desc: "This rural living three bedroom home is waiting for a new tenant to move in immediately.",
            type: "source",
            value: 420,
            target: 221,
            isUni: false,
            properties: {
                price: 420,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818950466.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/350262489.jpg"
            }
        },
        {
            id: 1039,
            name: "Lincoln, 3 bedrooms",
            desc: "No need to own a car from this superb location 70m from Main St and all that Lincoln town has to offer.",
            type: "source",
            value: 500,
            target: 221,
            isUni: false,
            properties: {
                price: 500,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-813606215.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/348912194.jpg"
            }
        },
        {
            id: 1040,
            name: "Lincoln, 5 bedrooms",
            desc: "This amazing house has a lot to offer.",
            type: "source",
            value: 750,
            target: 221,
            isUni: false,
            properties: {
                price: 750,
                bedrooms: 5,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-802581590.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/342074934.jpg"
            }
        },
        {
            id: 1041,
            name: "Prebbleton, 3 bedrooms",
            desc: "Beautifully redecorated 3 bedroom home, with double garage and sleepout/study, on large 1061m2 fenced section, in a nice street in the heart of Prebbleton.",
            type: "source",
            value: 530,
            target: 222,
            isUni: false,
            properties: {
                price: 530,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-820394743.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/351353646.jpg"
            }
        },
        {
            id: 1042,
            name: "Prebbleton, 5 bedrooms",
            desc: "Spacious modern family home offering well appointed kitchen with dishwasher, fridge and oven level ovens.",
            type: "source",
            value: 750,
            target: 222,
            isUni: false,
            properties: {
                price: 750,
                bedrooms: 5,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-813755347.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/347399206.jpg"
            }
        },
        {
            id: 1043,
            name: "Prebbleton, 4 bedrooms",
            desc: "Unique opportunity to enjoy semi-rural living with geese and ducks walking/flying in front of you or swimming elegantly in a large pond. And at night you shouldn't miss out the incredibly eye-opening view of stars.",
            type: "source",
            value: 650,
            target: 222,
            isUni: false,
            properties: {
                price: 650,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-818595385.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/343605304.jpg"
            }
        },
        {
            id: 1044,
            name: "Prebbleton, 2 bedrooms",
            desc: "Beautiful setting and fully furnished in Prebbleton, perfect if having EQC repairs on your own property or as a holiday rental.",
            type: "source",
            value: 650,
            target: 222,
            isUni: false,
            properties: {
                price: 650,
                bedrooms: 2,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-816128411.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/342633288.jpg"
            }
        },
        {
            id: 1045,
            name: "Rolleston, 3 bedrooms",
            desc: "Located in the brand new Faringdon subdivision this home has a perfect \"live in the country\" feel while at the same time being super close to all the amenities you need.",
            type: "source",
            value: 480,
            target: 223,
            isUni: false,
            properties: {
                price: 480,
                bedrooms: 3,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822579986.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/351715531.jpg"
            }
        },
        {
            id: 1046,
            name: "Rolleston, 3 bedrooms",
            desc: "Superb barn style house featuring 3 bedrooms, two doubles and one single. Open plan living with log burner. Please note property will be unfurnished.",
            type: "source",
            value: 340,
            target: 223,
            isUni: false,
            properties: {
                price: 340,
                bedrooms: 3,
                bathrooms: 1,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-822008162.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/352595628.jpg"
            }
        },
        {
            id: 1047,
            name: "Rolleston, 4 bedrooms",
            desc: "This is a large warm 4 bedroom, 2 bathroom executive home in quiet street in sort after Rolleston.",
            type: "source",
            value: 510,
            target: 223,
            isUni: false,
            properties: {
                price: 510,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-820879730.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/351703364.jpg"
            }
        },
        {
            id: 1048,
            name: "Rolleston, 4 bedrooms",
            desc: "This is a big and beautiful modern 4 bedroom home in Rolleston.Open plan kitchen/dining and living with a separate lounge and a study nook.",
            type: "source",
            value: 575,
            target: 223,
            isUni: false,
            properties: {
                price: 575,
                bedrooms: 4,
                bathrooms: 2,
                link: "http://www.trademe.co.nz/property/residential-property-to-rent/auction-812808641.htm",
                thumbnail: "http://trademe.tmcdn.co.nz/photoserver/tq/346847645.jpg"
            }
        }
    ],
    targets: [
        {id: 0, name: "All regions", desc: "...", parent: null, level: 0, leaf: false, isUni: true, isCollapsed: true, children: [
                {id: 1, name: "Auckland", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 11, name: "Auckland City", desc: "...", parent: 1, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 111, name: "Avondale", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 112, name: "City Centre", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 113, name: "Greenlane", desc: "...", parent: 11, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        },
                        {id: 12, name: "North Shore City", desc: "...", parent: 1, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 121, name: "Albany", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 122, name: "Birkenhead", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 123, name: "Glenfield", desc: "...", parent: 12, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        }
                    ]
                },
                {id: 2, name: "Canterbury", desc: "...", parent: 0, level: 1, leaf: false, isUni: true, isCollapsed: true, children: [
                        {id: 21, name: "Chrishchurch City", desc: "...", parent: 2, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 211, name: "Addington", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 212, name: "City Centre", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 213, name: "Ilam", desc: "...", parent: 21, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        },
                        {id: 22, name: "Selwyn", desc: "...", parent: 2, level: 2, leaf: false, isUni: true, isCollapsed: true, children: [
                                {id: 221, name: "Lincoln", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 222, name: "Prebbleton", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []},
                                {id: 223, name: "Rolleston", desc: "...", parent: 22, level: 3, leaf: true, isUni: true, isCollapsed: true, children: []}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// default level of graph is 0
data.defaultLevel = 0;

// default relative value
data.default_value = 480;

// contain array of all the nodes in the graph
data.arrayOfNodes = data.arrayOfNodes || (function() {
    if (!data.sources || !data.targets) {
        throw ("Data: sources or targets array is not defined");
    }

    // have to copy array (! is not a good idea at all)
    var result = [];
    for (var i=0; i<data.sources.length; i++) {
        result.push(data.sources[i]);
    }

    // transform targets
    var recurReading = function(array, node) {
        if (node == null) {
            return false;
        }

        array.push(node);
        if (node.leaf || node.children.length == 0) {
            return false;
        }

        var children = node.children;
        for (var i=0; i<children.length; i++) {
            recurReading(array, children[i]);
        }
    }

    // fill result with targets
    for (var j=0; j<data.targets.length; j++) {
        recurReading(result, data.targets[j]);
    }

    return result;
})();
