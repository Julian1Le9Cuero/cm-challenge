# cm-challenge

## Cómo correr la aplicación/reto?
### Instalar las dependencias del servidor
```
cd server
npm install
```
### Correr el servidor
```
npm run dev
```
### Revisar en el navegador la documentación en http://localhost:8080/challenge/docs


## Teoría
### 1. Con sus propias palabras explique que es una inyección de dependencias y para qué sirve
Es un patrón de diseño de la programación orientada a objetos donde una clase recibe objetos de otra clase en lugar de que sea la misma clase la que cree esos objetos. Así que se dice que la clase **depende** de la clase contenedora que provee o inyecta esos objetos. Entre sus varios usos puede servir para la modularidad (subdivisón de las funcionalidades en partes más pequeñas), la reutilización de código y ayuda a que el testing sea más fácil, sobre todo las pruebas unitarias.

### 2. Explique con sus propias palabras las diferencias entre asincrono y sincrono
En lo sincrono o en la programación sincrónica el código o las tareas que realiza el programa se ejecutan "en orden" y una a la vez, esto quiere decir que una determinada tarea no se realizará a menos que la tarea anterior haya sido completada, por lo que hay que esperar que la tarea se termine para continuar con la siguiente. Por otro lado, en la programación asincrónica no es necesario esperar a que la tarea previa acabe para continuar con el resto del programa, así que a diferencia de la programación sincrónica, la programación asincrónica permite llevar a cabo varias tareas al mismo tiempo.

### 3. Cual es la importancia del uso de promesas en un proyecto
Su importancia tiene que ver con que permiten que una aplicación no se quede atascada en un proceso que podría tardar más de lo esperado, por lo que continúa ejecutando el resto del programa, como se mencionó en la parte de la programación asincrónica. En el caso de Javascript puede mejorar la legibilidad del código y un mejor manejo de errores.

### 4. Cual es la importancia de usar ORM dentro de un proyecto, ventaja y desventaja
Con un Object Relational Mapping (ORM) no es necesario tener que escribir manualmente código puro de SQL (Structured Query Language) al momento de realizar las consultas y manejar la persistencia de datos en la base de datos. Esto permite acelerar el desarrollo de las aplicaciones ya que se escribiría menos código que si se hiciera en SQL, pero tiene la desventaja de que sería difícil saber que código de SQL genera el ORM y podría disminuir el rendimiento de la aplicación porque se traería otra librería.

### 5. Que diferencia hay entre una base de datos SQL, NOSQL
* La base de datos SQL almacena los datos en tablas, mientras que en NOSQL se guardan como colecciones.
* En SQL cada dato o instancia se guarda como una fila, pero en NOSQL recibe el nombre de documento.
* Las bases de datos SQL tienden a ser mejores para realizar relaciones entre las distintas tablas que las bases NOSQL

### 6. Si hablo de colección y documentos me refiero a?
La colección es similar a una tabla de SQL o de Excel, pues ellas permiten almacenar los registros de los datos en documentos (o filas). Por ejemplo, una base de datos puede tener una colección de usuarios en la que almacena los datos de cada usuario o documento.

### 7. Si una aplicación está sacando error de CORS a que se está refiriendo?
Lo entendí como una característica de seguridad o protección del navegador cuando los recursos de la API REST reciben solicitudes HTTP complejas desde varios orígenes.

## Explicación de ejercicios
[https://youtu.be/j57lBNA3Mmk](https://youtu.be/j57lBNA3Mmk)

