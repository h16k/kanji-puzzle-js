---
marp: true
---
# HTML&CSS&JavaScript入門
## 漢字パズル生成ツールを作ろう
## ➡　[Demo](https://h16k.github.io/kanji-puzzle-js/) 
---
# 目次
- [HTML\&CSS\&JavaScript入門](#htmlcssjavascript入門)
	- [漢字パズル生成ツールを作ろう](#漢字パズル生成ツールを作ろう)
	- [➡　Demo](#demo)
- [目次](#目次)
- [HTML](#html)
	- [index.html](#indexhtml)
		- [index.html (body)](#indexhtml-body)
		- [アプリ名](#アプリ名)
		- [答えとなる熟語を入力する場所](#答えとなる熟語を入力する場所)
		- [パズル生成ボタン](#パズル生成ボタン)
		- [色選択・変更ボタン](#色選択変更ボタン)
		- [パズル生成結果のお知らせ](#パズル生成結果のお知らせ)
		- [生成したパズル画像を表示する場所](#生成したパズル画像を表示する場所)
- [Javascript](#javascript)
	- [puzzleList.js](#puzzlelistjs)
		- [パズル生成のためのデータ](#パズル生成のためのデータ)
		- [パズル生成のためのデータを１行ごとに分割](#パズル生成のためのデータを１行ごとに分割)
		- [後で使うリストとマップを用意](#後で使うリストとマップを用意)
		- [パズルのデータを使いやすい形に整理する① 繰り返し処理](#パズルのデータを使いやすい形に整理する-繰り返し処理)
		- [パズルのデータを使いやすい形に整理する② 繰り返しの中身①](#パズルのデータを使いやすい形に整理する-繰り返しの中身)
		- [パズルのデータを使いやすい形に整理する③ 繰り返しの中身②](#パズルのデータを使いやすい形に整理する-繰り返しの中身-1)
		- [パズルのデータを使いやすい形に整理する③ 繰り返しの中身③](#パズルのデータを使いやすい形に整理する-繰り返しの中身-2)


---
# HTML
## index.html
---
### index.html (body)
```html
<body>
    <h2>Kanji Puzzle Maker</h2>


    <input name="答え" type="text" id="answerText" placeholder="漢字２文字で入力" onkeypress="enter(event.keyCode);">
    
    <button onclick="createPuzzleProcess();"> 生成</button>
    <br>
    <input type="radio" id = "blue" name="tempColor" value="blue" checked onclick="colorChange();">
        <label for = "blue">Blue</label>
    <input type="radio" id = "green" name="tempColor" value="green" onclick="colorChange();">
        <label for = "green">Green</label>
    <input type="radio" id = "orange" name="tempColor" value="orange" onclick="colorChange();">
        <label for = "orange">Orange</label>    
    <input type="radio" id = "pink" name="tempColor" value="pink" onclick="colorChange();">
        <label for = "pink">Pink</label>
    
    <h3 id="createResult"></h3>
    
    <p id="note"></p>

    <canvas id="puzzleCanvas"></canvas>
    <canvas id="answerCanvas"></canvas>
</body>
```
---
### アプリ名
```html
<h2>Kanji Puzzle Maker</h2>
```
- 見出しの部分
---
### 答えとなる熟語を入力する場所
```html
<input name="答え" type="text" id="answerText" placeholder="漢字２文字で入力" onkeypress="enter(event.keyCode);">
```
- `<input>`は入力フォームを作成するタグ
- `name`は`input`タグの名前
- `type`は入力するデータの種類
- `id`はタグを一意に識別できる名前
- `placeholder`は何も入力していないときにうっすら表示されるテキスト
- `onkeypress`で、この入力フォームの中で何かキーが押されたときの処理を指定
  - ここでは`enter`という関数を呼び出している
    - 引数は「押したキー（のコード）」
---
### パズル生成ボタン
```html
<button onclick="createPuzzleProcess();">生成</button>
```
- `<button></button>`はボタンを作成するタグ
- タグの間にボタンに表示するテキストを書く
- `onclick`で、このボタンが押されたときに行う処理を指定
  - ここでは、`createPuzzleProcess()`を実行

```html
<br>
```
- 改行
---
### 色選択・変更ボタン
```html
<input type="radio" id = "blue" name="tempColor" value="blue" checked onclick="colorChange();">
<label for = "blue">Blue</label>
<input type="radio" id = "green" name="tempColor" value="green" onclick="colorChange();">
<label for = "green">Green</label>
---略---
```
- `<input>`で`type="radio"`にすることで、ラジオボタンを作成できる
- `value`でこのボタンが選択されているときに何という値として扱うかを指定
- `checked`をつけると最初から選択状態になる
- `name`が同じラジオボタンは1つのグループ扱いとなる
  - ユーザーはこの中から１つしか選択できない
- `<label>`でinputタグにラベルを付ける
  - `for = "blue"`だったら`id="blue"`のinputタグと紐づく
  - ○の横にblueなどと表示されるようになる
---
### パズル生成結果のお知らせ
```html
<h3 id="createResult"></h3>

<p id="note"></p>
```
- `<h3></h3>`で見出し3（３番目に大きい見出し）を作成
  - 最初の状態では何も表示するものがない
    - あとでパズルの生成結果に応じてテキストが入ることになる
    - `id`を手掛かりに
- `<p></p>`で段落を作成
  - 最初の状態では何も表示するものがない
    - あとでパズルの生成結果に応じてテキストが入ることになる
    - `id`を手掛かりに
---
### 生成したパズル画像を表示する場所
```html
<canvas id="puzzleCanvas"></canvas>
<canvas id="answerCanvas"></canvas>
```
- `<canvas></canvas>`で図を表示する場所を作成できる
  - 最初の状態では何も表示するものがない
    - あとでパズルの生成結果に応じてパズルの画像が入ることになる
    - `id`を手掛かりに
---
# Javascript
## puzzleList.js
---
### パズル生成のためのデータ
```javascript
const stringPuzzles = `哀楽 哀願 安楽 音楽 快楽 楽園 楽屋 ---略---';
```

- 文字列を`stringPuzzles`に格納
- 文字列は、１行ごとに↓
  - 先頭に「答えとなる熟語」　
  - その後ろに「答えの１文字目or２文字目を使った熟語」が並んでいる
  - 上の例では「哀楽」が答えで、哀や楽を使った熟語が後ろに並んでいる
    - 熟語は常用漢字を使ったもののみ
      - 難易度が高くなりすぎないように
---

### パズル生成のためのデータを１行ごとに分割
```javascript
const puzzleStringDividedPerLine = stringPuzzles.split('\n');
```
- `stringPuzzles`に格納されている文字列を１行ごとに分割し、`puzzleStringDividedPerLine`に格納
  - `.split()`で文字列を分割できる
    - `()`にはどこで分割するかを指定
      - ここでは改行を表す`\n`で分割
      - ほかにも、例えば`split(',')`にすればカンマで分割される
  - `puzzleStringDividedPerLine`はリストになっている
    - `["哀楽 哀願 安楽 音楽 快楽 楽園 ...","悪意 悪化 悪寒 悪気 悪口 ...", ...] `
    - というイメージ

---
### 後で使うリストとマップを用意
```javascript
const hintList = [];
const puzzleIndexMap = new Map();
```
- `hintList`と`puzzleIndexMap`を用意しておく
  - `hintList`は配列
  - `puzzleIndexMap`はマップ
	- マップはキー（key）とそれに対応する値（value）を対応させて保持するオブジェクト
	- [参考](https://camp.trainocate.co.jp/magazine/javascript-map/)

---
### パズルのデータを使いやすい形に整理する① 繰り返し処理
```javascript
puzzleStringDividedPerLine.forEach(function(puzzleString, ind){
	------------略----------
});
```
- `配列名.forEach( コールバック関数(要素の値, 要素のインデックス) )`
  - 配列の先頭から要素を１つずつ呼び出して`コールバック関数`を実行
    - 要素の値は`要素の値`に、
    - 要素のインデックスは`要素のインデックス`に渡される
  - 今回の場合
    - `puzzleStringDividedPerLine`の要素を１つずつ取り出しながら、要素を`puzzleString`に、要素のインデックスを`ind`に渡して`function`を実行

---
### パズルのデータを使いやすい形に整理する② 繰り返しの中身①
```javascript
puzzleStringDividedPerLine.forEach(function(puzzleString, ind){
    let aPuzzle = puzzleString.split(' ');
    hintList.push(aPuzzle.slice(1,-1));
    puzzleIndexMap.set(aPuzzle[0], ind);

});
```
- `let aPuzzle = puzzleString.split(' ');`の部分
  - puzzleStringの中身は、 `["哀楽 哀願 安楽 音楽 快楽 楽園 ...","悪意 悪化 悪寒 悪気 悪口 ...", ...] `のようなリストの要素
    - `"哀楽 哀願 安楽 音楽 快楽 楽園 ..."`というような感じ
  -  これを空白で分割し、`["哀楽", "哀願", "安楽", "音楽", "快楽", "楽園" ...]`というようなリストを作成
---

### パズルのデータを使いやすい形に整理する③ 繰り返しの中身②
```javascript
puzzleStringDividedPerLine.forEach(function(puzzleString, ind){
    let aPuzzle = puzzleString.split(' ');
    hintList.push(aPuzzle.slice(1,-1));
    puzzleIndexMap.set(aPuzzle[0], ind);

});
```
- `hintList.push(aPuzzle.slice(1,-1));`の部分
  -  `aPuzzle`は、`["哀楽", "哀願", "安楽", "音楽", "快楽", ...]`という感じ
  -  これ（の一部）を`hintList`に追加（`配列名.push()`：`()`内を配列に追加）
     -  `hintList`は`[["哀願", "安楽", "音楽", "快楽", "楽園" ...],["悪化", "悪寒", "悪気", "悪口", ...]]`というような二次元の配列に
     -  `aPuzzle.slice()`によって配列の一部を取り出す（詳しくは後ほど）
---

### パズルのデータを使いやすい形に整理する③ 繰り返しの中身③
```javascript
puzzleStringDividedPerLine.forEach(function(puzzleString, ind){
    let aPuzzle = puzzleString.split(' ');
    hintList.push(aPuzzle.slice(1,-1));
    puzzleIndexMap.set(aPuzzle[0], ind);

});
```
- `puzzleIndexMap.set(aPuzzle[0], ind);`の部分
  - `マップ名.set(キー,値)`で、マップにキーと値を登録
  - ここでは`puzzleIndexMap`に以下を登録
    - **キー：**`aPuzzle`の先頭の要素
      - `aPuzzle`は、`["哀楽", "哀願", "安楽", "音楽", "快楽", ...]`という感じなので、先頭の要素＝答えとなる熟語
    - **値：**`ind`
      - こうすることで、キーの熟語が答えになるパズルを作るときに、`hintList`の何番目を見たらいいかがわかるようになる

---






















<!-- # aaa
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


 -->
