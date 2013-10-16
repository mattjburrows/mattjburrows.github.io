(function($, App){

	var feed = function(){

		};

	var fetch = function(){

		};

	var parse = function(){

		}

	App.Models = function(){
		return {
			feed: feed,
			fetch: fetch,
			parse: parse
		};
	};

	App.prototype.Feed = function(obj){
		var self = this,
			model = Backbone.Model.extend({
				defaults: {
					id: null,
					markup: null
				},
				initialize: function(){
					console.log(this);
				}
			});
		return new model(obj);
	};

	App.prototype.fetchTweets = function(){
		var self = this;
        twitterFetcher.fetch('365468321375744001', '', 3, true, true, true, '', false, function(tweets){
        	self.parseTweets(tweets);
        });
	};

	App.prototype.parseTweets = function(tweets){
		var self = this,
			max  = tweets.length;
		for(var i = 0; i < max; i += 1){
			var model = self.Feed(tweets[i]);
		}
	};

})(jQuery, App);