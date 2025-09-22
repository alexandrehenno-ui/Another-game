// Simple Node.js WebSocket server for multiplayer
// Run: node server.js

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

let players = [];
let gameStarted = false;

function broadcastPlayers() {
  const list = players.map(p => ({ name: p.name, id: p.id }));
  players.forEach(p => {
    p.ws.send(JSON.stringify({ type: "players", players: list }));
  });
}

function broadcastGameStart() {
  players.forEach(p => {
    p.ws.send(JSON.stringify({ type: "start" }));
  });
  gameStarted = true;
}

function broadcastSync(state) {
  players.forEach(p => {
    if(p.ws.readyState === 1)
      p.ws.send(JSON.stringify({ type: "sync", state }));
  });
}

wss.on('connection', function connection(ws) {
  let player = { ws, name: "", id: Math.random().toString(36).substr(2,7) };
  ws.on('message', function incoming(msg) {
    let data;
    try { data = JSON.parse(msg); } catch { return; }
    if(data.type === "join") {
      player.name = data.name;
      players.push(player);
      ws.send(JSON.stringify({ type: "joined", id: player.id, players: players.map(p => ({ name: p.name, id: p.id })) }));
      broadcastPlayers();
      if(players.length >= 2 && !gameStarted) {
        setTimeout(broadcastGameStart, 1000);
      }
    }
    if(data.type === "sync") {
      broadcastSync(data.state);
    }
  });

  ws.on('close', () => {
    players = players.filter(p => p.id !== player.id);
    broadcastPlayers();
    if(players.length < 2) gameStarted = false;
  });
});

console.log("WebSocket server running on ws://localhost:3001");
