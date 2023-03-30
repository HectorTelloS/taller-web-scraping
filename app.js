const express = require('express');


const app = express();
const port = '3000';

//carpeta estatica
app.use(express.static(__dirname + '/public'))

//template engines
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middlewares para habilitar recepción de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importamos las rutas

app.use('/api/v1', require('./routers/apiRouter'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})