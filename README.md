# Sunday to Saturday

This is a small, lightweight tool that can be used to format a date string (ex: `Mon - w` or `m, t, w`) into an array of dates (`["monday", "tuesday", "wednesday"]`).

## Usage

To use this package, include it in your project using `npm i sunday-to-saturday`.

Example usage:

```
const sunToSat = require('sunday-to-saturday')

// returns `[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday' ]`
console.log(satToSun("mon-fri"))

// returns `[ 'monday', 'wednesday', 'friday' ]`
console.log(satToSun('m, w, f'))

// returns `[ 'sunday', 'monday', 'friday', 'saturday' ]`
console.log(satToSun('fri - mon'))

// returns [ 'friday' ]
console.log(satToSun('fri'))

// returns [ 'sunday', 'saturday' ]
console.log(satToSun('weekends'))   // also catches anything with "end"

// returns [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday' ]
console.log(satToSun('wkday'))      // also catches: 'weekday', 'wkday' or 'workday'
```