Package.describe({
    name: 'nerdmed:ios-popover',
    version: '0.1.2',
    summary: 'A simple ios style popover',
    git: 'https://github.com/nerdmed/ios-popover.git'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use(['ecmascript', 'templating'],'client');
    api.use('less');
    api.addFiles(['popover.html', 'popover.es6.js', 'popover.less'], 'client');
    api.export('IosPopover', 'client');
});
