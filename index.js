module.exports = class Fetch22 {
  constructor({ baseUrl, fetch }) {
    if (baseUrl === undefined) throw new Error('Missing baseUrl')
    if (!fetch) throw new Error('Missing fetch')
    this._baseUrl = baseUrl
    this._fetch = fetch
  }

  async post(path, bodyObject) {
    const url = this._url(path)
    let contentType, body
    if (!bodyObject || typeof bodyObject === 'string') {
      contentType = 'text/plain'
      body = bodyObject || ''
    } else {
      contentType = 'application/json'
      body = JSON.stringify(bodyObject)
    }

    const headers = {
      'Content-Type': contentType,
      'Accept': 'application/json'
    }
    const res = await this._fetch(url, {
      method: 'post',
      headers,
      body
    })
    if (res.status !== 201)
      throw new Error(`POST ${url} - ${res.status}: ${await res.text()}`)
  }

  async get(path) {
    const url = this._url(path)
    const res = await this._fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    if (res.status !== 200)
      throw new Error(`GET ${url} - ${res.status}: ${await res.text()}`)
    return res.json()
  }

  _url(path) {
    const baseUrl = (typeof this._baseUrl === 'function') ? this._baseUrl() : this._baseUrl
    return `${baseUrl}${path}`
  }
}
