Handlebars.registerHelper("activeDate", function(date) {
    return Session.equals("activeDate", date) ? "active-date" : "";
});

Template.daterangepicker.rendered = function() {
    // initiate calendars
    $('#first-cal').datepicker({
        endDate: moment().toDate(),
        todayHighlight: true
    }).on('changeDate', function(ev) {
        restrictDates();
    }).click(function(e) {
        e.stopPropagation();
    });
    $('#second-cal').datepicker({
        endDate: moment().toDate(),
        todayHighlight: true
    }).on('changeDate', function(ev) {
        restrictDates();
    }).click(function(e) {
        e.stopPropagation();
    });

    $('.dropdown-menu .calendar-bottom .left, .dropdown-menu .calendars').click(function(e) {
        e.stopPropagation();
    });

    $('#date-dropdown').on('hide.bs.dropdown', function() {
        changeDate();
    });

    var restrictDates = function() {

        var highlightDates = function() {
            var table = $('#first-cal table');
            var tableOne = table[0];
            var tableEnd = $('#second-cal table');
            var tableTwo = tableEnd[0];
            var active = 0;
            var restrict = 0;
            var set = 0;

            var startDateMonth = moment($('#first-cal').datepicker("getDate")).format('YYYYMM');
            var endDateMonth = moment($('#second-cal').datepicker("getDate")).format('YYYYMM');

            for (var i = 0, cell; cell = tableOne.getElementsByTagName('td')[i]; i++) {

                if (set >= 1) {
                    // do nothing
                } else {
                    restrict++;
                }
                if ($(cell).hasClass('disabled') && $(tableTwo.getElementsByTagName('td')[i]).hasClass('disabled')) {
                    active = 0;
                };
                if (active >= 1) {
                    $(cell).removeClass('disabled');
                    $(cell).addClass('highlighted');
                }
                if ($(cell).hasClass('active')) {
                    active = 1;
                    set = 1;
                }
                if (setTwo >= 1) {
                    $(cell).removeClass('highlighted');
                    $(cell).addClass('disabled');
                };

                if (startDateMonth == endDateMonth) {
                    if ($(tableTwo.getElementsByTagName('td')[i]).hasClass('active')) {
                        var setTwo = 1;
                    }
                }
            }

            var active = 0;

            for (var i = 0, cell; cell = tableTwo.getElementsByTagName('td')[i]; i++) {

                if ($(cell).hasClass('active')) {
                    active = 1;
                }
                if (active < 1) {
                    $(cell).removeClass('disabled');
                    $(cell).addClass('highlighted');
                }

                if (startDateMonth > endDateMonth) {
                    $(cell).removeClass('highlighted');
                    $(cell).addClass('disabled');
                };

                if (startDateMonth == endDateMonth) {
                    if (i + 1 < restrict) {
                        $(cell).removeClass('highlighted');
                        $(cell).addClass('disabled');
                    }
                }
            }
        };

        highlightDates();
    };

    var dateOnload = function() {
        // Check for which dates are set or go to default
        if (Session.get('date')) {
            var dateObj = Session.get('date');
            var startDate = dateObj.startDate;
            var endDate = dateObj.endDate;

        } else {
            var startDate = moment().subtract(7, 'days').toDate();
            var endDate = moment().toDate();

            Session.set('date', {
                startDate: startDate,
                endDate: endDate
            });
        }

        $('#first-cal').datepicker('update', moment(startDate).format('MM-DD-YYYY'));
        $('#second-cal').datepicker('update', moment(endDate).format('MM-DD-YYYY'));
        $('.dropdown-toggle-date-chooser').text(moment(startDate).format('MMM D, YYYY') + ' - ' + moment(endDate).format('MMM D, YYYY'));


        restrictDates();
    };

    var changeDate = function(startDate, endDate) {
        //make sure isn't called twice hack
        if ((new Date() - Session.get('lastUpdate')) < 500) {
            return
        }

        if (!startDate && !endDate) {
            startDate = moment($('#first-cal').datepicker("getDate")).toDate();
            endDate = moment($('#second-cal').datepicker("getDate")).toDate();
        };

        $('#first-cal').datepicker({
            endDate: endDate
        });
        var date = {
            startDate: startDate,
            endDate: endDate
        };

        var start = moment(startDate).format('YYYYMMDD');
        var end = moment(endDate).format('YYYYMMDD');
        var sessionStart = moment(Session.get('date').startDate).format('YYYYMMDD');
        var sessionEnd = moment(Session.get('date').endDate).format('YYYYMMDD');

        if (start !== sessionStart || end !== sessionEnd) {
            Session.set('activeDate', null);
        };

        Session.set('lastUpdate', new Date());
        Session.set('date', date);
        dateOnload();

    };

    // Pre-set Dates
    $('.lifetime').click(function() {
        var startDate = moment('2000 01 01', 'YYYY MM DD').toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'lifetime');


        changeDate(startDate, endDate);
    });
    $('.yesterday').click(function() {
        var startDate = moment().subtract(1, 'days').toDate();
        var endDate = moment().subtract(1, 'days').toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'yesterday');

        changeDate(startDate, endDate);
    });
    $('.last-14').click(function() {
        var startDate = moment().subtract(14, 'days').toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'last-14');

        changeDate(startDate, endDate);
    });
    $('.this-month').click(function() {
        var startDate = moment(1, "DD").toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'this-month');

        changeDate(startDate, endDate);
    });
    $('.today').click(function() {
        var startDate = moment().toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });


        Session.set('activeDate', 'today');

        changeDate(startDate, endDate);
    });
    $('.last-7').click(function() {
        var startDate = moment().subtract(7, 'days').toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'last-7');

        changeDate(startDate, endDate);
    });
    $('.last-30').click(function() {
        var startDate = moment().subtract(30, 'days').toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'last-30');

        changeDate(startDate, endDate);
    });
    $('.this-year').click(function() {
        var startDate = moment(1, "MM").toDate();
        var endDate = moment().toDate();
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });

        Session.set('activeDate', 'this-year');
        changeDate(startDate, endDate);
    });

    // // Initiate dates onload
    dateOnload();
};
