

//// Global App View

App.Views.App = Backbone.View.extend({
  initialize: function() {
    var addChatView = new App.Views.AddChat({ collection: App.chats });

    var allChatsView = new App.Views.Chats({ collection: App.chats }).render();
    $('#chatWrapper').append(allChatsView.el);
  }
});





//// Add Chat View

App.Views.AddChat = Backbone.View.extend({
  el: '#addChat',

  initialize: function() {
    this.comment = $('#comment')
  },

  events: {
    'submit': 'addChat'
  },

  addChat: function(e) {
    e.preventDefault();

    var newChat = this.collection.create({
      comment: this.comment.val()
    }, { wait: true });

    this.clearForm();

  },

  clearForm: function() {
    this.comment.val('');
  }
});






//// All Chat View

App.Views.Chats = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.collection.on('sync', this.addOne, this);
  },

  render: function() {
    this.collection.each( this.addOne, this );
    return this;
  },

  addOne: function(chat) {
    var chatView = new App.Views.Chat({ model: chat });
    this.$el.append( chatView.render().el );
    this.$el.scrollTop(100);
  }

});







//// Single Chat View

App.Views.Chat = Backbone.View.extend({
  tagName: 'li',

  template: template('chatTemplate'),

  render: function() {
    this.$el.addClass('chat-bubble');
    this.$el.html( this.template( this.model.toJSON() )  );
    return this;
  }

});

