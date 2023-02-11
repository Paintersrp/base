.highlight:hover {
  background-color: #ffa600;
  transition: background-color 0.3s ease-in-out;
}

.underline:hover {
  border-bottom: 2px solid #ffa600;
  transition: border-bottom 0.3s ease-in-out;
}

.glow:hover {
  box-shadow: 0px 0px 10px #ffa600;
  transition: box-shadow 0.3s ease-in-out;
}

.fill:hover {
  fill: #ffa600;
  transition: fill 0.3s ease-in-out;
}

.stroke:hover {
  stroke-width: 3px;
  transition: stroke-width 0.3s ease-in-out;
}

.bounce:hover {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.blur:hover {
  filter: blur(5px);
  transition: filter 0.3s ease-in-out;
}

.flip:hover {
  transform: rotateY(180deg);
  transition: transform 0.5s;
}

.fade-in:hover {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.rotate:hover {
  transform: rotate(45deg);
  transition: transform 0.3s ease-in-out;
}

.shadow:hover {
  box-shadow: 0px 0px 10px #888;
  transition: box-shadow 0.3s ease-in-out;
}

.slide:hover {
  transform: translateY(-10px);
  transition: transform 0.3s ease-in-out;
}

.pulse:hover {
  animation: pulse 1s ease-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.grow:hover {
  transform: scale(1.1);
}

