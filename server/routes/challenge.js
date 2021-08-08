const express = require('express')
const router = new express.Router()
const Challenge = require('../utils/challengeResponse')
const challenge = new Challenge()
const {check, validationResult} = require('express-validator')

// Rutas
/**
 * @swagger
 * components:
 *   schemas:
 *     Average:
 *       type: object
 *       required:
 *         - a
 *         - b
 *       properties:
 *         a:
 *           type: number
 *           description: Number 1
 *         b:
 *           type: number
 *           description: Number 2
 *       example:
 *         a: 10
 *         b: 20
 *     StrManipulate:
 *       type: object
 *       required:
 *         - word
 *       properties:
 *           word: 
 *              type: string
 *              description: Cadena de texto
 *       example:
 *              word: "Hi! Hi!"
 *     SumArray:
 *       type: object
 *       required:
 *         - arr
 *       properties:
 *           arr: 
 *              type: array
 *              description: Matriz de números positivos y negativos
 *       example:
 *              arr: [4, -4, 5, 6, 7, 2.3, -1, 1.5]
 *     TransformArray:
 *       type: object
 *       required:
 *         - matrix
 *         - order
 *       properties:
 *         matrix:
 *           type: array
 *           description: Arreglo bidimensional con elementos alfanuméricos
 *         order:
 *           type: string
 *           description: Orden que tendrá el arreglo unidimensional de la respuesta
 *       example:
 *         matrix: [[48, 70],[10, "ABC"]]
 *         order: DESC
 *     MyCows:
 *       type: object
 *       required:
 *         - N
 *         - produccionPorVaca
 *       properties:
 *         N:
 *           type: number
 *           description: Número de vacas
 *         produccionPorVaca:
 *           type: object
 *           description: Producción de leche diaria (en litros) de cada una de las vacas, durante una semana
 *       example:
 *         N: 5
 *         produccionPorVaca: {"Vaca1": [3,2,3,1,2,4,2], "Vaca2": [4,3,2,1,3,3,2], "Vaca3": [2,4,2,1,5,4,2], "Vaca4": [3,5,1,1,2,5,2],"Vaca5": [4,5,2,1,2,1,2]}
 */

/**
 * @swagger
 * tags:
 *   - name: Average
 *   - name: String Manipulation
 *   - name: SumArray
 *   - name: TransformArray
 *   - name: MyCows
 *   - name: Tracking
 *   - name: ArrayScore
*/

/**
 * @swagger
 * /challenge/average:
 *   post:
 *     description: Calcular el promedio de dos números
 *     tags: [Average]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Average'
 *     responses:
 *       200:
 *         description: Objeto con el promedio de dos números
 *       400:
 *         description: Parametros faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/average', 
check('a', 'Number a is required').notEmpty(), 
check('b', 'Number b is required').notEmpty(), 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: {errors: errors.array()}})
    }
    const {a, b} = req.body
    try {
        const average = await challenge.average(a, b)
        return res.status(200).json({average})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }

})

/**
 * @swagger
 * /challenge/strmanipulate:
 *   post:
 *     description: Validar si al final de cada palabra enviada tiene un signo de admiración (!), si este tiene más de dos signos, solo se elimina uno
 *     tags: [String Manipulation]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StrManipulate'
 *     responses:
 *       200:
 *         description: Cadena de texto con un signo ! eliminado al final, en caso de que tenga uno
 *       400:
 *         description: Parametros faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/strmanipulate', 
check('word', 'Word is required').notEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: {errors: errors.array()}})
    }
    const {word} = req.body
    try {
        const str = await challenge.deleteMark(word)
        return res.status(200).json({word: str})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})

/**
 * @swagger
 * /challenge/arraysum:
 *   post:
 *     description: Recibe una matriz y retorna un objeto con la suma total de la matriz, la suma de sus enteros positivos, la suma de los números pares y la suma de los números impares. Si la matriz no contiene nada el resultado es 0.
 *     tags: [SumArray]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SumArray'
 *     responses:
 *       200:
 *         description: Objeto con la suma total de la matriz, la suma de sus enteros positivos, la suma de los números pares y la suma de los números impares. Si la matriz no contiene nada el resultado es 0.
 *       500:
 *         description: Error en el servidor
 */
router.post('/arraysum', 
async (req, res) => {
    const {arr} = req.body
    try {
        const result = await challenge.sumArray(arr)
        return res.status(200).json({result})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})


/**
 * @swagger
 * /challenge/arraytransform:
 *   post:
 *     description: Recibe un arreglo bidimensional con elementos alfanuméricos y un parámetro de orden. Retorna un arreglo unidimensional solo con los elementos de tipo entero y en el orden que se le envía (ASC o DESC)
 *     tags: [TransformArray]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransformArray'
 *     responses:
 *       200:
 *         description: Objeto con un arreglo unidimensional compuesto solo con los elementos de tipo entero de la matriz y en el orden que se le envía. 
 *       400:
 *         description: Parametros faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/arraytransform', 
check('matrix', 'Matrix is required').notEmpty(),
check('order', 'Order is required').notEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: {errors: errors.array()}})
    }
    
    const {matrix, order} = req.body
    try {
        const result = await challenge.transformArray(matrix, order)
        return res.status(200).json({result})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})


/**
 * @swagger
 * /challenge/cows:
 *   post:
 *     description: Almacena en una matriz de dimensión 7xN la producción de leche diaria (en litros) de cada una de las vacas de una hacienda, durante una semana.
 *     tags: [MyCows]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MyCows'
 *     responses:
 *       200:
 *         description: Datos sobre la producción de leche diaria (en litros) de cada una de las vacas, durante una semana
 *       400:
 *         description: Parametros faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/cows', 
check('N', 'El número de vacas es requerido').isNumeric(),
check('produccionPorVaca', 'La producción semanal de cada vaca es requerida').notEmpty(),
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: {errors: errors.array()}})
    }

    const {N, produccionPorVaca} = req.body
    try {
        const response = await challenge.myCows(N, produccionPorVaca)
        return res.status(200).json({response})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})

/**
 * @swagger
 * /challenge/tracking/{codigo}:
 *   get:
 *     description: Obtener por medio de una respuesta el tracking operativo referente a una guía en específico
 *     tags: [Tracking]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Codigo de guia o etiqueta
 *     responses:
 *       200:
 *         description: Tracking operativo referente a una guía
 *       404:
 *         description: El código no fue encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/tracking/:codigo', async (req, res) => {
    const {codigo} = req.params
    try {
        const response = await challenge.tracking(codigo)
        return res.status(200).json(response)
    } catch (error) {
        console.error(error.message);
        if(error.message.includes('no encontrada')){
            return res.status(404).json({error: error.message})
        } else {
            return res.status(500).json({error: error.message})
        }
    }
})

/**
 * @swagger
 * /challenge/arrayscore/{arr}:
 *   get:
 *     description: A partir de una matriz de números enteros enviada por parámetros, retorna una puntuación total basada en los siguientes criterios. Agrega 1 punto por cada número par en el arreglo. Agrega 3 puntos por cada número impar en el arreglo, exceptuando el número 5. Agrega 5 puntos a cada número 5 que aparezca en el arreglo.
 *     tags: [ArrayScore]
 *     parameters:
 *       - in: path
 *         name: arr
 *         schema:
 *           type: string
 *         required: true
 *         description: Matriz de números enteros
 *     responses:
 *       200:
 *         description: Puntuación total basada en criterios
 *       500:
 *         description: Error en el servidor
 */
router.get('/arrayscore/:arr', async (req, res) => {
    const {arr} = req.params
    try {
        const result = await challenge.arrayScore(JSON.parse(arr))
        return res.status(200).json({result})
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})

module.exports = router