// Description:
//   A way to interact with the Imgur API.
//
// Configuration:
//   BROBBOT_IMGUR_CLIENT_ID - the client ID to pass to imgur

var CLIENT_ID = process.env.BROBBOT_IMGUR_CLIENT_ID;

module.exports = function(robot) {
  robot.helpCommand("brobbot image [me] `query`", "Searches Imgur for `query` and returns 1st result's URL.");
  robot.helpCommand("brobbot animate [me] `query`", "Searches Imgur for `query` and tries to return the first animated GIF result.");

  robot.respond(/^(image|img)( me)? (.*)/i, function(msg) {
    imageMe(msg, msg.match[3], false, function(url) {
      msg.send(url);
    });
  });

  robot.respond(/^animate( me)? (.*)/i, function(msg) {
    imageMe(msg, msg.match[2], true, function(url) {
      msg.send(url);
    });
  });
};

function imageMe(msg, query, animated, cb) {
  var q = {
    q: query
  };

  msg.http('https://api.imgur.com/3/gallery/search')
    .query(q)
    .header('Authorization', 'Client-ID ' + CLIENT_ID)
    .get()(function(err, res, body) {
      var images = JSON.parse(body);
      console.log('got data', images);
      images = images.responseData ? images.responseData.results : null;

      if (images && images.length > 0) {
        image = msg.random(images);
        cb(ensureImageExtension(image.unescapedUrl));
      }
    });
}

function ensureImageExtension(url) {
  var ext = url.split('.').pop();
  if (/(png|jpe?g|gif)/i.test(ext)) {
    return url;
  }
  else {
    return url + "#.png";
  }
}
