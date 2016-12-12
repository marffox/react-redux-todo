var moment = require('moment');

console.log(moment().format());

//January 1st 1970 @ 12:00am --> 0
//January 1st 1970 @ 12:01am --> -60

var now = moment();
console.log('Current timeStamp: ', now.unix());

var timeStamp = 1481565718;
var currentMoment = moment.unix(timeStamp);
console.log('Current moment: ', currentMoment.format('MMM D, YYYY @ h:mm a'));

console.log('Current moment: ', currentMoment.format('MMMM Do, YYYY @ h:mm A'));