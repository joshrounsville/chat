var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  next();
}

mongoose.connect('mongodb://projectUser:aUhainTIssIcBql@ds031741.mongolab.com:31741/db_test');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var port = process.env.PORT || 5000;


var ChatSchema = new Schema({
  user: String,
  comments: {
    comment: { content: String }
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

var Chat = mongoose.model('Chat', ChatSchema);;


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();


// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

//  test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});



// more routes for our API will happen here
router.route('/api/chats')

  // create a chat (accessed at POST http://localhost:8080/api/chats)
  .post(function(req, res) {

    var chat = new Chat();  // create a new instance of the chat model
    chat.user = req.body.user;
    chat.updated = req.body.updated;

    // save the chat and check for errors
    chat.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'chat created!' });
      }
    });
  })

  .get(function(req, res) {
    Chat.find(function(err, chats) {
      if (err) {
        res.send(err);
      } else {
        res.json(chats);
      }
    });
  });


router.route('/api/chats/:chat_id')

  // get the chat with that id (accessed at GET http://localhost:8080/api/chats/:chat_id)
  .get(function(req, res) {
    Chat.findById(req.params.chat_id, function(err, chat) {
      if (err) {
        res.send(err);
      } else {
        res.json(chat);
      }
    });
  })

  // create a comment (accessed at POST http://localhost:8080/api/chats/:chat_id)
  .post(function(req, res) {

    var chat = new Chat();  // create a new instance of the chat model
    chat.comment = req.body.comment;

    // save the chat and check for errors
    chat.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'comment created!' });
      }
    });
  })

  .put(function(req, res) {
    // use our chat model to find the chat we want
    Chat.findById(req.params.chat_id, function(err, chat) {
      if (err) {
        res.send(err);
      } else {
        chat.comment = req.body.comment;  // update the chat info
      }

      // save the chat
      chat.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: 'Chat updated!' });
        }

      });

    });
  })

  .delete(function(req, res) {
    Chat.remove({
      _id: req.params.chat_id
    }, function(err, chat) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });




// REGISTER OUR ROUTES -------------------------------

app.use('/', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);