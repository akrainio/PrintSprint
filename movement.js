//character/laser movement functions

function getDist(curX, curY, curDir) {
	var checker = new Object();
	checker.x = curX;
	checker.y = curY;
	snapToClosestBlock(checker);
	switch (curDir) {
	case 0:
		while (!wallAt(curX, checker.y - 32)) {
			checker.y -= 32;
		}
		return checker.y;
		break;
	case 1:
		while (!wallAt(checker.x + 32, curY)) {
			checker.x += 32;
		}
		return checker.x;
		break;
	case 2:
		while (!wallAt(curX, checker.y + 32)) {
			checker.y += 32;
		}
		return checker.y;
		break;
	case 3:
		while (!wallAt(checker.x - 32, curY)) {
			checker.x -= 32;
		}
		return checker.x;
		break;
	default:
		console.log("direction is invalid");
		break;
	}
}

function setTurn(curX, curY, curDir) {
	arrow.x = curX;
	arrow.y = curY;
	arrow.dir = curDir;
	setTurnLoc(curDir, curX, curY);
	setTurnDir(curDir);
	for (var k = 0; k < attractors.length; k++) {
		attractors[k].calcturn();
	}
}

function setTurnLoc(curDir, curX, curY) {
	var dist;
	var curX = arguments[1];
	var curY = arguments[2];
	switch (arguments[0]) {
	case 0:
		dist = getDist(curX, curY, 0);
		if (dist >= curY - 96) {
			arrow.y = dist;
		} else {
			arrow.y = randomIntFromInterval(curY - 96, dist);
		}
		snapToClosestBlock(arrow);
		break;
	case 1:
		dist = getDist(curX, curY, 1);
		if (dist <= curX + 96) {
			arrow.x = dist;
		} else {
			arrow.x = randomIntFromInterval(curX + 96, dist);
		}
		snapToClosestBlock(arrow);
		break;
	case 2:
		dist = getDist(curX, curY, 2);
		if (dist <= curY + 96) {
			arrow.y = dist;
		} else {
			arrow.y = randomIntFromInterval(curY + 96, dist);
		}
		snapToClosestBlock(arrow);
		break;
	case 3:
		dist = getDist(curX, curY, 3);
		if (dist >= curX - 96) {
			arrow.x = dist;
		} else {
			arrow.x = randomIntFromInterval(curX - 96, dist);
		}
		snapToClosestBlock(arrow);
		break;
	default:
		console.log("direction is invalid");
		break;
	}
}

function setTurnDir(curDir) {
	switch(arguments[0]) {
	case 0:
		if (!wallAt(arrow.x + 32, arrow.y) && !wallAt(arrow.x - 32, arrow.y)) {
			if (Math.random() > 0.5) {
				arrow.dir = 1;
			} else
				arrow.dir = 3;
		} else if (wallAt(arrow.x + 32, arrow.y) && !wallAt(arrow.x - 32, arrow.y)) {
			arrow.dir = 3;
		} else if (!wallAt(arrow.x + 32, arrow.y) && wallAt(arrow.x - 32, arrow.y)) {
			arrow.dir = 1;
		} else
			arrow.dir = 2;
		break;
	case 1:
		if (!wallAt(arrow.x, arrow.y + 32) && !wallAt(arrow.x, arrow.y - 32)) {
			if (Math.random() > 0.5) {
				arrow.dir = 2;
			} else
				arrow.dir = 0;
		} else if (wallAt(arrow.x, arrow.y + 32) && !wallAt(arrow.x, arrow.y - 32)) {
			arrow.dir = 0;
		} else if (!wallAt(arrow.x, arrow.y + 32) && wallAt(arrow.x, arrow.y - 32)) {
			arrow.dir = 2;
		} else
			arrow.dir = 3;
		break;
	case 2:
		if (!wallAt(arrow.x + 32, arrow.y) && !wallAt(arrow.x - 32, arrow.y)) {
			if (Math.random() > 0.5) {
				arrow.dir = 1;
			} else
				arrow.dir = 3;
		} else if (wallAt(arrow.x + 32, arrow.y) && !wallAt(arrow.x - 32, arrow.y)) {
			arrow.dir = 3;
		} else if (!wallAt(arrow.x + 32, arrow.y) && wallAt(arrow.x - 32, arrow.y)) {
			arrow.dir = 1;
		} else
			arrow.dir = 0;
		break;
	case 3:
		if (!wallAt(arrow.x, arrow.y + 32) && !wallAt(arrow.x, arrow.y - 32)) {
			if (Math.random() > 0.5) {
				arrow.dir = 2;
			} else
				arrow.dir = 0;
		} else if (wallAt(arrow.x, arrow.y + 32) && !wallAt(arrow.x, arrow.y - 32)) {
			arrow.dir = 0;
		} else if (!wallAt(arrow.x, arrow.y + 32) && wallAt(arrow.x, arrow.y - 32)) {
			arrow.dir = 2;
		} else
			arrow.dir = 1;
		break;
	default:
		console.log("direction is invalid");
		break;
	}
}

function laserupdate(dir) {
	var laserarray;
	//Set laserarray to point to proper array
	switch (dir) {
	case 0:
		laserarray = laserups;
		break;
	case 1:
		laserarray = laserrights;
		break;
	case 2:
		laserarray = laserdowns;
		break;
	case 3:
		laserarray = laserlefts;
		break;
	default:
		console.log("direction is invalid");
		break;
	}
	//iterate through the array of lasers
	for (var j = 0; j < laserarray.length; j++) {
		var laserdist = 0;
		//set correct laserdist
		switch (dir) {
		case 0:
			laserdist = laserarray[j].y - getDist(laserarray[j].x, laserarray[j].y, 0);
			break;
		case 1:
			laserdist = getDist(laserarray[j].x, laserarray[j].y, 1) - laserarray[j].x;
			console.log("laser dist right is " + laserdist / 32);
			break;
		case 2:
			laserdist = getDist(laserarray[j].x, laserarray[j].y, 2) - laserarray[j].y;
			break;
		case 3:
			laserdist = laserarray[j].x - getDist(laserarray[j].x, laserarray[j].y, 3);
			break;
		default:
			console.log("direction is invalid");
			break;
		}
		//if laser just initialized
		if (!laserarray[j].firing) {
			laserarray[j].olddist = laserdist;
			//place beams
			for (var i = 0; i < laserdist / 32 + 1; i++) {

				//Value varies here v
				switch (dir) {
				case 0:
					var obj = new Laser(laserarray[j].x, laserarray[j].y - i * 32, 0);
					obj.name = "beamup";
					break;
				case 1:
					var obj = new Laser(laserarray[j].x + i * 32, laserarray[j].y, 1);
					obj.name = "beamright";
					break;
				case 2:
					var obj = new Laser(laserarray[j].x, laserarray[j].y + i * 32, 2);
					obj.name = "beamdown";
					break;
				case 3:
					var obj = new Laser(laserarray[j].x - i * 32, laserarray[j].y, 3);
					obj.name = "beamleft";
					break;
				default:
					console.log("direction is invalid");
					break;
				}
				obj.width = 32;
				obj.height = 32;
				obj.parent = laserarray[j];
				world.addChild(obj);
				laserarray[j].beams.push(obj);
			}
			laserarray[j].firing = true;
		} else {
			if (laserarray[j].olddist != laserdist) {
				console.log("newdist");
				//remove all current beams related to laserarray[j] laser
				for (var i = 0; i < laserarray[j].beams.length; i++) {
					world.removeChild(laserarray[j].beams[i]);
				}
				laserarray[j].beams.length = 0;
				//world.removeChild(laserarray[j]);
				//refill array
				laserarray[j].olddist = laserdist;
				//place beams
				for (var i = 0; i < laserdist / 32 + 1; i++) {

					//Value varies here v
					switch (dir) {
					case 0:
						var obj = new Laser(laserarray[j].x, laserarray[j].y - i * 32, 0);
						obj.name = "beamup";
						break;
					case 1:
						var obj = new Laser(laserarray[j].x + i * 32, laserarray[j].y, 1);
						obj.name = "beamright";
						break;
					case 2:
						var obj = new Laser(laserarray[j].x, laserarray[j].y + i * 32, 2);
						obj.name = "beamdown";
						break;
					case 3:
						var obj = new Laser(laserarray[j].x - i * 32, laserarray[j].y, 3);
						obj.name = "beamleft";
						break;
					default:
						console.log("direction is invalid");
						break;
					}
					obj.width = 32;
					obj.height = 32;
					obj.parent = laserarray[j];
					world.addChild(obj);
					laserarray[j].beams.push(obj);
				}
			}
		}
	}
}

function checkTurn() {
	var dist;
	switch(theDude.dir) {
	case 0:
		dist = getDist(theDude.x, theDude.y, 0);
		if (dist > arrow.y) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 1:
		dist = getDist(theDude.x, theDude.y, 1);
		if (dist < arrow.x) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 2:
		dist = getDist(theDude.x, theDude.y, 2);
		if (dist < arrow.y) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 3:
		dist = getDist(theDude.x, theDude.y, 3);
		if (dist > arrow.x) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	default:
		console.log("direction is invalid");
		break;
	}
	switch(arrow.dir) {
	case 0:
		dist = getDist(theDude.x, theDude.y, 0);
		if (wallAt(arrow.x, arrow.y - 32)) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 1:
		dist = getDist(theDude.x, theDude.y, 1);
		if (wallAt(arrow.x + 32, arrow.y)) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 2:
		dist = getDist(theDude.x, theDude.y, 2);
		if (wallAt(arrow.x, arrow.y + 32)) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	case 3:
		dist = getDist(theDude.x, theDude.y, 3);
		if (wallAt(arrow.x - 32, arrow.y)) {
			console.log("correcting");
			setTurn(theDude.x, theDude.y, theDude.dir);
		}
		break;
	default:
		console.log("direction is invalid");
		break;
	}
}
