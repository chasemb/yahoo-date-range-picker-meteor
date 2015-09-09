bootstrap3-datepicker-fi
============

Meteor packaging of Finnish translation of eternicode/bootstrap-datepicker

This package is MIT Licensed. Do whatever you like with it but any responsibility for doing so is your own.

All rights to eternicode/bootstrap-datepicker are with the original author

Example
============
In your handlebars template:

    <input type="text" class="form-control" id="my-datepicker">

In client-side JS code:

    Template.mytemplate.rendered=function() {
    	$('#my-datepicker').datepicker({
        language: 'fi'
      });
    }

See http://eternicode.github.io/bootstrap-datepicker/ for more
