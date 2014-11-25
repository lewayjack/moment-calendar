

var monthNameTypes = ['','Short'],
    weekdayNameTypes = ['','Short','Min'],
    intervalCodes = {
        year: 'y',
        month: 'M',
        week: 'w',
        day: 'd'
    },
    MCProto;

moment.calendar = function(baseDate){
    return new MomentCalendar(baseDate);
};

function MomentCalendar(now) {
    this.$now = (now !== undefined)
        ? moment(now).startOf('day') 
        : moment().startOf('day');
}

MCProto = moment.calendar.fn = MomentCalendar.prototype;

MCProto.today = function(){
    return this.$now;
};
MCProto.week = function(fmt){
    return this.current('week', fmt);
};
MCProto.month = function(fmt){
    return this.current('month',fmt);
};
MCProto.year = function(fmt){
    return this.current('year',fmt);
};


MCProto.current = function(interval, fmt) {
    return buildCalendar(this.$now.clone(), interval, fmt);
};
MCProto.next = function(interval, fmt) {
    return buildCalendar(this.$now.clone().add(1, intervalCodes[interval]), interval, fmt);
};
MCProto.prev = function(interval, fmt) {
    return buildCalendar(this.$now.clone().subtract(1, intervalCodes[interval]), interval, fmt);
};

MCProto.events = function(interval, incDuration) {
    if( moment.events && moment.fn.events ) {
        return this.$now.events(interval||'month', incDuration);
    } else {
        return [];
    }
};

MCProto.monthNames = function(type){
    type === undefined? (type=0): void(0);
    if( typeof type === "number") {
        type = monthNameTypes[type%monthNameTypes.length];
    }
    return moment['months'+cap(type)]();
};
MCProto.weekdayNames = function(type){
    type === undefined? (type=0): void(0);
    if( typeof type === "number") {
        type = weekdayNameTypes[type%weekdayNameTypes.length];
    }
    return moment['weekdays'+cap(type)]();
};


function buildCalendar(base, interval, format) {
    var cal = [];
    var dtstart = moment(base).startOf(interval);
    var dtend = dtstart.clone().add(1, intervalCodes[interval]);
    
    while( dtstart.isBefore(dtend) ) {
        cal.push(formatOrNot(dtstart.clone(), format));
        dtstart.add(1, 'd');
    }
    
    return cal;
}

function cap(s){
    return s.charAt(0).toUpperCase() + s.substring(1);
}

function formatOrNot(input, format) {
    return !format
        ? input
        : input.format(format);
}

