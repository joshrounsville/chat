

App.Collections.Chats = Backbone.Collection.extend({
  model: App.Models.Chat,
  url: App.url + 'chats'
});