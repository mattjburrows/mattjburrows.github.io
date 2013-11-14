(function($, App){

    App.prototype.baseView = function(opts) {
        var self = this,
            $sections = $('.faux-table'),
            view = Backbone.View.extend({
                el: $('body'),
                template: $('#faux-table').html(),
                render: function() {
                    var self = this,
                        tmpl = _.template(this.template, {
                            id: self.opts.identifier
                        });
                    $sections.eq($sections.length - 1).after(tmpl);
                },
                initialize: function(opts) {
                    this.opts = opts;
                    this.render();
                }
            });
        return new view(opts);
    };

    App.prototype.twitterView = function(opts) {
        var self = this,
            type = opts.type ? opts.type : false,
            order = opts.order ? opts.order : false,
            model = opts.model ? opts.model : false,
            view = Backbone.View.extend({
                el: $('#' + opts.type),
                template: $('#faux-table-cell').html(),
                addListener: function(elem) {
                    var animationend = self.CSSListeners()._init({
                            type: 'animation',
                            prefixes: {
                                'WebkitAnimation': 'webkitAnimationEnd',
                                'OAnimation': 'oanimationend',
                                'MsAnimation': 'MSAnimationEnd',
                                'animation': 'animationend'
                            }
                        });
                    animationend.addEvent(elem, function() {
                        console.log('animationend');
                    });
                },
                render: function() {
                    var self = this,
                        tmpl = _.template(this.template, {
                            markup: self.model.get('markup'),
                            order: order || 0
                        });
                    this.$el.append(tmpl);
                    this.addListener(tmpl);
                },
                initialize: function(opts) {
                    var self = this;
                    this.render();
                }
            });
        if(model) {
            return new view({
                model: model
            });
        }
    };

})(jQuery, App);