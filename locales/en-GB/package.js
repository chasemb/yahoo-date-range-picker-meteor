Package.describe({
  name: "rajit:bootstrap3-datepicker-en-gb",
  git: "https://github.com/rajit/bootstrap3-datepicker.git",
  summary: "Meteor packaging of British English translation of eternicode/bootstrap-datepicker",
  version: "1.4.1",
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('jquery', 'client');
    
  api.addFiles('bootstrap-datepicker.en-GB.min.js', 'client');
});
