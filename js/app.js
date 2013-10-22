(function($, App){

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

    App.prototype.Config = {
        reposUrl: 'https://api.github.com/users/mattjburrows/repos?callback=?',
        perPage: '&per_page=100'
    };

	App.prototype.init = function(){
		// this.fetchTweets();
        // this.fetchRepositories();
        this.setUpUser();
		return this;
	};

	var app = new App().init();

})(jQuery, App);