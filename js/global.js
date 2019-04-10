// [z][y][x]
let map;

let keyInput;

let testMapData;
testMapData = new Array(MAP_Z_MAX);
for (let z = MAP_Z_MAX-1; z >= 0 ; --z) {
	testMapData[z] = new Array(MAP_Y_MAX);
	for (let y = MAP_Y_MAX-1; y >= 0 ; --y) {
		testMapData[z][y] = new Array(MAP_X_MAX);
		for (let x = 0; x < MAP_X_MAX; ++x) {
			testMapData[z][y][x] = false;
		}
	}
}

testMapData[1][MAP_Y_MAX - 1][5] = true;
testMapData[1][MAP_Y_MAX - 2][5] = true;
testMapData[1][MAP_Y_MAX - 3][5] = true;
testMapData[1][MAP_Y_MAX - 1][6] = true;
testMapData[1][MAP_Y_MAX - 2][6] = true;
testMapData[1][MAP_Y_MAX - 3][6] = true;
testMapData[1][MAP_Y_MAX - 1][7] = true;
testMapData[1][MAP_Y_MAX - 2][7] = true;
testMapData[1][MAP_Y_MAX - 3][7] = true;
testMapData[1][MAP_Y_MAX - 1][8] = true;
testMapData[1][MAP_Y_MAX - 2][8] = true;
testMapData[1][MAP_Y_MAX - 3][8] = true;


testMapData[2][MAP_Y_MAX - 1][0] = true;
testMapData[2][MAP_Y_MAX - 1][1] = true;
testMapData[2][MAP_Y_MAX - 1][2] = true;
testMapData[2][MAP_Y_MAX - 1][3] = true;
testMapData[2][MAP_Y_MAX - 2][3] = true;
testMapData[2][MAP_Y_MAX - 1][4] = true;
testMapData[2][MAP_Y_MAX - 1][5] = true;
testMapData[2][MAP_Y_MAX - 1][6] = true;
testMapData[2][MAP_Y_MAX - 2][6] = true;
testMapData[2][MAP_Y_MAX - 3][6] = true;

testMapData[3][MAP_Y_MAX - 1][0] = true;
testMapData[3][MAP_Y_MAX - 1][1] = true;
testMapData[3][MAP_Y_MAX - 1][2] = true;
testMapData[3][MAP_Y_MAX - 1][3] = true;
testMapData[3][MAP_Y_MAX - 1][4] = true;
testMapData[3][MAP_Y_MAX - 1][5] = true;
testMapData[3][MAP_Y_MAX - 1][6] = true;
testMapData[3][MAP_Y_MAX - 2][6] = true;
testMapData[3][MAP_Y_MAX - 1][7] = true;
testMapData[3][MAP_Y_MAX - 2][7] = true;
testMapData[3][MAP_Y_MAX - 3][7] = true;
testMapData[3][MAP_Y_MAX - 1][8] = true;
testMapData[3][MAP_Y_MAX - 2][8] = true;
testMapData[3][MAP_Y_MAX - 3][8] = true;

testMapData[4][MAP_Y_MAX - 2][0] = true;
testMapData[4][MAP_Y_MAX - 2][1] = true;
testMapData[4][MAP_Y_MAX - 2][2] = true;
testMapData[4][MAP_Y_MAX - 2][3] = true;
testMapData[4][MAP_Y_MAX - 2][4] = true;
testMapData[4][MAP_Y_MAX - 2][5] = true;
testMapData[4][MAP_Y_MAX - 2][6] = true;
testMapData[4][MAP_Y_MAX - 2][7] = true;
testMapData[4][MAP_Y_MAX - 2][8] = true;

testMapData[4][MAP_Y_MAX - 3][0] = true;
testMapData[4][MAP_Y_MAX - 3][1] = true;
testMapData[4][MAP_Y_MAX - 3][2] = true;
testMapData[4][MAP_Y_MAX - 3][3] = true;
testMapData[4][MAP_Y_MAX - 3][4] = true;
testMapData[4][MAP_Y_MAX - 3][5] = true;
testMapData[4][MAP_Y_MAX - 3][6] = true;
testMapData[4][MAP_Y_MAX - 3][7] = true;
testMapData[4][MAP_Y_MAX - 3][8] = true;

testMapData[4][MAP_Y_MAX - 4][0] = true;
testMapData[4][MAP_Y_MAX - 4][1] = true;
testMapData[4][MAP_Y_MAX - 4][2] = true;
testMapData[4][MAP_Y_MAX - 4][3] = true;
testMapData[4][MAP_Y_MAX - 4][4] = true;
testMapData[4][MAP_Y_MAX - 4][5] = true;
testMapData[4][MAP_Y_MAX - 4][6] = true;
testMapData[4][MAP_Y_MAX - 4][7] = true;
testMapData[4][MAP_Y_MAX - 4][8] = true;

testMapData[3][MAP_Y_MAX - 4][3] = true;
testMapData[2][MAP_Y_MAX - 4][3] = true;
testMapData[1][MAP_Y_MAX - 4][3] = true;

const mapShowSort = [];
for (let y = MAP_Y_MAX-1; y >= 0 ; --y) {
	let sorts = [];
	sorts.push(new cPoint(0, y, 9));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(1, y, 9));
	sorts.push(new cPoint(0, y, 8));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(2, y, 9));
	sorts.push(new cPoint(1, y, 8));
	sorts.push(new cPoint(0, y, 7));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(3, y, 9));
	sorts.push(new cPoint(2, y, 8));
	sorts.push(new cPoint(1, y, 7));
	sorts.push(new cPoint(0, y, 6));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(4, y, 9));
	sorts.push(new cPoint(3, y, 8));
	sorts.push(new cPoint(2, y, 7));
	sorts.push(new cPoint(1, y, 6));
	sorts.push(new cPoint(0, y, 5));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(5, y, 9));
	sorts.push(new cPoint(4, y, 8));
	sorts.push(new cPoint(3, y, 7));
	sorts.push(new cPoint(2, y, 6));
	sorts.push(new cPoint(1, y, 5));
	sorts.push(new cPoint(0, y, 4));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(6, y, 9));
	sorts.push(new cPoint(5, y, 8));
	sorts.push(new cPoint(4, y, 7));
	sorts.push(new cPoint(3, y, 6));
	sorts.push(new cPoint(2, y, 5));
	sorts.push(new cPoint(1, y, 4));
	sorts.push(new cPoint(0, y, 3));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(7, y, 9));
	sorts.push(new cPoint(6, y, 8));
	sorts.push(new cPoint(5, y, 7));
	sorts.push(new cPoint(4, y, 6));
	sorts.push(new cPoint(3, y, 5));
	sorts.push(new cPoint(2, y, 4));
	sorts.push(new cPoint(1, y, 3));
	sorts.push(new cPoint(0, y, 2));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(8, y, 9));
	sorts.push(new cPoint(7, y, 8));
	sorts.push(new cPoint(6, y, 7));
	sorts.push(new cPoint(5, y, 6));
	sorts.push(new cPoint(4, y, 5));
	sorts.push(new cPoint(3, y, 4));
	sorts.push(new cPoint(2, y, 3));
	sorts.push(new cPoint(1, y, 2));
	sorts.push(new cPoint(0, y, 1));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 9));
	sorts.push(new cPoint(8, y, 8));
	sorts.push(new cPoint(7, y, 7));
	sorts.push(new cPoint(6, y, 6));
	sorts.push(new cPoint(5, y, 5));
	sorts.push(new cPoint(4, y, 4));
	sorts.push(new cPoint(3, y, 3));
	sorts.push(new cPoint(2, y, 2));
	sorts.push(new cPoint(1, y, 1));
	sorts.push(new cPoint(0, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 8));
	sorts.push(new cPoint(8, y, 7));
	sorts.push(new cPoint(7, y, 6));
	sorts.push(new cPoint(6, y, 5));
	sorts.push(new cPoint(5, y, 4));
	sorts.push(new cPoint(4, y, 3));
	sorts.push(new cPoint(3, y, 2));
	sorts.push(new cPoint(2, y, 1));
	sorts.push(new cPoint(1, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 7));
	sorts.push(new cPoint(8, y, 6));
	sorts.push(new cPoint(7, y, 5));
	sorts.push(new cPoint(6, y, 4));
	sorts.push(new cPoint(5, y, 3));
	sorts.push(new cPoint(4, y, 2));
	sorts.push(new cPoint(3, y, 1));
	sorts.push(new cPoint(2, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 6));
	sorts.push(new cPoint(8, y, 5));
	sorts.push(new cPoint(7, y, 4));
	sorts.push(new cPoint(6, y, 3));
	sorts.push(new cPoint(5, y, 2));
	sorts.push(new cPoint(4, y, 1));
	sorts.push(new cPoint(3, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 5));
	sorts.push(new cPoint(8, y, 4));
	sorts.push(new cPoint(7, y, 3));
	sorts.push(new cPoint(6, y, 2));
	sorts.push(new cPoint(5, y, 1));
	sorts.push(new cPoint(4, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 4));
	sorts.push(new cPoint(8, y, 3));
	sorts.push(new cPoint(7, y, 2));
	sorts.push(new cPoint(6, y, 1));
	sorts.push(new cPoint(5, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 3));
	sorts.push(new cPoint(8, y, 2));
	sorts.push(new cPoint(7, y, 1));
	sorts.push(new cPoint(6, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 2));
	sorts.push(new cPoint(8, y, 1));
	sorts.push(new cPoint(7, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 1));
	sorts.push(new cPoint(8, y, 0));
	mapShowSort.push(sorts);

	sorts = [];
	sorts.push(new cPoint(9, y, 0));
	mapShowSort.push(sorts);
}