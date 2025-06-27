body {
  background: #11181b;
  color: #eee;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
h1 {
  margin-top: 30px;
  font-size: 2.2em;
  color: #00ff00;
  letter-spacing: 1px;
  text-shadow: 0 0 10px #00ff0055;
}
#scoreboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin: 15px 0 5px 0;
}
#game-status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  color: #0f0;
  font-weight: bold;
  font-size: 1.15em;
}
#score-area {
  display: flex;
  gap: 16px;
  align-items: center;
}
#score, #highscore {
  font-size: 1.15em;
  color: #fff700;
  font-weight: bold;
  padding: 5px 12px;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0003;
  transition: background 0.2s, color 0.2s;
}
#score.animated {
  animation: pulse 0.3s;
}
@keyframes pulse {
  0% { background: #fff700; color: #222; }
  100% { background: #222; color: #fff700; }
}
.controls {
  margin: 10px 0 20px 0;
  color: #bbb;
  display: flex;
  align-items: center;
  gap: 15px;
}
.controls label {
  margin-right: 8px;
}
.controls select, .controls button {
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  font-size: 1em;
  background: #222;
  color: #fff;
  box-shadow: 0 2px 6px #0003;
  cursor: pointer;
  margin-right: 4px;
  outline: none;
  transition: background 0.2s;
}
.controls button:hover, .controls select:focus {
  background: #00ff0033;
}
canvas {
  border: 6px ridge #00ff00;
  box-shadow: 0 12px 45px #0f04, 0 2px 8px #0008, 0 0 0 8px #222 inset;
  background: linear-gradient(145deg, #232323 70%, #363636 100%);
  margin-top: 20px;
  border-radius: 16px;
}
#mobile-controls {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
#mobile-controls .dpad-row {
  display: flex;
  justify-content: center;
  margin: 2px 0;
}
#mobile-controls .dpad-row .ctrl {
  font-size: 1.7em;
  margin: 3px 12px;
  padding: 8px 22px;
  background: #333;
  color: #0f0;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  transition: background 0.2s;
}
#mobile-controls .ctrl:active {
  background: #00ff0033;
}
#mobile-controls .dpad-space {
  width: 40px;
  display: inline-block;
}
#comandos {
  margin-top: 20px;
  background: #232323;
  padding: 14px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px #0003;
  color: #bbbbbb;
  max-width: 320px;
  text-align: left;
}
#comandos h3 {
  margin-top: 0;
  color: #00ff00;
  font-size: 1.2em;
}
footer {
  margin-top: 40px;
  font-size: 1em;
  color: #888;
  padding-bottom: 20px;
}
footer a {
  color: #00ff00;
  text-decoration: none;
}
#ranking {
  margin-top: 20px;
  background: #181828;
  border-radius: 10px;
  box-shadow: 0 1px 8px #0006;
  padding: 10px 20px;
  width: 250px;
}
#ranking h3 {
  margin: 8px 0 8px 0;
  color: #ff0;
}
#ranking-list {
  color: #fff;
  font-weight: bold;
  font-size: 1.08em;
}
.particle {
  position: absolute;
  pointer-events: none;
  width: 8px; height: 8px;
  border-radius: 50%;
  opacity: 0.8;
}body {
  background: #181818;
  color: #eee;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

h1 {
  margin-top: 30px;
  font-size: 2.2em;
  color: #00ff00;
  letter-spacing: 1px;
  text-shadow: 0 0 10px #00ff0055;
}

#scoreboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px; /* igual à largura do canvas */
  margin: 15px 0 5px 0;
}

#game-status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  color: #0f0;
  font-weight: bold;
  font-size: 1.15em;
}

#score-area {
  display: flex;
  gap: 16px;
  align-items: center;
}

#score, #highscore {
  font-size: 1.15em;
  color: #fff700;
  font-weight: bold;
  padding: 5px 12px;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0003;
  transition: background 0.2s, color 0.2s;
}

#score.animated {
  animation: pulse 0.3s;
}
@keyframes pulse {
  0% { background: #fff700; color: #222; }
  100% { background: #222; color: #fff700; }
}

.controls {
  margin: 10px 0 20px 0;
  color: #bbb;
  display: flex;
  align-items: center;
  gap: 15px;
}

.controls label {
  margin-right: 8px;
}

.controls select, .controls button {
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  font-size: 1em;
  background: #222;
  color: #fff;
  box-shadow: 0 2px 6px #0003;
  cursor: pointer;
  margin-right: 4px;
  outline: none;
  transition: background 0.2s;
}
.controls button:hover, .controls select:focus {
  background: #00ff0033;
}

/* CANVAS 3D EFFECT */
canvas {
  border: 6px ridge #00ff00;
  box-shadow:
    0 12px 45px #0f04,
    0 2px 8px #0008,
    0 0 0 8px #222 inset;
  background: linear-gradient(145deg, #232323 70%, #363636 100%);
  margin-top: 20px;
  border-radius: 16px;
}

#mobile-controls {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}

#mobile-controls .dpad-row {
  display: flex;
  justify-content: center;
  margin: 2px 0;
}

#mobile-controls .dpad-row .ctrl {
  font-size: 1.7em;
  margin: 3px 12px;
  padding: 8px 22px;
  background: #333;
  color: #0f0;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  transition: background 0.2s;
}
#mobile-controls .ctrl:active {
  background: #00ff0033;
}
#mobile-controls .dpad-space {
  width: 40px;
  display: inline-block;
}

#comandos {
  margin-top: 20px;
  background: #232323;
  padding: 14px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px #0003;
  color: #bbbbbb;
  max-width: 320px;
  text-align: left;
}
#comandos h3 {
  margin-top: 0;
  color: #00ff00;
  font-size: 1.2em;
}

footer {
  margin-top: 40px;
  font-size: 1em;
  color: #888;
  padding-bottom: 20px;
}
footer a {
  color: #00ff00;
  text-decoration: none;
}

#pauseOverlay {
  display: none;
  position: absolute;
  left: 0; top: 0;
  width: 100vw; height: 100vh;
  background: #000a;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
#pauseOverlay.active {
  display: flex;
}
#pauseOverlay span {
  font-size: 2.5em;
  color: #00ff00;
  background: #222e;
  padding: 30px 60px;
  border-radius: 18px;
  border: 2px solid #00ff00;
  box-shadow: 0 4px 40px #00ff003a;
}
