define (require) ->
  JsonGCS = require('json-gcs')

  describe 'JsonGCS', ->
    mocks = {}
    instance = null

    beforeEach ->
      mocks.http = {}
      mocks.authenticator = {
        token: -> 'stub'
      }
      mocks.http = {}

      instance = JsonGCS(
        http: mocks.http
        authenticator: mocks.authenticator
        bucketName: 'my-bucket'
      )

    context 'get', ->

      it 'makes an ajax http get request', ->
        requestURL = 'request url'
        requestOptions = 'request options'
        requestResponse = 'response'

        mocks.authenticator.token = -> '1234-oauth-token'

        mocks.response = '{"very-important":"data"}'

        mocks.http.ajax = (url, opts) ->
          requestURL = url
          requestOptions = opts
          opts.success(mocks.response)

        mocks.httpSuccessHandler = (json) ->
          requestResponse = json

        instance.get('my-object-name', mocks.httpSuccessHandler)

        expect(requestURL).to.eq('https://storage.googleapis.com/my-bucket/my-object-name')
        expect(requestOptions.headers['Authorization']).to.eq('Bearer 1234-oauth-token')
        expect(requestResponse).to.deep.eq(JSON.parse(mocks.response))

    context 'put', ->

      it 'makes an ajax http post request with the data to be saved', ->
        requestURL = 'request url'
        requestOptions = 'request options'
        requestResponse = 'response'

        mocks.authenticator.token = -> '4321-oauth-token'

        mocks.userData = {
          name: 'Carlos'
          points: 12
        }

        mocks.http.ajax = (url, opts) ->
          requestURL = url
          requestOptions = opts

        instance.put('my-profile', mocks.userData)

        expect(requestURL).to.eq('https://www.googleapis.com/upload/storage/v1/b/my-bucket/o?uploadType=media&name=my-profile')
        expect(requestOptions.method).to.eq('POST')
        expect(requestOptions.headers['Authorization']).to.eq('Bearer 4321-oauth-token')
        expect(requestOptions.data).to.eq(JSON.stringify(mocks.userData))
