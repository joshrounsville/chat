

App.Models.Chat = Backbone.Model.extend({

  validate: function(attrs) {
    if ( ! attrs.comment ) {
      return 'A comment is required';
    }
  }

});