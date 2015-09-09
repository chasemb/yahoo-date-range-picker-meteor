Package.describe({
  name: "chasemb:yahoo-date-range-picker",
  summary: "eternicode/bootstrap-datepicker modified to yahoo's gemini date-range picker",
  version: "1.2.0",
  documentation: "README.md",
  git: 'https://github.com/chasemb/yahoo-date-range-picker-meteor'
});

var packages = [
  'fortawesome:fontawesome@4.4.0',
  'mrt:moment@2.8.1'
];


Package.onUse(function (api) {
  api.use(packages);
  api.use('templating')
  api.versionsFrom('0.9.0');
  api.use('jquery', 'client');

  api.addFiles('core/lib/html/daterangepicker.html', 'client');
  api.addFiles('core/lib/js/daterangepicker.js', 'client');
  api.addFiles('core/lib/js/bootstrap-datepicker.js', 'client');
  api.addFiles('core/lib/css/bootstrap-datepicker3.css', 'client');

});
