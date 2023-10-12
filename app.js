require('dotenv').config()
const epxress = require('express')
const cors = require('cors')
const app = epxress()
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 5038
//app.use(cors())
app.use(epxress.json())

app.use(cors({ origin: 'http://localhost:3000' }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
  

app.use('/api/1.0', require('./app/routes'))

dbConnect()
app.listen(PORT, () => {
    console.log('API LISTA EN EL PUERTO: ', PORT)
})

