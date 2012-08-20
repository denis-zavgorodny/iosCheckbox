/*
*   iOS стайл переключатель 
*   на основе стандартного checkbox

*
*   by Denis Zavgorodny
*   zavgorodny@alterego.biz.ua
*
*/ 
(function($){
    $.fn.iosCheckbox = function(options) {
        
            
        var init = function(element){
            var initState = element.checked;
            var element = $(element);
            element.wrap('<span class="iosCheckbox '+options.classWrapper+(initState?' '+options.checkedClass:'')+'" />');
            var rootElement = element.closest('.iosCheckbox');
            rootElement.append('<a href="#" class="iosCheckbox-slider"></a>');
            var sliderElement = rootElement.find('.iosCheckbox-slider');
            var rootWidth = rootElement.width();
            var elementWidth = sliderElement.width();
            var centerCoordX = (rootWidth - elementWidth) * 0.5;
            element.on('change.iosCheckbox', function(){
                if (this.checked) {
                    rootElement.addClass(options.checkedClass);
                    sliderElement.animate({
                        left: (rootWidth - elementWidth)
                    }, 200);
                } else {
                    rootElement.removeClass(options.checkedClass);
                    sliderElement.animate({
                        left: 0
                    }, 200);
                }
                options.change(this.checked);   
            });
            sliderElement.draggable({
                axis: "x",
                containment: "parent",
                stop: function(event, ui) {
                    if (ui.position.left > centerCoordX)
                        element.get(0).checked = 1;
                    else
                        element.get(0).checked = 0;
                    element.trigger('change');    
                }
            });
            sliderElement.on('click.iosCheckbox', function(){
                if (element.get(0).checked) {
                    element.get(0).checked = 0;
                } else {
                    element.get(0).checked = 1;
                }
                element.trigger('change');
                return false;  
            });
        };
        var destroy = function(element) {
            var element = $(element);
            var wrapper = element.closest('.iosCheckbox');
            wrapper.find('a').off('click.iosCheckbox').remove();
            element.off('change.iosCheckbox');
            if (element.parent('.iosCheckbox').length)
                element.unwrap();
            
        };

        var action = {
            destroy: function(element) {destroy(element)}
        };
        if (typeof options == 'object' || typeof options == 'undefined')
            var options = $.extend({
                classWrapper: 'ios',
                checkedClass: 'checked',
                change: function (state) {}
            },options);
        else
            return this.each(function(){
                action[options](this);
            });
        
        return this.each(function(){
            init(this);
        });
    };
})(jQuery);        
