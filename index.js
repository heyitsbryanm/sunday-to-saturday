satToSun = (str, options) => {
    options = {
        ...{
            debug: false
        }, ...options
    }
    str = str.trim()
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // use this function to turn words like "tues" -> "tue"
    normalizePlurals = (string) => {
        if (!!string) {
            if (string[string.length - 1] === "s") {
                return string.slice(0, -1)   // removes "s" from string
            }
        }
    }

    // re-useable function for splitting strings into this: (["mon","fri"])
    splitAndFind = (str, delimiter) => {
        // if there's a comma, it's a list. Let's treat it like one
        // we use `0` cause it should never begin with a `,`
        str = str.toLowerCase().trim().split(delimiter);
        str = str.map(x => x.trim())
        str = str.map(x => {
            x = normalizePlurals(x);
            return days.find(findx => findx.indexOf(x) > -1)
        })
        return str
    }

    let result = []
    if (!str) {
        // if undefined or null, return a blank array
        return result
    };

    fixSorting = (indexPositionFrom, indexPositionTo) => {
        // if the value is something like monday - monday, then return all the days 
        if (indexPositionFrom === indexPositionTo) {
            return days
        } else if (indexPositionFrom > indexPositionTo) {
            // if it's some weird shit like Friday - Monday, get those days
            return [...[...days].splice(0, indexPositionTo + 1), ...[...days].splice(indexPositionFrom, indexPositionFrom)];
        } else {
            // default function
            // calculate the date range
            return [...days].splice(indexPositionFrom, indexPositionTo)
        }
    }

    // normalize certain characters and words
    str = str.replace(",", " ");
    str = str.replace("'", " ");    // removes apostraphes since we can parse it without it

    // if there is a dash, it's a range. Let's get the range of dates
    // we use `0` because it should never begin with a `-`
    if (str.indexOf("-") > 0) {
        if (!!options.debug) {
            console.debug(`"-" detected`)
        }
        str = str.split("-");
        str = str.map(x => normalizePlurals(x.trim().toLowerCase()))

        // get the first day number of a day
        let startDate = days.findIndex(x => x.indexOf(str[0]) > -1)
        let endDate = days.findIndex(x => x.indexOf(str[1]) > -1)

        result = fixSorting(startDate,endDate)

        // todo: if end date is farther than start date, we need to re-calculate the range.

    } else if (str.indexOf(" ") > 0) {
        if (!!options.debug) {
            console.debug(`space detected`)
        }
        // if there's a space only, it's a list. Let's treat it like one
        // we use `0` cause it should never begin with a ` `
        result = splitAndFind(str, ' ');
    } else if (str.indexOf('weekend') > -1 || str.indexOf("wknd") > -1 || str.indexOf("end") > -1) {

        if (!!options.debug) {
            console.debug(`"weekend" detected`)
        }

        result = ["sunday", "saturday"]
    } else if (str.indexOf('weekday') > -1 || str.indexOf("wkday") > -1 || str.indexOf("workday") > -1) {

        if (!!options.debug) {
            console.debug(`"weekday" detected`)
        }

        result = [...days].splice(1, 5)
    } else if (!!str) {

        if (!!options.debug) {
            console.debug(`single string detected`)
        }

        str = normalizePlurals(str)
        // if nothing else, that means there's just a single value. In this case, reeturn a single day
        result.push(days.find(x => x.indexOf(str) > -1))
    }
    // cleanup functions.
    if (result.length === 1 && !!result[0]) {

        if (!!options.debug) {
            console.debug(`No type detected. Value is: ${str}`)
        }

        // returns the single value if that's all there is
        return result
    } else if (!!result) {
        // remove any undfined values
        result = result.filter(function (x) {
            return x !== undefined;
        });
    } else {
        console.error(`Error: the output result is not correct. Result is ${result}`)
    }


    // remove duplicates
    result = [...new Set(result)];

    // re-order them
    result = result.sort((a, b) => {
        a = days.findIndex(day => day.indexOf(a) > -1);
        b = days.findIndex(day => day.indexOf(b) > -1);
        if (a < b) {
            return -1
        } if (a > b) {
            return 1
        }
        else return 0
        // return days.findIndex(index=>index.indexOf(x) > -1)
    });
    return result

};

module.exports = satToSun;