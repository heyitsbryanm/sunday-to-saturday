satToSun = (str) => {
    str = str.trim()
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // re-useable function for splitting strings into this: (["mon","fri"])
    splitAndFind = (str, delimiter) => {
        // if there's a comma, it's a list. Let's treat it like one
        // we use `0` cause it should never begin with a `,`
        str = str.toLowerCase().trim().split(delimiter);
        str = str.map(x => x.trim())
        str = str.map(x => {
            return days.find(findx => findx.indexOf(x) > -1)
        })
        return str
    }

    let result = []
    if (!str) {
        // if undefined or null, return a blank array
        return result
    };
    // if there is a dash, it's a range. Let's get the range of dates
    // we use `0` because it should never begin with a `-`
    if (str.indexOf("-") > 0) {
        str = str.split("-");
        str = str.map(x => x.trim().toLowerCase())

        // get the first day number of a day
        let startDate = days.findIndex(x => x.indexOf(str[0]) > -1)
        let endDate = days.findIndex(x => x.indexOf(str[1]) > -1)

        // if the value is something like monday - monday, then return all the days 
        if (startDate === endDate) {
            return days
        } else if (startDate > endDate) {
            // if it's some weird shit like Friday - Monday, get those days
            result = [...[...days].splice(0, endDate + 1), ...[...days].splice(startDate, startDate)];
        } else {
            // default function
            // calculate the date range
            result = [...days].splice(startDate, endDate)
        }
        // todo: if end date is farther than start date, we need to re-calculate the range.

    } else if (str.indexOf(",") > 0) {
        // if there's a comma only, it's a list. Let's treat it like one
        // we use `0` cause it should never begin with a `,`
        result = splitAndFind(str, ",")
    } else if (str.indexOf(" ") > 0) {
        // if there's a space only, it's a list. Let's treat it like one
        // we use `0` cause it should never begin with a ` `
        result = splitAndFind(' ')
    } else if (str.indexOf('weekend') > -1 || str.indexOf("wknd") > -1 || str.indexOf("end") > -1) {
        result = ["sunday", "saturday"]
    } else if (str.indexOf('weekday') > -1 || str.indexOf("wkday") > -1 || str.indexOf("workday") > -1) {
        result = [...days].splice(1, 5)
    } else if (!!str) {
        // if nothing else, that means there's just a single value. In this case, reeturn a single day
        result.push(days.find(x => x.indexOf(str) > -1))
    }

    // cleanup functions.
    if (result.length === 1 && !!result[0]) {
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