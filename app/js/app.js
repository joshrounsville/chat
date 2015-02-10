(function() {

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {},
    url: 'https://aqueous-lake-9398.herokuapp.com/api/'
  };

  window.vent = _.extend({}, Backbone.events);

  window.template = function(id) {
    return _.template( $('#' + id).html() );
  };


})();