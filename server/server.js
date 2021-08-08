const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger setup
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: 'Challenge - Entrega Contra Reloj',
        description: 'Challenge API',
        version: '1.0.0',
      },
      servers: [
          {
            url: 'http://localhost:8080'
          }
      ]
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };

const swaggerDocs = swaggerJsdoc(options);
app.use('/challenge/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors());
// Log requests
app.use(morgan('dev'))
// Parse incoming json
app.use(express.json())

// Rutas
const challenge = require('./routes/challenge')
app.use('/challenge', challenge)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))