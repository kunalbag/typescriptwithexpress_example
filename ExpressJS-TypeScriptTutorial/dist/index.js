"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import the PostsRoutes from the post.routes file
const post_routes_1 = __importDefault(require("./routes/post.routes"));
// Create an instance of the Express
const app = (0, express_1.default)();
// Define the port to listen on
const PORT = process.env.PORT || 3001;
console.log("PORT in env file is: " + process.env.PORT);
app.use(express_1.default.json());
// Use the PostsRoutes for any routes starting with /posts
app.use('/posts', post_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
