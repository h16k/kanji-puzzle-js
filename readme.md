---
marp: true
---
- [JavaScript入門](#javascript入門)
  - [漢字パズル生成ツールを作ろう](#漢字パズル生成ツールを作ろう)
- [環境](#環境)
  - [VSCodeを想定](#vscodeを想定)
- [HTMLの雛形を作成する](#htmlの雛形を作成する)
- [HTMLのPreviewを表示する](#htmlのpreviewを表示する)
  - [拡張機能「HTML Preview」をインストールする](#拡張機能html-previewをインストールする)
  - [方法１](#方法１)
  - [方法２](#方法２)
- [HTMLからjsファイルを読み込むタグ](#htmlからjsファイルを読み込むタグ)
  - [****](#)


---
# HTML&CSS&JavaScript入門
## 漢字パズル生成ツールを作ろう

---
# HTMLタグ速習
# <h1>見出し１</h1>
## <h2>見出し２</h2>
### <h3>見出し３</h3>
#### <h4>見出し４</h4>
<p>平文</p>

- <li>リスト</li>


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
# HTMLからjsファイルを読み込むタグ
## **<script src="">**
```html
<html>
  <body>
    <script src="sample1.js"></script>
  </body>
</html>
```

---

