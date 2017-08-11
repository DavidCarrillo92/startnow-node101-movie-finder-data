const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const movieData = {};
const baseUrl = 'http://www.omdbapi.com';
const apiKey = '&apikey=8730e0e';
const app = express();
app.use(logger('dev'));
                                        //when server starts
console.log(1, "before app.get");

app.get('/', function(expressReq, expressRes) {
                                        //received request at '/' FROM client
        const omdbUrl = baseUrl + expressReq.url + apiKey;
        console.log(2, "after app.get");
        
                                        //make NEW request to API
        console.log(3, "before axios.get");

        if ( movieData[expressReq.url] === undefined ) { // no value yet
                axios.get(omdbUrl)
                                
                        .then( (axiosRes) => {
                
                                        //received RESPONSE from API
                                console.log(4, "inside axios.then");

                                movieData[expressReq.url] = axiosRes.data;
                                
                                        //sending RESPONSE to CLIENT
                                expressRes.json(movieData[expressReq.url]);            
                        
                                console.log(5, "After axios.then"); 
                        })      
                        .catch( (error) => {
                
                                        //bad RESPONSE from API
                                console.log(6, "inside axios.catch");

                                console.log(error);
                                expressRes.status(500).end(error.message);
                                console.log(7, "after axios.catch");
                        })

        } else {
                expressRes.json(movieData[expressReq.url]);
                console.log(8, "after definition");
        }
                
 })  
   
module.exports = app;