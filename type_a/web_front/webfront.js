'use strict';

(async () => {

  const express = require('express')
  const serveIndex = require('serve-index')
  const router = express.Router()
  const morgan = require('morgan')
  const fetch = require('node-fetch')

  const config = {
    api_server: {
      hostname: process.env.API_SERVER_HOSTNAME || '127.0.0.1',
      protocol: process.env.API_SERVER_PROTOCOL || 'http',
      port: process.env.API_SERVER_PORT || 8081,
      full: process.env.API_SERVER || 'http://127.0.0.1:8081'
    }
  }
  const API_SERVER = config.api_server.full
  //const API_SERVER = `${config.api_server.protocol}://${config.api_server.hostname}:${config.api_server.port}`

  // Constants
  const PORT = 8080
  const HOST = '0.0.0.0'

  // App
  const app = express()
  app.use(morgan('combined'))
  app.disable('x-powered-by')
  router.use((req, res, next) => {
    next()
  })

  // Static
  const static_file_dir = 'static'
  const static_path = '/'
  const index_file = 'index.html' // { false, 'index.html' }
  app.use(static_path, router)
  router.get('*', express.static( static_file_dir, { index: index_file } ))
  router.get('*', serveIndex( static_file_dir, {
    icons: true,
    view: 'details'
  }))

  // API
  const base_api_path = '/api/v1'
  app.use(base_api_path, router)
  router.use(base_api_path, (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    next()
  })

  router.get('/getjson/:path', async (req, res) => {
    fetch(`${API_SERVER}/api/v1/${req.params.path}`)
      .then( response => response.json() )
      .then( json => {
        res.send(json)
      })
  })

  router.get('/getjson/echo/:message', async (req, res) => {
    fetch(`${API_SERVER}/api/v1/echo/${req.params.message}`)
      .then( response => response.json() )
      .then( json => {
        res.send(json)
      })
  })

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)

})()

