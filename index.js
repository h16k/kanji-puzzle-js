"use strict";
let puzzle = [];
let color = ["blue", "green", "orange", "pink"];
let answer;


function getTempColor() {
	let radioButtonsForTempColor = document.getElementsByName('tempColor');

	//選択されている色を取得する
	for (let i in color) {
		if (radioButtonsForTempColor.item(i).checked) {
			return radioButtonsForTempColor.item(i).value;
		}
	}
}

//パズルのテンプレートを読み込む
function loadTemp(id, scale) {

	//画像を読み込んでImageオブジェクトを作成する
	let tempImage = new Image();
	tempImage.src = `template/template_${getTempColor()}.PNG`;
	tempImage.onload = (function () {
		//画像ロードが完了してからキャンバスの準備をする
		let canvas = document.getElementById(id);
		let ctx = canvas.getContext('2d');

		//キャンバス自体のサイズを設定する
		canvas.width = tempImage.width;
		canvas.height = tempImage.height;

		//実際に表示されるキャンバスのサイズを指定する
		canvas.style.width = Math.min(window.innerWidth * 0.9, 400) * scale + "px";
		canvas.style.height = Math.min(window.innerWidth * 0.9, 400) * scale + "px";


		//キャンバスに画像を描画（開始位置0,0）
		ctx.drawImage(tempImage, 0, 0);

	});
}

//１つの整数をランダムに作る
function randNum(max) {
	return Math.floor(Math.random() * max);
}

//重複しない２つの数をランダムに作る
function twoRandNum(max) {
	let rand1,rand2;
	do {
		rand1 = randNum(max);
		rand2 = randNum(max);
	} while (rand1 === rand2)
	return [rand1, rand2];
}

//パズルを生成（できるかどうかをチェック）
function createPuzzle(order) {
	let isRandom = false;

	if (order == "") {
		isRandom = true;
		answer = ansArray[randNum(ansArray.length)];
		document.getElementById("isRandom").classList.remove('hidden');
	} else{
		answer = order;
		document.getElementById("isRandom").classList.add('hidden');
		if (!puzzleIndexMap.has(order)) return false; //ユーザーが入力した答えが登録されていないときは不可
	}

	//その答えに関するパズルのヒント候補を取得する
	let puzzlePieces = hintArray[puzzleIndexMap.get(answer)];

	//左と左上に入るヒント（「ヒント＋答えの１文字目」で熟語になる）の候補
	let leftAndLeftUp = [];
	//左下に入るヒント（「答えの１文字目＋ヒント」で熟語になる）の候補
	let leftDown = [];
	//右と右下に入るヒント（「ヒント＋答えの１文字目」で熟語になる）の候補
	let rightAndRightDown = [];
	//右上に入るヒント（「答えの１文字目＋ヒント」で熟語になる）の候補
	let rightUp = [];


	for (let i in puzzlePieces) {
		let hint = puzzlePieces[i];
		//答えの１文字目を含むヒントは、左側に入るはず
		if (hint.includes(answer[0])) {
			if (answer[0] === hint[0]) {
				leftDown.push(hint);
			} else {
				leftAndLeftUp.push(hint);
			}

			//答えの２文字目を含むヒントは、右側に入るはず
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

		//出力するパズルを決定。毎回シャッフルされる
		//[答え,左hint,左上hint,右上hint,右hint,右下hint,左下hint]
		//答えは2文字、hintは1文字
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
	}else if(isRandom){
		return createPuzzle('puzzleCanvas', "");
	}else{
		return false;
	}
}


//パズルのヒントを書き込む
function drawHint(canvas_id) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');

	//各文字の座標
	let posi = [[135, 1610], [930, 830], [1750, 830], [2545, 1610], [1750, 2400], [930, 2400]]

	//文字のスタイル（大きさ、フォント）を指定
	ctx.font = '320px ZenMaruGothicRegular';
	//文字の色を指定
	ctx.fillStyle = '#000000';

	//ヒントをcanvasに書き入れる
	for (let i = 0; i < 6; i++) {
		ctx.fillText(puzzle[i + 1], posi[i][0], posi[i][1]);
	}

}

//パズルの答えを書きこむ
function drawAns(canvas_id) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');

	//各文字の座標
	let posi = [[840, 1690], [1645, 1690]]

	//文字のスタイル（大きさ、フォント）を指定
	ctx.font = '500px ZenMaruGothicRegular';
	//文字の色を指定
	ctx.fillStyle = '#000000';

	//答えをcanvasに書き入れる
	for (let i = 0; i < 2; i++) {
		ctx.fillText(puzzle[0][i], posi[i][0], posi[i][1]);
	}

}

//キャンバスをクリアする
function clearCanvas(id) {
	let canvas = document.getElementById(id);

	//キャンバスの縦横の大きさを0にすることで無に帰す
	canvas.width = "0px";
	canvas.height = "0px";
}

//パズル作成＆出力
function createPuzzleProcess() {
	let order = document.getElementById("answerText").value;
	puzzle = createPuzzle('puzzleCanvas', order);

	//ちゃんとパズルができているなら、パズル画像を出力
	if (puzzle != false) {
		const promise = new Promise(function (resolve, reject) {
			//パズル画像・答え画像のテンプレを用意（答えは小さめ）
			loadTemp("puzzleCanvas", 1);
			loadTemp("answerCanvas", 0.7);
			setTimeout(() => resolve(), 3);
		});

		promise.then(function () {
			document.getElementById('createResult').innerText = `「${answer}」が答えになるパズルを生成しました！`;
			document.getElementById('note').innerText = `画像が出ない時は、もう一度「生成」を押してね`;

			//パズル画像・答え画像のテンプレにヒントと答えを書き込む
			drawHint('puzzleCanvas');
			drawHint('answerCanvas');
			drawAns('answerCanvas');
			dupCheck();
			puzzleText();
		});
		//パズルができなかったなら、キャンバスを消去し、アナウンス
	} else {
		clearCanvas('puzzleCanvas');
		clearCanvas('answerCanvas');
		document.getElementById('createResult').innerText = `「${answer}」が答えになるパズルを生成できませんでした`;
		document.getElementById('note').innerText = ``;


	}

}

//input fieldでユーザーがEnterを押したときにもパズル作成が実行されるように
function enter(e) {
	if (e === 'Enter') {
		createPuzzleProcess();
	}
	return false;
}

//生成したパズルの色を変更
function colorChange() {
	//パズルを生成した後に色変更をした場合、
	//答えやヒントはそのままで色だけ変える
	if (puzzle != false) {
		const promise = new Promise(function (resolve, reject) {
			loadTemp("puzzleCanvas", 1);
			loadTemp("answerCanvas", 0.7);
			setTimeout(() => resolve(), 5);
		});

		promise.then(function () {
			drawHint('puzzleCanvas');
			drawHint('answerCanvas');
			drawAns('answerCanvas');

		});
	}


}

//簡易的な重複チェック機能
function dupCheck() {
	let answers = [];
	for (let i = 1; i < vocabList.length; i++) {
		let j = vocabList[i];
		if (vocabSet.has(puzzle[1] + j[0]) && (puzzle[1] + j[0]) != j) {
			if (vocabSet.has(puzzle[2] + j[0]) && (puzzle[2] + j[0]) != j) {
				if (vocabSet.has(puzzle[3] + j[1]) && (puzzle[3] + j[1]) != j) {
					if (vocabSet.has(j[1] + puzzle[4]) && (j[1] + puzzle[4]) != j) {
						if (vocabSet.has(j[1] + puzzle[5]) && (j[1] + puzzle[5]) != j) {
							if (vocabSet.has(j[0] + puzzle[6]) && (j[0] + puzzle[6]) != j) {

								answers.push(j);
							}
						}
					}
				}
			}
		}
	}

	document.getElementById('dupCheckResult').innerText = '答え：' + answers;

}

function puzzleText(){
	document.getElementById('puzzleTextVer').innerText = `
 ${puzzle[2]}  ${puzzle[3]}
     ↓   ↓
${puzzle[1]} → 〇 〇 → ${puzzle[4]}
     ↓   ↓
 ${puzzle[6]}  ${puzzle[5]}
`;
}

//ページの読み込み時にパズルの色を選択するボタンを表示
window.onload = () => {
	for (let i in color) {
		let colorRadioButton = document.getElementById('colorRadioButton');
		colorRadioButton.innerHTML +=
			`<input type="radio" 
		id = "${color[i]}" 
		name="tempColor" 
		value="${color[i]}" 
		onclick="colorChange();">
	<label for = "${color[i]}">${color[i]}</label>`;
	};

	let defaultColor = document.getElementById(`${color[0]}`);
	defaultColor.checked = true;
};