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

    myCows(){

    }

    trackingCoordinadora(){

    }

    arrayScore(){

    }
}

module.exports = Challenge