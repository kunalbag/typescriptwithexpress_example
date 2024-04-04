import { Request, Response, json } from 'express';
import { connect } from "../database";
import User from '../model/user';
import { FieldPacket, QueryResult } from 'mysql2';
import { ApiResponse } from './APIResponse';
import { ErrorHandler } from './ErrorHandler';
import { HttpStatusCode } from './HttpStatusCode';

export async function insertRecord (req: Request, res: Response) : Promise<Response>{
    const newRecord: User = req.body;
    const conn = await connect();
    try{
     const result : [QueryResult, FieldPacket[]]= await conn.query('INSERT INTO emp SET ?', newRecord)
     return res.json({
        message: "Record created successfully"
    });
    } catch(e){
        const obj = JSON.parse(JSON.stringify(e));
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, new ErrorHandler(obj.sqlState,obj.sqlMessage).getSqlMessage());
        res.statusCode= errorResponse.statusCode;
        return  res.json(errorResponse);
    }  
}

export async function getAllRecords(req: Request, res: Response) : Promise<Response> {
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("SELECT * FROM emp");
    if(JSON.stringify(posts[0]) === '[]'){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record found..");
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json(posts[0]);
    }
    catch(e){
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to find records");
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
}

export async function getRecordByEmpId (req: Request, res: Response): Promise<Response> {
    const id = req.params.empId;
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("SELECT * FROM emp WHERE id = ?", id);
    if(JSON.stringify(posts[0]) === '[]'){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record found for id =" + id);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json(posts[0])
    } catch(e){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "Unable to find records", e);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
}

export async function updateRecordByEmpId(req: Request, res: Response) : Promise<Response>{
    const id = req.params.empId;
    const updatePost: User = req.body;
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("UPDATE emp SET ? WHERE id = ?", [updatePost, id])
    const outputJson = JSON.parse(JSON.stringify(posts));
    const affectedRows = outputJson[0].affectedRows;
    if(affectedRows === 0){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record found for id =" + id);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json({
        message: "Record updated successfully.."
    })
    } catch(e){
        if(e instanceof Error){
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to update record", e.message);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
        }
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to update record", e);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    
}

export async function deleteRecordByEmpId(req: Request, res: Response) : Promise<Response>{
    const id = req.params.empId;
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("DELETE FROM emp WHERE id = ?", id);
    const outputJson = JSON.parse(JSON.stringify(posts));
    const affectedRows = outputJson[0].affectedRows;
    if(affectedRows === 0){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record found for id =" + id);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json({
        message: "Record deleted successfully.."
    })
    } catch(e){
        if(e instanceof Error){
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete record", e.message);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
            }
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete record", e);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
    }
}

export async function deleteAllRecords(req: Request, res: Response) : Promise<Response>{
    //const id = req.params.empId;
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("DELETE FROM emp");
    const outputJson = JSON.parse(JSON.stringify(posts));
    const affectedRows = outputJson[0].affectedRows;
    if(affectedRows === 0){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record to be deleted");
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json({
        message: "Records are deleted successfully.."
    })
    } catch(e){
        if(e instanceof Error){
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete records", e.message);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
            }
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete records", e);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
    }
}