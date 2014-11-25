moment-calendar
===============

Simple Calendar builder based on [Moment.js][moment].

Install
-------

`npm install`  
`bower install`  
`gulp compile` or `gulp`  


Usage
-----

### Create

Create an calendar (based on todays date):

``` javascript
var cal = moment.calendar();
```

Or set a date to work from:

``` javascript
var cal = moment.calendar("2014-11-01");
```

### Calendar Models

The Calendar Models are simply Arrays of Moments, described by an interval and optional format.



#### current( _interval [,format]_ )
Builds an Array of Moments based on the calendar's date.  
`interval` {String}: The interval to build - one of (year | _**month**_ | week | day)  
`format` {String} _(optional)_: The [ISO 8601][iso8601] format of the array-element (omitted defaults to {Moment})

``` javascript
var cal = moment.calendar("2014-11-05");
var dateArray = cal.current('month');
```



#### month( _[format]_ ); week( _[format]_ ); year( _[format]_ )
A quick way to build `current()` models  
`format` {String} _(optional)_: The [ISO 8601][iso8601] format of the array-element (omitted defaults to {Moment})

``` javascript
var cal = moment.calendar("2014-11-05");
var dateArray = cal.month(); // equiv. to: cal.current('month');
var dateArray = cal.week(); // equiv. to: cal.current('week');
var dateArray = cal.year(); // equiv. to: cal.current('year');
```


#### next( _interval [,format]_ ); prev( _interval [,format]_ )
Builds the next or previous `interval` model.  

    NOTE This does not advance the calendar assigned date.


``` javascript
var cal = moment.calendar("2014-11-05");
var previousMonth = cal.prev('month'); // Oct[]
var nextMonth = cal.next('month'); // Dec[]
```


#### monthNames( _[type]_ )
Gets a list of Month Names  
`type` {String|Number} _optional_: The Shortness of the names. ( _**null**_ | 0;  "short" | 1 )  

``` javascript
// ["January","February", ...]
var months = cal.monthNames();  // equiv. to: cal.monthNames(0);
// ["Jan","Feb","Mar", ...]
var months = cal.monthNames('short'); // equiv. to: cal.monthNames(1);
```



#### weekdayNames( _[type]_ )
Gets a list of Weekday Names  
`type` {String|Number} _optional_: The Shortness of the names. ( _**null**_ | 0;  "short" | 1; "min" | 2 )  

``` javascript
// ["Sunday","Monday", ...]
var weekdays = cal.weekdayNames();  // equiv. to: cal.weekdayNames(0);
// ["Sun","Mon","Tue", ...]
var weekdays = cal.weekdayNames('short'); // equiv. to: cal.weekdayNames(1);
// ["Su","Mo","Tu", ...]
var weekdays = cal.weekdayNames('min'); // equiv. to: cal.weekdayNames(2);
```


#### today()
Get the date for today or `now`

``` javascript
var cal = moment.calendar("2014-11-05");
var todayRef = cal.today(); // Nov 5, 2014
```

#### events( _interval [,inclusive]_ )
if [moment-events.js][momentEvents] is installed then return a list of events for the `interval`

``` javascript
moment.events.parse([
    {
        dtstart: "2014-12-24",
        duration: 'allday',
        data: {name: "Twas the night before Christmas"}
    },
    {
        dtstart: "2014-12-25",
        duartion: 'allday',
        data: {name: "Christmas Day"}
    }
]);

var cal = moment.calendar("2014-12-25");
cal.events('day'); // length == 1
cal.events('month'); // length == 2
``` 


### Calendar Manipulation

To manipulate the calendar, simply modify `today`

``` javascript
var cal = calendar("2014-11-02");
// cal.today() is 2014-11-02
// cal.week("MMM DD") is ['Nov 02','Nov 03','Nov 04', ...]

cal.today().add(1, 'months');
// cal.today() is 2014-12-02
// cal.week('MMM DD') is ['Nov 30','Dec 01','Dec 02', ...]
```





[moment]: http://momentjs.com/
[iso8601]: http://en.wikipedia.org/wiki/ISO_8601
[momentEvents]: https://github.com/Sl0wburn/moment-events