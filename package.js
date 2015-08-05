Package.describe({
    name: 'nerdmed:ios-popover',
    version: '0.0.3',

    // Brief, one-line summary of the package.
    summary: 'A simple ios style popover',

    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/nerdmed/ios-popover.git',

    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['grigio:babel@0.1.6', 'templating'],'client');
    api.use('less');
    api.addFiles(['popover.html', 'popover.es6.js', 'popover.less'], 'client');
    api.export('IosPopover', 'client');
});
