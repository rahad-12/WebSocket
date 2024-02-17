"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const expressServer = http_1.default.createServer(app);
const port = 3000;
const filePath = path_1.default.join(__dirname, '../index.html');
const io = new socket_io_1.Server(expressServer);
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    socket.on("chat", (msg) => {
        socket.emit("chat-transfer", msg);
    });
});
// Serve static files from the 'node_modules' directory
app.use('/node_modules', express_1.default.static(path_1.default.join(__dirname, '../node_modules')));
app.get('/', (req, res) => {
    res.sendFile(filePath);
});
expressServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
