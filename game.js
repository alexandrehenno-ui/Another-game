body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #222;
  color: #fff;
  overflow: hidden;
}
.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(20, 20, 30, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
h1, h2 {
  margin: 20px 0;
}
button {
  padding: 12px 32px;
  margin: 10px;
  border: none;
  border-radius: 6px;
  background: #46a049;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
button:hover {
  background: #38823a;
}
#gameCanvas {
  display: block;
  margin: 0 auto;
  background: #3a3a3a;
  border: 2px solid #555;
  border-radius: 8px;
  box-shadow: 0 0 24px #000;
}
#hud {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
}
#hud button {
  background: #b83737;
  font-size: 16px;
  padding: 6px 18px;
}
#levels button {
  margin: 7px;
  background: #275ea6;
}
#playersList {
  margin: 10px 0;
  font-size: 18px;
}
