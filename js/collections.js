(function($, App){

	App.prototype.FeedCollection = function(obj){
		var self = this,
			collection = Backbone.Collection.extend({
				initialize: function(){
					console.log(this);
				}
			});
		return new collection(obj);
	}

})(jQuery, App);