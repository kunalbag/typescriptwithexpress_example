import { Request, Response, NextFunction } from "express";
import Headers from "../model/headers";
import dotenv  from 'dotenv';
import { HttpStatusCode } from "../controllers/HttpStatusCode";
dotenv.config();


// Middleware function
function authenticationService(
    request: Request,
    response : Response,
    next: NextFunction
  ) {
    const requestHeader : Headers= JSON.parse(JSON.stringify(request.headers));
    if(requestHeader.username === process.env.APP_USERNAME && requestHeader.password === process.env.APP_PASSWORD){
        console.log("Logged in successfully..")
        next();
    } 
    else{
    console.log("Authentication failed..")
    response.status(HttpStatusCode.Unauthorized);
    return response.json({
        message: "AUthentication failed, please provide a valid username and password.."
    }); }
 }

  export default authenticationService
;