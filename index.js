import users from './routes/user.js'
import express from "express"
import cors from "cors"
const app = express()
const port = 3000

// routes
console.clear()

app.use(cors())

import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: false }))


app.use('/user', users)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})