# json-gcs

Store and retrieve json documents to and from Google Cloud Storage.

    var cloudStore = new jsonGCS({
      authenticator: {
        token: function() { return userOAuth2Token; },
      }
      bucketName: "myBucket"
    });

    cloudStore.put(objectName, jsonDocument);

    cloudStore.get(objectName, function(retrievedDocument) {
      //do something with retrieved json document
    });
