const config = require('config')
const axios = require('axios')

class Challenge{
    average(a, b){
        return new Promise((resolve, reject) => {
            try {
                if(typeof a !== "number" || typeof b !== "number"){
                    throw new TypeError("Al menos uno de los parámetros no es un número");
                }
                const response = (a + b) / 2;
                return resolve(response);
            } catch (error) {
                return reject(error)
            }
        })
    }

    deleteMark(s){
        return new Promise((resolve, reject) => {
            try {
                if(typeof s !== "string"){
                    throw new TypeError("El parámetro no es una cadena de texto");
                } else if(!s.match(/!$/)){
                    // Si no tiene exclamación al final, devolver la misma string
                    return resolve(s);
                } else {
                    const response = s.replace(/!$/, '') 
                    return resolve(response);
                }
            } catch (error) {
                return reject(error)
            }
        })
    } 

    sumArray(arr){
        function allSameType(arr) {
            const isNumberArr = arr.map(val => typeof val !== "number")
            return isNumberArr.filter(b => b).length === 0;
        }

        return new Promise((resolve, reject) => {
            try{
                if(!Array.isArray(arr)){
                    throw new TypeError("El parámetro no es una matriz.");
                }

                if(arr.length === 0){
                    return resolve(arr.length)
                }
                
                if(!allSameType(arr)){
                    throw new TypeError("La matriz debe contener solo números.");
                }

                const sumaTotal = arr.reduce((acc, current) => acc + current)
                const sumaEnterosPositivos = arr.filter(val => Math.floor(val) === val).reduce((acc, current) => acc + current)
                const sumaNumerosPares = arr.filter(val => val % 2 === 0).reduce((acc, current) => acc + current)
                const sumaNumerosImpares = arr.filter(val => val % 2 === 1).reduce((acc, current) => acc + current)

                return resolve({
                    sumaTotal,
                    sumaEnterosPositivos,
                    sumaNumerosPares,
                    sumaNumerosImpares
                })
            } catch(error){
                return reject(error)
            }
        })
    }

    transformArray(matrix, order){

        function containsArrays(arr) {
            return arr.every(val => Array.isArray(val))
        }

        function containsAlfaNumeric(arr){
            return arr.every(val => typeof val === "number" || typeof val === "string")
        }

        return new Promise((resolve, reject) => {
            try {
                if(!Array.isArray(matrix)){
                    throw new TypeError('Invalid matrix type.')
                }

                if(order !== 'ASC' && order !== 'DESC'){
                    throw new Error('Invalid order values')
                }

                // Check if it only contains arrays
                if(!containsArrays(matrix)){
                    throw new TypeError('The matrix should only contain arrays.')
                } else if(matrix.length !== 2 || matrix.some(arr => arr.length !== 2)){
                    // Check if it's bidimensional
                    throw new Error('La matrix no es bidimensional (2x2)')
                } else if(!matrix.every(arr => containsAlfaNumeric(arr))){
                    // Check if inner arrays are only alfa numeric
                    throw new TypeError('Matrix should only contain alfa numeric elements')
                }

                let response = [...matrix[0], ...matrix[1]].filter(val => typeof val === "number")
                switch (order) {
                    case 'DESC':
                        return resolve(response.sort((a, b) => b - a))
                    case 'ASC':
                        return resolve(response.sort((a, b) => a - b))
                    default:
                        return resolve(response)
                }
                
            } catch (error) {
                return reject(error)
            }
        })
    }

    myCows(N, produccionPorVaca){
        return new Promise((resolve, reject) => {
            try {
                if(N < 3 || N > 50){
                    throw new Error('El número de vacas debe estar entre 3 y 50')
                } 
                if(N !== Object.keys(produccionPorVaca).length){
                    throw new Error('La producción no coincide con el número de vacas')
                }
                if (Object.values(produccionPorVaca).some(weeklyProd => weeklyProd.length !== 7)) {
                    throw new Error('La producción no abarca una semana')
                }

                const validProduction = Object.values(produccionPorVaca).every(weeklyProd => weeklyProd.every(prod => prod >= 0 && prod <= 11.9))
                if(!validProduction){
                    throw new Error('La producción de leche de cada vaca debe estar entre 0.0 y 11.9 litros')
                }
                
                const dataMatrix = Array.from({length: 7}, () => new Array(N))
                // Llenar matrix  7 x N
                for (let day = 0; day < dataMatrix.length; day++) {
                    for (let cowNum = 0; cowNum < N; cowNum++) {
                        dataMatrix[day][cowNum] = Object.values(produccionPorVaca)[cowNum][day]
                    }
                }

                const prodDiaria = []
                let msg1 = 'Producción total del hato en cada uno de los siete días.\n'
                dataMatrix.forEach((dayArr, idx) => {
                    prodDiaria[idx] = dayArr.reduce((acc, curr) => acc + curr)
                    msg1 += `Día ${idx+1}: ${prodDiaria[idx]}\n`
                })

                let msg2 = 'Día de la semana con mayor y menor producción.\n';
                msg2 += `Mayor producción: Día ${prodDiaria.indexOf(Math.max(...prodDiaria)) + 1}\n`
                msg2 += `Menor producción: Día ${prodDiaria.indexOf(Math.min(...prodDiaria)) + 1}\n`
                
                let msg3 = 'El número de la vaca que dio más leche en cada día.\n';
                dataMatrix.forEach((dayArr, dayIdx) => {
                    let msgPiece = `Día ${dayIdx+1}:`
                    const sep = ' - '
                    const maxProd = Math.max(...dayArr)
                    const arrLength = dayArr.length
                    dayArr.forEach((prod, prodIdx) => {
                        if(prod === maxProd) {
                            if(msgPiece.match(/:$/)){
                                msgPiece += ` Vaca ${prodIdx + 1}`
                            } else {
                                msgPiece += `${sep}Vaca ${prodIdx + 1}`
                            }
                        } 
                        if(prodIdx === (arrLength-1)){
                            msgPiece += '\n'
                        }
                    })
                    msg3 += msgPiece
                })

                const msg = `${msg1}${msg2}${msg3}`
                return resolve(msg)
            } catch (error) {
                return reject(error)
            }
        })
    }

    tracking(codigo){
        return new Promise(async (resolve, reject) => {
            try {
                // Validación
                if(!codigo.match(/([0-9]+)/) || (codigo.length !== 11 && codigo.length !== 15)){
                    throw new Error('Código invalido.')
                } 
                else if(codigo.length === 15 && codigo[0] !== "7"){
                    throw new Error('Etiqueta 1d invalida.')
                }
                // Solicitudes a las API
                const respGuias = await axios.get(config.get('apiGuias'))
                const respTracking = await axios.get(config.get('apiTracking'))
                let response = {}

                function generateTracking(etiqueta1d) {
                        const checkpoints = respTracking.data.data.filter(obj => obj.etiqueta1d === etiqueta1d)
                        return {
                            cantidad_checkpoints: checkpoints.length,
                            tracking: checkpoints.map(({checkpoint, tipo}) => ({checkpoint, tipo}))
                        }
                }
                // Código enviado: GUIA
                if (codigo.length === 11) {
                    // Encontrar guia con el codigo ingresado por el usuario
                    const guia = respGuias.data.data.guias.find(({codigo_remision}) => codigo_remision === codigo)
                    if(!guia){
                        throw new Error('Guia no encontrada.')
                    } else {
                        const {codigo_remision, nombre_destinatario, dir_destinatario, unidades} = guia
                        const etiquetasTracking = unidades.map(({etiqueta1d}) => ({etiqueta1d, ...generateTracking(etiqueta1d)}))

                        response = {
                            isError: false,
                            status: 'success',
                            data: {
                                codigo_remision, 
                                nombre_destinatario, 
                                dir_destinatario,
                                unidades: etiquetasTracking
                            }
                        }
                    }

                } else if(codigo.length === 15){
                    // Encontrar guia mediante etiqueta en sus unidades
                    const etiquetaInfo = respGuias.data.data.guias.find(obj => obj.unidades.filter(({etiqueta1d}) => etiqueta1d === codigo).length > 0)
                    if(!etiquetaInfo){
                        throw new Error('Etiqueta no encontrada.')
                    }
                    const {codigo_remision, nombre_destinatario, dir_destinatario} = etiquetaInfo
 
                    // Código enviado: ETIQUETA
                    response = {
                        isError: false,
                        status: 'success',
                        data: {
                            etiqueta: codigo,
                            informacion_guia: {
                                codigo_remision, 
                                nombre_destinatario, 
                                dir_destinatario,
                                ...generateTracking(codigo)
                            }
                        }
                    }
                }

                return resolve(response)

            } catch (error) {
                return reject(error)
            }
        })
    }

    arrayScore(arr){
        return new Promise((resolve, reject) => {
            try {
                if(!Array.isArray(arr)){
                    throw new TypeError('Parametro debe ser una matriz.')
                }

                if(!arr.every(val => typeof val === "number")){
                    throw new TypeError("La matriz debe contener solo números.");
                }
                let score = 0
                arr.forEach(val => {
                    if(val === 5) score += 5
                    else if(val % 2 === 1 && val !== 5) score += 3
                    else if(val % 2 === 0) score += 1
                })

                return resolve(score)
            } catch (error) {
                return reject(error)
            }
        })
    }
}

module.exports = Challenge