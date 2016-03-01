POPOVER_BODY_PADDING = 6;

IosPopover = {
    show: function({id, direction = 'bottom', template, data, button, classes, onHide}) {
        this.template = Template.iosPopover;

        let wrapData = {
          id,
          template,
          data
        }

        this.view = Blaze.renderWithData(this.template, wrapData, document.body);
        this.onHide = onHide;

        var $backdrop = $(this.view.firstNode());
        var $popover = $backdrop.find('.ios-popover');
        var $button = $(button);
        var $arrow = $backdrop.find('.ios-popover-arrow');

        var bodyWidth = $(window).width();
        var bodyHeight = $(window).innerHeight();
        var buttonRect = $button.get(0).getBoundingClientRect();
        var buttonPosition = $button.offset();
        var buttonWidth = $button.outerWidth();
        var buttonHeight = $button.outerHeight();
        var popoverWidth = $popover.outerWidth();
        var popoverHeight = $popover.outerHeight();
       
        var popoverCSS = {
            marginLeft: '0',
            marginRight: '0',
            opacity: 1,
            left: buttonPosition.left + buttonWidth / 2 - popoverWidth / 2
        };

        if(classes){
        	$popover.addClass(classes);
        	$backdrop.addClass(classes);
        }

        popoverCSS = _setPopoverCSS();

        $backdrop.addClass('active');

        $popover.css(popoverCSS);

        function _setPopoverCSS(){
          let directionVertical = direction === 'top' || direction === 'bottom';
          if(directionVertical){
            _calculateVerticalCSS();
          }else{
            _calculateHorizontalCSS();
          }

          $popover.addClass(`ios-popover-${direction}`);

          if(directionVertical){
            $arrow.css({
                left: buttonPosition.left + buttonWidth / 2 - $arrow.outerWidth() / 2 - popoverCSS.left + 'px'
            });
          }else{
            let position = _calculateArrowHorizontal();
            $arrow.css({
                left: position.left + 'px',
                top: position.top + 'px',
            });
          } 
          return popoverCSS;
        }

        function _calculateHorizontalCSS(){
          if(direction === 'right'){
            popoverCSS.left = buttonRect.right + $arrow.outerWidth()/2;
          }else{
            popoverCSS.left = buttonRect.left - popoverWidth - $arrow.outerWidth()/2;
          }

          let targetTop = buttonPosition.top + buttonHeight/2 - popoverHeight /2;
          if (targetTop < 0 || buttonPosition.top + popoverHeight/2 + buttonHeight/2> bodyHeight) {
              console.log('exceed body');
              popoverCSS.top = targetTop < 0 ? POPOVER_BODY_PADDING : bodyHeight - popoverHeight - POPOVER_BODY_PADDING;
          } else {
              popoverCSS.top = targetTop;
          }
        }

        function _calculateArrowHorizontal(){
          let position = {};
          if(direction === 'right'){
            position.left = $arrow.outerWidth() * -1 + POPOVER_BODY_PADDING;
          }else{
            position.left = popoverWidth - $arrow.outerWidth()/2 + POPOVER_BODY_PADDING;
          }
          position.top = buttonPosition.top - popoverCSS.top + buttonHeight/ 2 - $arrow.outerHeight() / 2;  

          return position;
        }

        function _calculateVerticalCSS(){
          if (popoverCSS.left < POPOVER_BODY_PADDING) {
              popoverCSS.left = POPOVER_BODY_PADDING;
          } else if (popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
              popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
          }

          if (buttonPosition.top + buttonHeight + popoverHeight > bodyHeight) {
              popoverCSS.top = buttonPosition.top - popoverHeight;
              $popover.addClass('ios-popover-bottom');
          } else {
              popoverCSS.top = buttonPosition.top + buttonHeight;
              $popover.removeClass('ios-popover-bottom');
          }
        }
    },

    hide: function() {
        if (typeof this.view !== 'undefined' && this.view) {
            var $backdrop = $(this.view.firstNode());
            $backdrop.removeClass('active');

            var $popover = $backdrop.find('.ios-popover');
            $popover.css({opacity: 0});

            if(this.onHide){
              this.onHide();
              this.onHide = null;
            }

            Blaze.remove(this.view);
            this.view = null;
        }
    }
};

Template.iosPopover.rendered = function() {
    $(window).on('keyup.iosPopover', function(event) {
        if (event.which == 27) {
            IosPopover.hide();
        }
    });
};

Template.iosPopover.destroyed = function() {
    $(window).off('keyup.iosPopover');
};

Template.iosPopover.events({
    // Handle clicking the backdrop
    'click': function(event, template) {
        if ($(event.target).hasClass('ios-popover-backdrop')) {
            IosPopover.hide();
        }
    }
});
