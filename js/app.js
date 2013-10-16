(function($, App){

	App.prototype.init = function(){
		this.fetchTweets();
		return this;
	};

	var app = new App().init();

	console.log(app);

})(jQuery, App);