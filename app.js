const express = require('express');
const app = express();
require('dotenv').config();
require('./src/database/index.db');

const productRoutes = require('./src/routes/product.route.js');

app.use(express.json());
app.use('/api/productos', productRoutes);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
})



