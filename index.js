function loadTemp(id, temp_color) {
	//画像を読み込んでImageオブジェクトを作成する
	let image = new Image();
	image.src = `template/template_${temp_color}.jpg`;
	image.onload = (function () {
		//画像ロードが完了してからキャンバスの準備をする
		let canvas = document.getElementById(id);
		let ctx = canvas.getContext('2d');

		canvas.width = image.width;
		canvas.height = image.height;

		canvas.style.width = Math.min(Math.max(window.innerWidth * 0.7, 300), 420) + "px";
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
	if (puzzleIndexMap.has(answer)) {//ユーザーが入力した答えが登録されているとき
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
			let randL = twoRandNum(leftAndLeftUp.length);
			let randR = twoRandNum(rightAndRightDown.length);
			let puzzle = [
				answer,
				leftAndLeftUp[randL[0]][0],
				leftAndLeftUp[randL[1]][0],
				rightUp[randNum(rightUp.length)][0],
				rightAndRightDown[randR[0]][1],
				rightAndRightDown[randR[1]][1],
				leftDown[randNum(leftDown.length)][1]
			];

			return puzzle;
		}
	}
	return false;

}





//キャンバスに文字を描く
function drawText(canvas_id, puzzle) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	let posi = [[135, 1610], [930, 830], [1750, 830], [2545, 1610], [1750, 2400], [930, 2400]]
	//文字のスタイルを指定
	ctx.font = '320px ZenMaruGothicRegular';
	ctx.fillStyle = '#000000';

	for (let i = 0; i < 6; i++) {
		ctx.fillText(puzzle[i + 1], posi[i][0], posi[i][1]);
	}
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
			document.getElementById('note').innerText = `画像が出ない場合は、もう一度「生成」を押してください`;
			setTimeout(() => drawText('puzzleCanvas', puzzle), 2)

		});
	} else {
		document.getElementById('createResult').innerText = `「${answer}」でパズルを生成できませんでした`;
		document.getElementById('note').innerText = ``;


	}

}

function enter(e) {
	if (e === 13) {
		createPuzzleProcess();
	}
	return false;
}
