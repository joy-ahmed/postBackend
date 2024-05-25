import express from 'express'
import morgan from 'morgan'
import postRoute from './routes/postRoute'
import userRoute from './routes/userRoute'


const app = express()
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json())

app.use('/api', postRoute)
app.use('/', userRoute)

app.get('/', (req, res) => {
    res.json({ hello: 'world' })
})

export default app