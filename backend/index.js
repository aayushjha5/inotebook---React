const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 6000

// app.get('/', (req, res) => {
//   res.send('Hello aayush jha!')
// })
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})


