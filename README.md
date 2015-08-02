# iOS Popover

A simple iOS Popover for your web or hybrid app.
This package will provide a simple popover Template and API to show them.
To run the examples and to get a ready to use solution you should add 

	meteor add nerdmed:ios-listview

It is used for the subview that will get rendered inside the popover.


## Quick Start

	IosPopover.show({
	    id: 'mytest-poppver',
	    button: e.currentTarget,
	    direction: 'right',
	    classes: 'my-class',
	    template: 'iosListView',
	    data: {
	        items: [{
	            title: 'Settings',
	            class: 'settings'
	        }, {
	            title: 'Support & Feedback',
	            class: 'support'
	        }, {
	            title: 'Logout',
	            class: 'logout'
	        }]
	    }
	})


## Your part

Pull requests and further improvements are welcome