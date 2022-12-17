function loadTemp(id, temp_color) {
	//画像を読み込んでImageオブジェクトを作成する
	let image = new Image();
	image.src = `template/template_${temp_color}.jpg`;
	image.onload = (function () {
		//画像ロードが完了してからキャンバスの準備をする
		let canvas = document.getElementById(id);
		let imageContainer = document.getElementById("imageContainer");

		let ctx = canvas.getContext('2d');

		canvas.width = image.width;
		canvas.height = image.height;

		canvas.style.width = Math.min(Math.max(window.innerWidth * 0.7, 300), 360) + "px";		
		canvas.style.height = canvas.style.width * (image.height / image.width) + "px";

		//キャンバスに画像を描画（開始位置0,0）
		ctx.drawImage(image, 0, 0);

	});
}

function randNum(max) {
	return Math.floor(Math.random() * max);
}

function twoRandNum(max) {
	let rand1 = Math.floor(Math.random() * max);
	let rand2 = Math.floor(Math.random() * max);
	while (rand1 === rand2) {
		rand2 = Math.floor(Math.random() * max);
	}
	return [rand1, rand2];
}

function createPuzzle(canvas_id, answer) {
	console.log(answer);
	let ok = false;
	if (puzzleIndexMap.has(answer)) {
		let puzzlePieces = puzzleList[puzzleIndexMap.get(answer)];
		leftAndLeftUp = [];
		leftDown = [];
		rightAndRightDown = [];
		rightUp = [];

		for (let i = 1; i < puzzlePieces.length; i++) {
			let hint = puzzlePieces[i];
			if (hint.includes(answer[0])) {
				if (answer[0] === hint[0]) {
					leftDown.push(hint);
				} else {
					leftAndLeftUp.push(hint);
				}
			} else {
				if (answer[1] === hint[1]) {
					rightUp.push(hint);
				} else {
					rightAndRightDown.push(hint);
				}
			}
		}

		if ((leftAndLeftUp.length >= 2) && (rightAndRightDown.length >= 2) && (rightUp.length > 0) && (leftDown.length > 0)) {
			ok = true;
		}
	}

	if (ok) {
		let puzzle = [answer];
		let randL = twoRandNum(leftAndLeftUp.length);
		puzzle.push(leftAndLeftUp[randL[0]][0]);
		puzzle.push(leftAndLeftUp[randL[1]][0]);
		puzzle.push(rightUp[randNum(rightUp.length)][0]);
		let randR = twoRandNum(rightAndRightDown.length);
		puzzle.push(rightAndRightDown[randR[0]][1]);
		puzzle.push(rightAndRightDown[randR[1]][1]);
		puzzle.push(leftDown[randNum(leftDown.length)][1]);
		return puzzle;
	} else {
		console.log("no");
		return false;
	}

}





//キャンバスに文字を描く
function drawText(canvas_id, puzzle) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	//文字のスタイルを指定
	ctx.font = '156px ZenMaruGothicRegular';
	ctx.fillStyle = '#000000';


	ctx.fillText(puzzle[1], 335, 555);
	ctx.fillText(puzzle[2], 678, 233);
	ctx.fillText(puzzle[3], 1075, 233);
	ctx.fillText(puzzle[4], 1417, 555);
	ctx.fillText(puzzle[5], 1075, 878);
	ctx.fillText(puzzle[6], 678, 878);
}


function createPuzzleProcess() {
	let answer = document.getElementById("answerText").value;
	let puzzle = createPuzzle('puzzleCanvas', answer);
	if (puzzle != false) {
		const promise = new Promise(function (resolve, reject) {
			loadTemp("puzzleCanvas", "blue");
			setTimeout(() => resolve(), 2);
		});

		promise.then(function () {
			document.getElementById('createResult').innerText = `「${answer}」でパズルを生成しました！`;
			setTimeout(()=>drawText('puzzleCanvas', puzzle), 2)
			
		});
	} else {
		document.getElementById('createResult').innerText = `「${answer}」でパズルを生成できませんでした`;

	}



}