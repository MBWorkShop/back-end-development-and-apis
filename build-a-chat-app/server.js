import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
    const files = {
        "/": { path: "./public/index.html", contentType: "text/html" },
        "/index.html": { path: "./public/index.html", contentType: "text/html" },
        "/script.js": {
            path: "./public/script.js",
            contentType: "text/javascript",
        },
    };
    const file = files[req.url];

    if (!file) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
    }

    fs.readFile(file.path, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading page");
            return;
        }
        res.writeHead(200, { "Content-Type": file.contentType });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get("username",);

    const payload = {
        type: "system",
        text: `${username} joined`,
    }
    wss.clients.forEach((client) => {
        
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
            }
    });

  socket.on("message", (data) => {

    console.log("Received:", data.toString());
    const message = JSON.parse(data);
    const payload = {
        type: "chat",
        username: message.username,
        text: message.text,
    };
    wss.clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
            }
        });
    });

  socket.on("close", () => {

    console.log("Client disconnected");
    const payload = {
        type: "system",
        text: `${username} left`,
    };

    wss.clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
            }
        });
    });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});
