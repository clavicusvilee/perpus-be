import user from './routes/user.js'
import buku from './routes/pinjamBuku.js'
import pinjam from './routes/buku.js'
import express from "express"
import cors from "cors"
const app = express()

// routes
console.clear()

app.use(cors())

import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: false }))


app.use('/user', user)
app.use('/buku', buku)
app.use('/pinjam', pinjam)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post

app.listen(() => {
  console.log(`app running at http://localhost:`)
})