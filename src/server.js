"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
const get_todolist_1 = __importDefault(require("./routes/handler/get-todolist"));
const add_todolist_1 = __importDefault(require("./routes/handler/add-todolist"));
const delete_todolist_1 = __importDefault(require("./routes/handler/delete-todolist"));
// Create an Express application
const app = (0, express_1.default)();
// Specify the port number for the server
const port = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
// Define a route for the root path ('/')
app.get("/", (req, res) => {
    res.redirect("/todolist");
});
app.get("/todolist", get_todolist_1.default);
app.post("/todolist", add_todolist_1.default);
app.delete("/todolist/:id", delete_todolist_1.default);
// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
});
