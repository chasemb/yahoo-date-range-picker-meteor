yahoo-date-range-picker
============
Meteor packaging of eternicode/bootstrap-datepicker with Bootstrap 3 support modified to specs from Yahoo's Gemini Platform Datepicker.

https://gemini.yahoo.com -> reporting page.

This package is MIT Licensed. Do whatever you like with it but any responsibility for doing so is your own.

All rights to eternicode/bootstrap-datepicker are with the original author

![](http://i.imgur.com/Dodz659.png)

Dependencies
============
Bootstrap 3

Example
============
Load datepicker template:
	Ex.

	Left Aligned
		<div class="pull-left">
				{{> daterangepicker}}
		</div>

	Right Aligned
	  <div class="pull-right">
        {{> daterangepicker align='dropdown-menu-right'}}
    </div>

The Datepicker returns a session variable named 'date' with an object containing 'startDate' and 'endDate';
	Ex.
		Session.get('date') ---> {startDate: "08/04/2015", endDate: "09/01/2015"}




