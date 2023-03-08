module.exports =  class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createServer(PORT) 
        this.createRoutes()
        this.errorHandler()
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(PORT)
        server.listen(PORT,()=>{
            return console.log(`Server Run on http://localhost:${PORT}`);
        })
    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.urlencoded({extended:true}));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.static(path.join(__dirname,"..","public")))
    }
    configDatabase(DB_URL) {
        const mongoose = require('mongoose')
        mongoose.connect(DB_URL,(error)=>{
            if(error) throw error;
            return console.log('__Connect to database successfull__')  
        })
    }
    errorHandler() {
        this.#app.use((req,res,next)=>{
            return res.status(404).json({
                status:404,
                success: false,
                message:'the requested page could not be found'
            })
        });
        this.#app.use((error,req,res,next)=>{
            const status = error?.status || 500;
            const message = error?.message || 'Internal Server Error';
            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }
    createRoutes() {
       this.#app.get('/',(req,res,next)=>{
        return res.json({
            message:'this is a new Application'
        })
       })
    }
}