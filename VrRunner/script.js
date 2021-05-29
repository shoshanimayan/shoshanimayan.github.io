
//control
const LEFT = -0.5;
const CENTER = 0;
const RIGHT = 0.5;
var player_position_index = 1;
var dolphin =  document.getElementById('dolf') 

function movePlayerTo(position_index) {
  player_position_index = position_index;

  var position = {x: 0, y: .5, z: -1}
  if      (position_index === 0) {position.x = LEFT;}
  else if (position_index === 1) {position.x = RIGHT;}
  else{position.x = CENTER;} 
  document.getElementById('player').setAttribute('position', position);   
}




function setupControls() {
	AFRAME.registerComponent('lane-controls', {
    tick: function (time, timeDelta) {
      var rotation = this.el.object3D.rotation;

      if      (rotation.y > 0.1)  {console.log("left"); movePlayerTo(0);}
      else if (rotation.y < -0.1){ console.log("right");movePlayerTo(1);}
      else{console.log("center");movePlayerTo(2);}
    }
  })
}

//Spike

var templateSpikeLeft;
var templateSpikeCenter;
var templateSpikeRight;
var numberOfSpikes = 0;
var SpikeContainer;
var SpikeTimer;


function setupSpikes() {
  templateSpikeLeft  = document.getElementById('template-Spike-left');
  templateSpikeCenter = document.getElementById('template-Spike-center');
  templateSpikeRight  = document.getElementById('template-Spike-right');
  templates  = [templateSpikeLeft, templateSpikeCenter, templateSpikeRight];
  SpikeContainer  = document.getElementById('Spike-container');

  removeSpike(templateSpikeLeft);
  removeSpike(templateSpikeRight);
  removeSpike(templateSpikeCenter);
}

function teardownSpikes() {
  clearInterval(SpikeTimer);
}

function addSpikesRandomlyLoop({intervalLength = 850} = {}) {
  SpikeTimer = setInterval(addSpikesRandomly, intervalLength);
}


function addSpike(el) {
  numberOfSpikes += 1;
  el.id = 'Spike-' + numberOfSpikes;
  SpikeContainer.appendChild(el);
}

function addSpikeTo(position_index) {
  var template = templates[position_index];
  addSpike(template.cloneNode(true));
}


function shuffle(a) {
   var j, x, i;
   for (i = a.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       x = a[i];
       a[i] = a[j];
       a[j] = x;
   }
   return a;
}

function addSpikesRandomly(
  {
    probSpikeLeft = 0.25,
    probSpikeCenter = 0.45,
    probSpikeRight = .25,
    maxNumberSpikes = 2
  } = {}) {
  	var Spikes = [
    {probability: probSpikeLeft,   position_index: 0},
    {probability: probSpikeCenter, position_index: 1},
    {probability: probSpikeRight,  position_index: 2},
  ]
  shuffle(Spikes);
  var numberOfSpikesAdded = 0;
  Spikes.forEach(function (Spike) {
  	  if (Math.random() < Spike.probability && numberOfSpikesAdded < maxNumberSpikes) {
      addSpikeTo(Spike.position_index);
      numberOfSpikesAdded += 1;
    }
  });
    return numberOfSpikesAdded;

}

function removeSpike(Spike) {
  Spike.parentNode.removeChild(Spike);
}
//collision

const POSITION_Z_OUT_OF_SIGHT = 1;
const POSITION_Z_LINE_START = -.7;
const POSITION_Z_LINE_END = -.5;

function setupCollision() {
  AFRAME.registerComponent('player', {
    tick: function() {

      document.querySelectorAll('.Spike').forEach(function(Spike) {
        position = Spike.getAttribute('position');
        Spike_position_index = Spike.getAttribute('data-Spike-position-index');
        Spike_id = Spike.getAttribute('id');

        if (position.z > POSITION_Z_OUT_OF_SIGHT) {
          removeSpike(Spike);

        }
        if (!isGameRunning) return;
        	
 if (POSITION_Z_LINE_START <= position.z && position.z <= POSITION_Z_LINE_END && Spike_position_index == player_position_index) {
          gameOver();
        }
      })
    }
  })
}



//game

var isGameRunning = false;

setupControls();
setupCollision();

function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;

}

function gameOver() {
  isGameRunning = false;

  alert('Game Over!');
  location.reload();
  teardownSpikes();

}

window.onload = function() {
  setupSpikes();
  startGame();

  addSpikesRandomlyLoop();
}
