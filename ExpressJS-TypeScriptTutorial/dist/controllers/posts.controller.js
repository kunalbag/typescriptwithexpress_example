"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const database_1 = require("../database");
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        try {
            const result = yield conn.query(`INSERT INTO emp SET ?`, [newPost]);
            return res.json({
                message: "Record created successfully"
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    });
}
exports.createPost = createPost;
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        try {
            const posts = yield conn.query("SELECT * FROM emp");
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getPosts = getPosts;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        try {
            const posts = yield conn.query(`SELECT * FROM emp WHERE id = ?`, [id]);
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getPost = getPost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield (0, database_1.connect)();
        try {
            yield conn.query(`UPDATE emp SET ? WHERE id = ?`, [updatePost, id]);
            return res.json({
                message: "Record updated successfully.."
            });
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.updatePost = updatePost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        try {
            yield conn.query(`DELETE FROM emp WHERE id = ?`, [id]);
            return res.json({
                message: "Record deleted successfully.."
            });
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.deletePost = deletePost;
