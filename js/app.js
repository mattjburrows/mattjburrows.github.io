(function($, App){

    App.prototype._config = {
        reposUrl: 'https://api.github.com/users/mattjburrows/repos?callback=?',
        perPage: '&per_page=100'
    };

	App.prototype.init = function(){
		this.fetchTweets();
        this.fetchRepositories();
		return this;
	};

	var app = new App().init();

	console.log(app);

})(jQuery, App);