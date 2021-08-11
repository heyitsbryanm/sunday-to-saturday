const sunToSat = require('./index');

// returns `[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday' ]`
console.log("test_01", satToSun("mon-fri"))

// returns `[ 'monday', 'wednesday', 'friday' ]`
console.log("test_02", satToSun('m, w, f'))

// returns `[ 'sunday', 'monday', 'friday', 'saturday' ]`
console.log("test_03", satToSun('fri - mon'))

// returns [ 'friday' ]
console.log("test_04", satToSun('fri'))

// returns [ 'sunday', 'saturday' ]
console.log("test_05", satToSun('weekends'))   // also catches anything with "end"

// returns [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday' ]
console.log("test_07", satToSun('wkday'))      // also catches: 'weekday', 'wkday' or 'workday'