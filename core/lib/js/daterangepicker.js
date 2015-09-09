Handlebars.registerHelper("activeDate", function(date) {
    return Session.equals("activeDate", date) ? "active-date" : "";
});

Template.daterangepicker.rendered = function() {
    // initiate calendars
    $('#first-cal').datepicker({
        endDate: new moment().format('MM-DD-YYYY'),
        todayHighlight: true
    }).on('changeDate', function(ev) {
        updateLowerDate();
        restrictDates();
    }).click(function(e) {
        e.stopPropagation();
    });
    $('#second-cal').datepicker({
        endDate: new moment().format('MM-DD-YYYY'),
        todayHighlight: true
    }).on('changeDate', function(ev) {
        updateLowerDate();
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
            var startDateMonth = new moment($('#first-cal').datepicker("getDate")).format('YYYYMM');
            var endDateMonth = new moment($('#second-cal').datepicker("getDate")).format('YYYYMM');

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
            var startDate = new moment(dateObj.startDate).format('MMM D, YYYY');
            var endDate = new moment(dateObj.endDate).format('MMM D, YYYY');
            var startDateBottom = new moment(dateObj.startDate).format('MMMM D, YYYY');
            var endDateBottom = new moment(dateObj.endDate).format('MMMM D, YYYY');
            var startDateCal = new moment(dateObj.startDate).format('MM-DD-YYYY');
            var endDateCal = new moment(dateObj.endDate).format('MM-DD-YYYY');

        } else {
            var startDate = new moment().subtract('days', 7).format('MMM D, YYYY');
            var endDate = new moment().format('MMM D, YYYY');
            var startDateBottom = new moment().subtract('days', 7).format('MMMM D, YYYY');
            var endDateBottom = new moment().format('MMMM D, YYYY');
            var startDateCal = new moment().subtract('days', 7).format('MM-DD-YYYY');
            var endDateCal = new moment().format('MM-DD-YYYY');

            Session.set('date', {
                startDate: startDate,
                endDate: endDate
            });
        }

        $('#first-cal').datepicker('update', startDateCal);
        $('#second-cal').datepicker('update', endDateCal);
        $('.dropdown-toggle-date-chooser').text(startDate + ' - ' + endDate);
        $('.calendar-bottom .left p.selected-dates').text(startDateBottom + ' - ' + endDateBottom);

        restrictDates();
    };



    var updateLowerDate = function() {
        var startDate = new moment($('#first-cal').datepicker("getDate")).format('MMMM D, YYYY');
        var endDate = new moment($('#second-cal').datepicker("getDate")).format('MMMM D, YYYY');
        $('.calendar-bottom .left p.selected-dates').text(startDate + ' - ' + endDate);
        restrictDates();
    };

    var changeDate = function() {
        var startDate = new moment($('#first-cal').datepicker("getDate")).format('MM/DD/YYYY');
        var endDate = new moment($('#second-cal').datepicker("getDate")).format('MM/DD/YYYY');
        $('#first-cal').datepicker({
            endDate: endDate
        });
        var date = {
            startDate: startDate,
            endDate: endDate
        };
        if (Session.get('date').startDate !== date.startDate || Session.get('date').endDate !== date.endDate) {
          //active date to null
          Session.set('activeDate', null);
        };
        Session.set('date', date);
        dateOnload();
    };

    // Pre-set Dates
    $('.lifetime').click(function() {
        var startDate = new moment('01-01-2000', 'MM-DD-YYYY').format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'lifetime');
        }, 10);

        dateOnload();
    });
    $('.yesterday').click(function() {
        var startDate = new moment().subtract('days', 1).format('MM/DD/YYYY');
        var endDate = new moment().subtract('days', 1).format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'yesterday');
        }, 10);
        dateOnload();
    });
    $('.last-14').click(function() {
        var startDate = new moment().subtract('days', 14).format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'last-14');
        }, 10);
        dateOnload();
    });
    $('.this-month').click(function() {
        var startDate = new moment(1, "DD").format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'this-month');
        }, 10);
        dateOnload();
    });
    $('.today').click(function() {
        var startDate = new moment().format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'today');
        }, 10);
        dateOnload();
    });
    $('.last-7').click(function() {
        var startDate = new moment().subtract('days', 7).format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'last-7');
        }, 10);
        dateOnload();
    });
    $('.last-30').click(function() {
        var startDate = new moment().subtract('days', 30).format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'last-30');
        }, 10);
        dateOnload();
    });
    $('.this-year').click(function() {
        var startDate = new moment(1, "MM").format('MM/DD/YYYY');
        var endDate = new moment().format('MM/DD/YYYY');
        Session.set('date', {
            startDate: startDate,
            endDate: endDate
        });
        setTimeout(function() {
            Session.set('activeDate', 'this-year');
        }, 10);
        dateOnload();
    });

    // Initiate dates onload
    dateOnload();
};
