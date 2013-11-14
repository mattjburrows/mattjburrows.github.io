(function($, App) {

    App.prototype.CSSListeners = {
        addEvent: function(el, cb) {
            var self = this;
            el.addEventListener(this.prefix, cb, false);
        },
        removeEvent: function(el, cb) {
            var self = this;
            el.removeEventListener(this.prefix, cb, false);
        },
        setPrefix: function() {
            var div = document.createElement('div');
            for(prefix in this.prefixes) {
                if(this.prefixes.hasOwnProperty(prefix)) {
                    if (prefix in div.style) {
                        return this.prefixes[prefix];
                    };
                }
            }
        },
        _init: function(opts) {
            var self = this;
            this.opts = opts;
            // By default we shall set up animation end listeners.
            this.type = this.opts.type || 'animation';
            // Set up the prefixes to default to the animation end browser prefixes.
            this.prefixes = this.opts.prefixes || {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oanimationend',
                'MsAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            };
            this.prefix = this.setPrefix();
            return this;
        }
    };

    App.prototype.setUpUser = function() {
        var self = this,
            user = this.UserModel(),
            name = Storage._getData('userName');
        // If the user has already added their name to the site
        // Fetch it and hide the input for now.
        if(name) {
            user.set('name', name);
            $('#user-name-input')
                .parent()
                .addClass('is-hidden');
        }
        // Set an event listener to the input to save the user's name
        // and build a model out of it.
        $(document)
            .on('keyup', '#user-name-input', function(e) {
                var $this = $(this),
                    $val = $this.val();
                user.set('name', $val);
            });
    };

    App.prototype.setListeners = function() {
        var self = this;
        $(document)
            .on('click', '.js-navigation', function(e) {
                var $this = $(this),
                    $data = $this.data();
                if($data.section) {
                    if(!$('#' + $data.section).length){
                        self.fetchFeed($data.section);
                        self.baseView({
                            identifier: $data.section
                        });
                    }
                }
                e.preventDefault();
            });
    };

    App.prototype.Config = {
        github: {
            reposUrl: 'https://api.github.com/users/mattjburrows/repos?callback=?',
            perPage: '&per_page=100'
        }
    };

	App.prototype.init = function() {
        var self = this;
        // Set up the function properties.
        this.timer = false;
        // Run the function methods.
        this.feedCollection = this.BuildCollection({
            callback: function(collection) {
                var i = 0;
                collection.on('add', function(feed) {
                    var type = feed.get('type'),
                        method = type + 'View';
                    if('function' === typeof self[method]) {
                        self[method]({
                            model: feed,
                            type: type,
                            order: i
                        });
                        i++;
                    }
                });
            }
        });
        this.setUpUser();
        this.setListeners();
		return this;
	};

	var app = new App().init();

})(jQuery, App);