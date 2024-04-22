import { Request, Response, NextFunction } from "express";
import dotenv  from 'dotenv';
import { HttpStatusCode } from "../controllers/HttpStatusCode";
import user from "../model/user";
dotenv.config();


// Middleware function
function DataValidation(
    request: Request,
    response : Response,
    next: NextFunction
  ) {
    console.log(request.url);
    try{
        console.log(request.url);
    if(request.url === '/insertrecord'){
        if(JSON.stringify(request.body) === '' || JSON.stringify(request.body) === '{}'){
            console.log("Bad request..")
            response.status(HttpStatusCode.BadRequest);
            return response.json({
                message: "Please send proper request.."
            });

        }
        const requestBody : user= JSON.parse(JSON.stringify(request.body));
        console.log("request body: ");
        console.log(JSON.stringify(request.body));
        //console.log(request.headers);
        if(requestBody.firstName.trim() == ""){
            console.log("Data validation failed..")
            response.status(HttpStatusCode.BadRequest);
            return response.json({
                message: "Firstname cannot be blank.."
            });
        }
        else if(requestBody.firstName.match("^[a-zA-Z]+$")){
            console.log("Data validation successful..")
            next();
        } 
        else{
        console.log("Data validation failed..")
        response.status(HttpStatusCode.BadRequest);
        return response.json({
            message: "Firstname contains alphanumeric or special characters.."
        }); }
    }else{
        next();
    }
} catch(e){
    console.log("Data validation failed..")
            response.status(HttpStatusCode.BadRequest);
            return response.json({
                message: "Bad request found.."
            });
}
 }

  export default DataValidation;