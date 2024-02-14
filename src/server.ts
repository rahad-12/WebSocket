import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const expressServer = http.createServer(app);
const port = 3000;

const filePath = path.join(__dirname, '../index.html');

const io = new Server(expressServer);
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on("message", (msg) => {
    console.log(msg)
  })
});

// Serve static files from the 'node_modules' directory
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.get('/', (req, res) => {
  res.sendFile(filePath);
});

expressServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
