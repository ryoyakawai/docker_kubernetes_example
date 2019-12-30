'use strict';

(async () => {

  const express = require('express')
  const serveIndex = require('serve-index')
  const router = express.Router()
  const morgan = require('morgan')

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
  const index_file = false // { false, 'index.html' }
  app.use(static_path, router)
  router.get('*', express.static( static_file_dir, { index: index_file } ))
  router.get('*', serveIndex( static_file_dir, {
    icons: true,
    view: 'details'
  }))

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)

})()

