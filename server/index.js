const cors = require("cors")
const express = require("express")
const cons = {
  PORT: 3000,
}

const app = express()

app.use(cors())
app.use(express.json())

//* our db
// const messages = []

// app.post("/messages", (req, res, next) => {
//   const newMessage = {
//     id: Date.now().toString(32),
//     text: req.body.message,
//     timestamp: Date.now(),
//   }
//   messages.push(newMessage)
//   res.json(newMessage)
// })

// app.get("/messages", (req, res, next) => {
//   //! short pollong
//   res.json(messages)
//   //! long pollong
//   // setTimeout(() => res.json(messages), 5000)
// })

const subscribers = {}

app.get("/subscribe", (req, res, next) => {
  const ID = Math.ceil(Math.random() * 10000000000)
  subscribers[ID] = res
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  })
})

app.post("/messages", (req, res, next) => {
  const newMessage = {
    id: Date.now().toString(32),
    text: req.body.message,
    timestamp: Date.now(),
  }
  Object.entries(subscribers).forEach(([ID, s]) => {
    s.write(`data: ${JSON.stringify(newMessage)}\n\n`)
  })
})

app.listen(cons.PORT, () => {
  console.info(`Server is up and running http://localhost:${cons.PORT}`)
})
