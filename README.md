# Fetch-22

GET and POST JSON with less code and more convention.

First, instantiate it:

```javascript
const fetch = window.fetch.bind(window) // require('node-fetch')
const baseUrl = 'http://localhost:9988'
const fetch22 = new Fetch22({ baseUrl, fetch })
```

Second, use it:

```javascript
// GET
const obj = await fetch22.get('/foo')

// POST
await fetch22.post('/foo', { bar: 'zap' })
```

`get` throws an error when the response isn't 200. `post` throws an error when the response isn't 201.
The error contains the response body as text as well as the actual status code.

That's what we need 22% of the time. For the remaining 78% of cases, don't use Fetch-22.