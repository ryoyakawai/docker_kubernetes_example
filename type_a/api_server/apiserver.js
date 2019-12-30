'use strict';

(async () => {

  const express = require('express')
  const router = express.Router()
  const morgan = require('morgan')

  // Constants
  const PORT = 8081
  const HOST = '0.0.0.0'

  // db
  const mysql = require('mysql')
  const config = {
    db_server: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DATABASE_NAME || 'docker_kubernetes_example_type_a',
      user: process.env.DATABASE_USER || 'type_a',
      password: process.env.DATABASE_PASSWD || 'abcde12345',
    }
  }
  const connection = mysql.createConnection(config.db_server)

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
  router.get('/helloworld', async (req, res) => {
    let out = await getDataFromDB()
    let ret = {
      status: true,
      msg: {
        text: 'Hello World!',
        db: out
      }
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

  async function getDataFromDB() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM message_docker_example', (err, results) => {
        if(err) {
          return reject({success: false, message: 'An error occured getting the users: ' + err});
        }
        let ret_data = (results || []).map( (item) => {
          return {
            id: item.message_id,
            message: item.message,
            created_date: item.created_date,
            updated_date: item.updated_date
          }
        })
        return resolve({success: true, data: ret_data})
      })
    })
  }

})()

