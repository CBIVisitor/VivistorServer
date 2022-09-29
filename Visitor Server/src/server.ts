import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import { db } from './context'
import * as cors from 'cors';
 
//get router


//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ], 
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
}; 

//use cors middleware 

 
const app = express()
app.use(cors.default(options)); 

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        context: db,
        graphiql: true,
    }),
)

app.listen(7000)
console.log(`\
🚀 Server ready at: http://localhost:7000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-express-sdl-first#using-the-graphql-api
`)
    