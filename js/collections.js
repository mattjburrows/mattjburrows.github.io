(function($, App){

	App.prototype.BuildCollection = function(obj){
		var self = this,
			collection = Backbone.Collection.extend({
				initialize: function(opts) {
					this.opts = opts;
                    if('function' === typeof this.opts.callback) {
                        this.opts.callback(this);
                    }
				}
			});
		return new collection(obj);
	};

})(jQuery, App);