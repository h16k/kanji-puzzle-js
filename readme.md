---
marp: true
---
# [ここから遊べます](https://h16k.github.io/kanji-puzzle-js/)
---
# 目次

- [ここから遊べます](#ここから遊べます)
- [HTML\&CSS\&JavaScript入門](#htmlcssjavascript入門)
	- [漢字パズル生成ツールを作ろう](#漢字パズル生成ツールを作ろう)
- [HTMLタグ速習](#htmlタグ速習)
- [```<h1>見出し１</h1>```](#h1見出し１h1)
	- [```<h2>見出し２</h2>```](#h2見出し２h2)
		- [```<h3>見出し３</h3>```](#h3見出し３h3)
			- [```<h4>見出し４</h4>```](#h4見出し４h4)
- [環境](#環境)
	- [VSCodeを想定](#vscodeを想定)
- [HTMLの雛形を作成する](#htmlの雛形を作成する)
- [HTMLのPreviewを表示する](#htmlのpreviewを表示する)
	- [拡張機能「HTML Preview」をインストールする](#拡張機能html-previewをインストールする)
	- [方法１](#方法１)
	- [方法２](#方法２)
- [HTMLからcssファイルを読み込む](#htmlからcssファイルを読み込む)
	- [**```<link rel="stylesheet" href = "~~~.css">```**](#link-relstylesheet-href--css)
- [HTMLからjsファイルを読み込む](#htmlからjsファイルを読み込む)
	- [**```<script src="">```**](#script-src)
- [文字列の中に変数を埋め込む①](#文字列の中に変数を埋め込む)
- [文字列の中に変数を埋め込む②](#文字列の中に変数を埋め込む-1)
- [Math](#math)
	- [最大値・最小値を求める](#最大値最小値を求める)
	- [０から１までの乱数を生成する](#０から１までの乱数を生成する)
	- [整数に丸める](#整数に丸める)
- [文字列を特定の文字で分割するsplit](#文字列を特定の文字で分割するsplit)
- [canvas](#canvas)
- [push](#push)
- [配列の一部を切り出す](#配列の一部を切り出す)
	- [**```.slice()```**](#slice)
- [map](#map)
- [setTimeout](#settimeout)

---
# HTML&CSS&JavaScript入門
## 漢字パズル生成ツールを作ろう
---
# HTMLタグ速習
# ```<h1>見出し１</h1>```
## ```<h2>見出し２</h2>```
### ```<h3>見出し３</h3>```
#### ```<h4>見出し４</h4>```
```<p>平文</p>```

- ```<li>リスト</li>```
---
# 環境
## VSCodeを想定

---
# HTMLの雛形を作成する
1. htmlファイルを開く
1. 「html:5」を入力し、[Tab]を押すと、以下が自動で入力される
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

---
# HTMLのPreviewを表示する
## 拡張機能「HTML Preview」をインストールする
## 方法１
1. Ctrl+Shift+Pを押すことでコマンドパレットを表示
1. 「HTML」を入力し、「HTML: Open preview to the Side」を選択する
## 方法２
1. [Ctrl+K]を押したのち[v]を押す


---
# HTMLからcssファイルを読み込む
## **```<link rel="stylesheet" href = "~~~.css">```**
<br>

```link:css```と入力して```[Tab]```を押すと自動で以下を入力してくれる
<br>

```html
<link rel="stylesheet" href="style.css">
```
<br>

このhref=の部分を適切なファイル名に書き換えれば良い

---
# HTMLからjsファイルを読み込む
## **```<script src="">```**

```html
<html>
  <body>
    <script src="index.js"></script>
  </body>
</html>
```

---
# 文字列の中に変数を埋め込む①
1. 全体を``` ` ` (バッククォート)```で囲う
1. 変数を``` ${} ```で囲う
```javascript
let name = 'Taro';
console.log(`Hello, my name is ${name}.`);
```
↓　name はそのまま name で出力され、${name} は Taro に置換される
```
output：
Hello, my name is Taro.
```
---

# 文字列の中に変数を埋め込む②
1. 文字列は``` " " ```や``` ' ' ```で囲う
1. 変数は囲まない
1. 文字列と変数を``` + ```で結合させる

```javascript
let name = 'Taro';
console.log("Hello, my name is" + name + ".");
console.log('Hello, my name is' + name + '.');
```
↓　nameがきちんとTaroに変換される

```
output：
Hello, my name is Taro.
Hello, my name is Taro.
```
---
# Math
## 最大値・最小値を求める
```javascript
Math.max();
Math.min();
```
## ０から１までの乱数を生成する
```javascript 
Math.random();
```

## 整数に丸める
```javascript
Math.floor();
```


---
# 文字列を特定の文字で分割するsplit
```javascript
let puzzleStringDividedPerLine = stringPuzzles.split('\n');
```



---
# canvas

---
# push

---
# 配列の一部を切り出す
## **```.slice()```**
```javascript
let arrayA = [0,1,2,3,4,5,6,7,8,9];
let result = arrayA.slice(2,4);
console.log(result);
```
output
```
[2,3]
```
[【JavaScript入門】sliceで文字列や配列(Array)を切り抜く方法まとめ](https://www.sejuku.net/blog/25488)

---

# map


---
# setTimeout


```javascript
function drawHint(canvas_id, puzzle) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	let posi = [[135, 1610], [930, 830], [1750, 830], [2545, 1610], [1750, 2400], [930, 2400]]

	ctx.font = '320px ZenMaruGothicRegular'; //文字のスタイルを指定
	ctx.fillStyle = '#000000';
	setTimeout(() => {
		for (let i = 0; i < 6; i++) {
			ctx.fillText(puzzle[i + 1], posi[i][0], posi[i][1]);
		}
	}, 100);

}
```
---

```javascript
function drawAns(canvas_id, puzzle) {
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	let posi = [[840, 1690], [1645, 1690]]


	setTimeout(() => {
		ctx.font = '500px ZenMaruGothicRegular'; //文字のスタイルを指定
		ctx.fillStyle = '#000000';
		for (let i = 0; i < 2; i++) {
			ctx.fillText(puzzle[0][i], posi[i][0], posi[i][1]);
		}
	}, 100);

}
```
---



[JavaScript　Mapオブジェクト](https://qiita.com/chihiro/items/9965cd7eca0380cf288c)
[JavaScriptで特定の文字列が含まれているか調べるメソッドの使い方](https://qiita.com/shimajiri/items/a2d79d9aa1323da972f3)
[【初心者向け】JavaScriptでHTMLの書き換え方法を解説！](https://webukatu.com/wordpress/blog/4649/#id)

---

[Math.random()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

---

[【JavaScript】let、const、varの違いと使い分け方法を徹底解説](https://techplay.jp/column/1619)

---

[【ES6】 JavaScript初心者でもわかるPromise講座](https://qiita.com/cheez921/items/41b744e4e002b966391a)

---

[配列の要素を順に取得する](https://www.javadrive.jp/javascript/array/index10.html)

[配列へ要素を追加する](https://www.javadrive.jp/javascript/array/index4.html#section2)

[JavaScript | split()で文字列を区切り文字で分割して配列に代入する方法](https://1-notes.com/javascript-split/)

[CanvasRenderingContext2D.fillText()](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillText)

[テキストボックスにフォーカスがある時にエンターキーでイベントを起動](https://oinusama.hatenadiary.org/entry/20090828/p1)

[【CSS】form inputのテキスト入力欄を選択したときに枠の色が変わるようにする方法](https://delaymania.com/201507/web/input-focus-webkit/)

[border](https://developer.mozilla.org/ja/docs/Web/CSS/border)

[パワーポイントを高解像度のjpeg画像に変換して保存する方法](https://powerpoint-univ.com/jpeg/)

[CanvasRenderingContext2D.fillText()](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillText)

[How can I use custom fonts in an HTML5 Canvas element?](https://stackoverflow.com/questions/2608022/how-can-i-use-custom-fonts-in-an-html5-canvas-element)



