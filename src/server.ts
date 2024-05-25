import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ hello: 'world' })
})

export default app