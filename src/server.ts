// Import the 'express' module along with 'Request' and 'Response' types from express
import express from 'express';
import get_todolist from './routes/handler/get-todolist';

// Create an Express application
const app = express();

// Specify the port number for the server
const port: number = 3000;

// Define a route for the root path ('/')
app.get('/', (req,res) =>{
  res.redirect('/todolist');
} );

app.get('/todolist', get_todolist);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});