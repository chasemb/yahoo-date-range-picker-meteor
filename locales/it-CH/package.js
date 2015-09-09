Package.describe({
  name: "rajit:bootstrap3-datepicker-it-ch",
  git: "https://github.com/rajit/bootstrap3-datepicker.git",
  summary: "Meteor packaging of Italian (Switzerland) translation of eternicode/bootstrap-datepicker",
  version: "1.4.1",
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('jquery', 'client');
    
  api.addFiles('bootstrap-datepicker.it-CH.min.js', 'client');
});
