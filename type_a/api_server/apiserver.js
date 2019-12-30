'use strict';

(async () => {

  const express = require('express')
  const router = express.Router()
  const morgan = require('morgan')

  // Constants
  const PORT = 8081
  const HOST = '0.0.0.0'

  // App
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('combined'))
  app.disable('x-powered-by')
  router.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    next()
  })

  // API
  const base_api_path = '/api/v1'
  app.use(base_api_path, router)
  router.get('/helloworld', (req, res) => {
    let ret = {
      status: true,
      msg: 'Hello World!'
    }
    res.send(ret)
  })

  router.get('/echo/:echoparam', (req, res) => {
    let ret = {
      status: true,
      msg: req.params.echoparam
    }
    res.send(ret)
  })

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)

})()

