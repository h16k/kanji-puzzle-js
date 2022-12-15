function loadImage(id, temp_color)
{
	//画像を読み込んでImageオブジェクトを作成する
	let image = new Image();
	image.src = `template/template_${temp_color}.jpg`;
	image.onload = (function () {
		//画像ロードが完了してからキャンバスの準備をする
		let canvas = document.getElementById(id);
		let imageContainer = document.getElementById("image-container");

		let ctx = canvas.getContext('2d');
		// //キャンバスのサイズを画像サイズに合わせる
		// canvas.width = imageContainer.offsetWidth
		// canvas.height = imageContainer.offsetHeight
        canvas.width = image.width;
		canvas.height = image.height;
        canvas.style.width = imageContainer.offsetWidth + "px";
        canvas.style.height = imageContainer.offsetWidth * (image.height/image.width) + "px";

		//キャンバスに画像を描画（開始位置0,0）
		ctx.drawImage(image, 0, 0);
	});
}
//キャンバスに文字を描く
function drawText(canvas_id, text_id)
{
    let puzzle = ["熟語","習","成","漢","学","源","睡"];
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	let text = document.getElementById(text_id);
	//文字のスタイルを指定
	ctx.font = '156px sans-serif';
	ctx.fillStyle = '#000000';
	//文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
	// ctx.textBaseline = 'center';
	// ctx.textAlign = 'center';
	//座標を指定して文字を描く（座標は画像の中心に）
	let x = (canvas.width / 2);
	let y = (canvas.height / 2);
	ctx.fillText(puzzle[1], 335, 555);
	ctx.fillText(puzzle[1], 678, 233);
	ctx.fillText(puzzle[1], 1075, 233);
	ctx.fillText(puzzle[1], 1417, 555);
	ctx.fillText(puzzle[1], 1075, 878);
	ctx.fillText(puzzle[1], 678, 878);
}