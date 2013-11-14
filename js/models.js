(function($, App){

    /*
     * @name App.Storage
     * Get, Set and Delete LocalStorage API methods.
     */
    var Storage = window.Storage = {
        /*
         * @name _getData
         * Run a check to see whether the value is a string.
         * If it is convert it to an key => value object using JSON.parse.
         */
        _getData: function(key) {
            var value = localStorage[key] || false;
            if (value) {
                if (typeof value === 'string') {
                    return value;
                } else {
                    return JSON.parse(value);
                }
            }
            return false;
        },
        /*
         * @name _setData
         * Run a check to see whether the value is a string.
         * If not convert it to a string using JSON.stringify.
         */
        _setData: function(key, value) {
            if (typeof value !== 'string') {
                var value = JSON.stringify(value);
            }
            localStorage[key] = value;
        },
        /*
         * @name _deleteData
         * Delete the localStorage data.
         */
        _deleteData: function(key) {
            delete localStorage[key];
            return key + ' has been deleted.';
        }
    };

    App.prototype.UserModel = function(obj) {
        var self = this,
            $userName = $('#user-name'),
            $userNavigation = $('#user-navigation')
            model = Backbone.Model.extend({
                updateUserName: function(e) {
                    var name = this.get('name');
                    Storage._setData('userName', name);
                    $userName.html(name);
                },
                showUserNavigation: function(e) {
                    $userNavigation.toggleClass('is-invisible', 'is-visible');
                },
                defaults: {
                    name: 'User'
                },
                initialize: function() {
                    this
                        .once('change:name', this.showUserNavigation, this)
                        .on('change:name', this.updateUserName, this);
                }
            });
        return new model(obj);
    }

    App.prototype.FeedModel = function(obj) {
        var self = this,
            model = Backbone.Model.extend({
                defaults: {
                    id: null,
                    markup: null,
                    type: null
                },
                initialize: function() {
                    console.log('Feed model: ', this);
                }
            });
        return new model(obj);
    };

    App.prototype.fetchFeed = function(feed, fn) {
        var self = this;
        if('twitter' === feed) {
            this.fetchTweets();
        }
        if('github' === feed) {
            this.fetchRepositories();
        }
    };

    App.prototype.fetchTweets = function() {
        var self = this;
        twitterFetcher.fetch('365468321375744001', '', 3, true, false, true, '', false, function(tweets){
            self.parseTweets(tweets);
        });
    };

    App.prototype.parseTweets = function(tweets) {
        var self = this,
            max  = tweets.length;
        for(var i = 0; i < max; i += 1){
            var tweet = tweets[i];
            tweet.type = 'twitter';
            var model = self.FeedModel(tweet);
            this.feedCollection.add(model);
        }
    };

    App.prototype.fetchRepositories = function() {
        var self = this,
            uri  = this.Config.reposUrl + this.Config.perPage;
        $.getJSON(uri, function(results) {
            console.log(results)
        });
    };

    App.prototype.parseRepository = function(repos) {
        var self = this,
            max = repos.length;
        for(var i = 0; i < max; i += 1) {
            
        }
    };

})(jQuery, App);