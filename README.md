# json-gcs

Store and retrieve json documents to and from Google Cloud Storage.

## Usage

Require the module, and create an instance, passing in an authenticator
object, and the name of the bucket where your documents should be stored.

The authenticator object should have a `token` method that returns a
Google OAuth2 token, which grants the necessary permissions to the named
bucket.

    JsonGCS = require('json-gcs');
    $ = require('jquery');

    var cloudStore = JsonGCS({
      http: {
        ajax: $.ajax
      },
      authenticator: {
        token: function() { return userOAuth2Token; },
      },
      bucketName: "myBucket",
    });

    cloudStore.put(objectName, jsonDocument);

    cloudStore.get(objectName, function(retrievedDocument) {
      //do something with retrieved json document
    });

## Notes

The module is provided as an AMD module, with simplified CommonJS wrapping.
It's compatible with RequireJS, I haven't tried it in other contexts.

So that there isn't a package dependency on jquery, we pass it into the
initialization function. We only use the `ajax` method of jquery, so if
you don't already use jquery, and don't want to introduce it to your project
you can provide your own http adapter, as long as the `ajax` method matches
jquery's signature and behavior. (This also simplifies testing).

## Development

To run the tests:

    grunt

To build the dist package:

    grunt build:dist
