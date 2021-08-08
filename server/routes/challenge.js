const express = require('express')
const router = new express.Router()
const Challenge = require('../utils/challengeResponse')
const challenge = new Challenge()
const {check, validationResult} = require('express-validator')

// @route POST /challenge/average
// @desc Calcular el promedio de dos números
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

// @route POST /challenge/strmanipulate
// @desc Calcular el promedio de dos números
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

// @route POST /challenge/arraysum
/* @desc Recibe una matriz y retorna en un objeto:
            1. La suma total de la matriz
            2. La suma de sus enteros positivos
            3. La suma de los números pares
            4. La suma de los números impares
*/
router.post('/arraysum', 
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: {errors: errors.array()}})
    }
    
    const {arr} = req.body
    try {
        const result = await challenge.sumArray(arr)
        return res.status(200).json({result})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})

// @route POST /challenge/arraytransform
/* @desc Retorna un arreglo unidimensional solo con los
    elementos de tipo entero de la matriz y en el orden que se le envía. 
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

// @route POST /challenge/cows
/* @desc Producción de leche diaria (en
litros) de cada una de las vacas, durante una semana */
router.post('/cows', async (req, res) => {
    const {N, produccionPorVaca} = req.body
    try {
        const response = await challenge.myCows(N, produccionPorVaca)
        return res.status(200).json({response})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message})
    }
})

// @route GET /challenge/tracking/:codigo
/* @desc Obtener por medio de una respuesta el tracking
operativo referente a una guía en específico*/
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

// @route GET /challenge/arrayscore/:arr
// @desc  Retorna puntuación total basada en criterios
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