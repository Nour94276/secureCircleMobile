const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

const saveDataToFile = (data) => {
    const now = new Date();
    data.timestamp = now;

    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, (err, fileData) => {
        let savedData = [];
        if (!err && fileData) {
            try {
                savedData = JSON.parse(fileData.toString());
            } catch (parseError) {
                console.error('Erreur lors du parsing des données existantes:', parseError);
            }
        }

        savedData.push(data);

        fs.writeFile(filePath, JSON.stringify(savedData, null, 2), (err) => {
            if (err) {
                console.error('Erreur d\'écriture du fichier:', err);
            } else {
                console.log('Fichier écrit avec succès');
            }
        });
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
        saveDataToFile(parsedData);
        socket.emit('messageToWatch', { data: 'Location received' });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
