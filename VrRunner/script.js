
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

//tree

var templateTreeLeft;
var templateTreeCenter;
var templateTreeRight;
var numberOfTrees = 0;
var treeContainer;
var treeTimer;


function setupTrees() {
  templateTreeLeft  = document.getElementById('template-tree-left');
  templateTreeCenter = document.getElementById('template-tree-center');
  templateTreeRight  = document.getElementById('template-tree-right');
  templates  = [templateTreeLeft, templateTreeCenter, templateTreeRight];
  treeContainer  = document.getElementById('tree-container');

  removeTree(templateTreeLeft);
  removeTree(templateTreeRight);
  removeTree(templateTreeCenter);
}

function teardownTrees() {
  clearInterval(treeTimer);
}

function addTreesRandomlyLoop({intervalLength = 500} = {}) {
  treeTimer = setInterval(addTreesRandomly, intervalLength);
}


function addTree(el) {
  numberOfTrees += 1;
  el.id = 'tree-' + numberOfTrees;
  treeContainer.appendChild(el);
}

function addTreeTo(position_index) {
  var template = templates[position_index];
  addTree(template.cloneNode(true));
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

function addTreesRandomly(
  {
    probTreeLeft = 0.25,
    probTreeCenter = 0.45,
    probTreeRight = .25,
    maxNumberTrees = 2
  } = {}) {
  	var trees = [
    {probability: probTreeLeft,   position_index: 0},
    {probability: probTreeCenter, position_index: 1},
    {probability: probTreeRight,  position_index: 2},
  ]
  shuffle(trees);
  var numberOfTreesAdded = 0;
  trees.forEach(function (tree) {
  	  if (Math.random() < tree.probability && numberOfTreesAdded < maxNumberTrees) {
      addTreeTo(tree.position_index);
      numberOfTreesAdded += 1;
    }
  });
    return numberOfTreesAdded;

}

function removeTree(tree) {
  tree.parentNode.removeChild(tree);
}
//collision

const POSITION_Z_OUT_OF_SIGHT = 1;
const POSITION_Z_LINE_START = -.5;
const POSITION_Z_LINE_END = -.35;

function setupCollision() {
  AFRAME.registerComponent('player', {
    tick: function() {

      document.querySelectorAll('.tree').forEach(function(tree) {
        position = tree.getAttribute('position');
        tree_position_index = tree.getAttribute('data-tree-position-index');
        tree_id = tree.getAttribute('id');

        if (position.z > POSITION_Z_OUT_OF_SIGHT) {
          removeTree(tree);

        }
        if (!isGameRunning) return;
        	
 if (POSITION_Z_LINE_START <= position.z && position.z <= POSITION_Z_LINE_END && tree_position_index == player_position_index) {
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
  teardownTrees();

}

window.onload = function() {
  setupTrees();
  startGame();

  addTreesRandomlyLoop();
}
