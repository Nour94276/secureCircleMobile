const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const dbPath = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL,
    longitude REAL,
    heartRate REAL,
    steps INTEGER,
    timestamp TEXT
)`);

const parseMessage = (message) => {
    const regex = /Latitude: ([\d.-]+), Longitude: ([\d.-]+), Heart Rate: Fréquence cardiaque: ([\d.-]+), Steps: (.+)/;
    const match = message.match(regex);

    if (match) {
        return {
            latitude: parseFloat(match[1]),
            longitude: parseFloat(match[2]),
            heartRate: parseFloat(match[3]),
            steps: match[4] === 'En attente...' ? null : parseInt(match[4], 10)
        };
    } else {
        console.error("Format du message non reconnu.");
        return null;
    }
};

const saveDataToSQLite = (data) => {
    const now = new Date().toISOString();
    db.run(`INSERT INTO sensor_data (latitude, longitude, heartRate, steps, timestamp) VALUES (?, ?, ?, ?, ?)`, [data.latitude, data.longitude, data.heartRate, data.steps, now], function(err) {
        if (err) {
            return console.error('Erreur d\'insertion dans la base de données:', err.message);
        }
        console.log(`Un enregistrement ajouté avec succès avec l'id ${this.lastID}`);
    });
};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('messageFromWatch', (data) => {
        console.log('Received message from watch:', data);
        socket.emit('messageToWatch', { data: 'Hello from server' });
    });

    socket.on('messageForlocation', (data) => {
        const parsedData = parseMessage(data);
        console.log(parsedData);
        saveDataToSQLite(parsedData); // Utiliser SQLite pour sauvegarder
        socket.emit('messageToWatch', { data: 'data received' });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
