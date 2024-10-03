// Import the 'express' module along with 'Request' and 'Response' types from express
import express from "express";
import get_todolist from "./routes/handler/get-todolist";
import add_todolist from "./routes/handler/add-todolist";
import delete_todolist from "./routes/handler/delete-todolist";

// Create an Express application
const app = express();

// Specify the port number for the server
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  res.redirect("/todolist");
});

app.get("/todolist", get_todolist);

app.post("/todolist", add_todolist);

app.delete("/todolist/:id", delete_todolist);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});
