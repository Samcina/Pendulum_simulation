const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.focus();

let spawnX = 10;
let spawnY = 8;
let pendLen = 30;
let pendNum = 30;
let ballSize = 2;
let springStrength = 200;

let pendulum;

let xScale = x => x * (0.5*canvas.width/pendulum.n);
let yScale = x => -x * (0.5*canvas.height/pendulum.n);

function generatePendulum() {
	
	console.log("Generating:");
	BODIES.splice(0, BODIES.length);

	let spawnXSlider = document.getElementById("spawnXRange");
	let spawnYSlider = document.getElementById("spawnYRange");
	let pendLenSlider = document.getElementById("pendLenRange");
	let pendNumSlider = document.getElementById("pendNumRange");
	let pendDegSlider = document.getElementById("pendDegRange");
	let color = document.getElementById("color");


	clickDistance = false;
	clickBounds = false;

	pendulum = new Pendulum(+spawnXSlider.value + 0.5*canvas.width, +spawnYSlider.value + 0.5*canvas.height, color.value, +pendNumSlider.value, Array(+pendNumSlider.value).fill((+pendDegSlider.value / 180)*Math.PI));

	xScale = x => x * (+pendLenSlider.value);
	yScale = x => -x * (+pendLenSlider.value);

}




function FpsCtrl(fps, callback) {

	var delay = 1000 / fps,
		time = null,
		frame = -1,
		tref;

	function loop(timestamp) {
		if (time === null) time = timestamp;
		var seg = Math.floor((timestamp - time) / delay);
		if (seg > frame) {
			frame = seg;
			callback({
				time: timestamp,
				frame: frame
			})
		}
		tref = requestAnimationFrame(loop)
	}

	this.isPlaying = false;

	this.frameRate = function (newfps) {
		if (!arguments.length) return fps;
		fps = newfps;
		delay = 1000 / fps;
		frame = -1;
		time = null;
	};

	this.start = function () {
		if (!this.isPlaying) {
			this.isPlaying = true;
			tref = requestAnimationFrame(loop);
		}
	};

	this.pause = function () {
		if (this.isPlaying) {
			cancelAnimationFrame(tref);
			this.isPlaying = false;
			time = null;
			frame = -1;
		}
	};
}

var fc = new FpsCtrl(60, function (e) {
	mainLoop();
});

fc.start();