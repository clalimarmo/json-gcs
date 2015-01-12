# json-gcs

Store and retrieve json documents to and from Google Cloud Storage.

## Usage

Require the module, and create a Storage instance, passing in an authenticator
object, and the name of the bucket where your documents should be stored.

The authenticator object should have a `token` method that returns a
Google OAuth2 token, which grants the necessary permissions to the named
bucket.

    JsonGCS = require('json-gcs');
    $ = require('jquery');

    var datastore = JsonGCS.Storage({
      http: {
        ajax: $.ajax
      },
      authenticator: {
        token: function() { return userOAuth2Token; },
      },
      bucketName: "myBucket",
    });

### Using the File helper

Instantiate the File helper, passing in the Storage instance you just created.

    var datastoreFile = JsonGCS.File({datastore: datastore});

Fetch an index of the bucket:

    datastoreFile.dir({
      success: function() {
        //do something with index
      },
      error: function() {
        //handle error
      }
    });

Save (or overwrite) a file with data:

    datastoreFile.init('new_file', {some: 'json-data'}, {
      success: function() {
        //do something extra
      },
      error: function() {
        //handle error
      },
    });

Read a file from the datastore, into the file:

    datastoreFile.open('my_file', {
      success: function(data) {
        //do something extra with data
      },
      error: function() {
        //handle error
      },
    });

    datastoreFile.data() // => contents of myBucket/my_file

Save to currently open file:

    datastoreFile.save(updatedData, {
      success: function() {
        //do something extra on success
      },
      error: function() {
        //handle error
      },
    });

Get current filename:

    datastoreFile.filename();

Get current data:

    datastoreFile.data();

### Directly accessing the object storage API

    cloudStore.put(objectName, jsonDocument);

    cloudStore.get(objectName, {
      success: function(retrievedDocument) {
        //do something with retrieved json document
      },
      error: function(jqXHR, status, errorThrown) {
        //do something about error
      }
    });

## Notes

The module is provided as an AMD module, with simplified CommonJS wrapping.
It's compatible with RequireJS, I haven't tried it in other contexts.

So that there isn't a package dependency on jquery, we pass it into the
initialization function. We only use the `ajax` method of jquery, so if you
don't already use jquery, and don't want to introduce it to your project you
can provide your own http adapter, as long as the `ajax` method matches
jquery's signature and behavior. (This also simplifies testing).

Also note: while we assume that `http.ajax` will match the jquery method's
signature, the success and error callbacks can be passed whatever you want, as
long as your callbacks agree with your implementation of the ajax method.

## Development

To run the tests:

    grunt

To build the dist package:

    grunt build:dist
