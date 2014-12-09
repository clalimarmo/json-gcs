# json-gcs

Store and retrieve json documents to and from Google Cloud Storage.

## Usage

Require the module, and create an instance, passing in an authenticator
object, and the name of the bucket where your documents should be stored.

The authenticator object should have a `token` method that returns a
Google OAuth2 token, which grants the necessary permissions to the named
bucket.

    JsonGCS = require('json-gcs');

    var cloudStore = JsonGCS({
      authenticator: {
        token: function() { return userOAuth2Token; },
      }
      bucketName: "myBucket"
    });

    cloudStore.put(objectName, jsonDocument);

    cloudStore.get(objectName, function(retrievedDocument) {
      //do something with retrieved json document
    });

## Dependencies

The only dependency at the moment is jQuery, whose `ajax` method is used to
send request to the Google Cloud Storage JSON API.

At some point this dependency might be removed. Until then, the module
expects to be able to `require('jquery')`.

## Notes

The module is provided as an AMD module, with simplified CommonJS wrapping.
It's compatible with RequireJS, I haven't tried it in other contexts.
