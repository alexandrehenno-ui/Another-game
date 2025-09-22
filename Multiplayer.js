// Multiplayer client logic for Sniper Shooter

let socket = null;
let playerId = null;
const lobbyDiv = document.getElementById("multiplayerLobby");
const joinBtn = document.getElementById("joinGameBtn");
const playerNameInput = document.getElementById("playerName");
const playersListDiv = document.getElementById("playersList");
const backLobbyBtn = document.getElementById("backLobbyBtn");

joinBtn.onclick = () => {
  const name = playerNameInput.value.trim();
  if(!name) return alert("Enter your name!");

  // Connect to WebSocket server
  socket = new WebSocket("ws://localhost:3001");
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "join", name }));
  };
  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if(data.type === "joined") {
      playerId = data.id;
      playersListDiv.textContent = "Players: " + data.players.map(p => p.name).join(", ");
    } else if(data.type === "players") {
      playersListDiv.textContent = "Players: " + data.players.map(p => p.name).join(", ");
    } else if(data.type === "start") {
      // Start multiplayer game
      window.startMultiplayerGame(playerId);
    } else if(data.type === "sync") {
      window.setGameState(data.state);
    }
  };
};
backLobbyBtn.onclick = () => {
  lobbyDiv.style.display = "none";
  document.getElementById("menu").style.display = "flex";
};

// Multiplayer sync (send state to server)
function sendGameState() {
  if(socket && socket.readyState === 1 && playerId) {
    socket.send(JSON.stringify({
      type: "sync",
      id: playerId,
      state: window.getGameState()
    }));
  }
}

// Periodic sync
setInterval(() => {
  if(playerId && window.getGameState().mode === "multi") {
    sendGameState();
  }
}, 60);

// Multiplayer controls: start game when 2 players joined
// Server starts game, see server.js
