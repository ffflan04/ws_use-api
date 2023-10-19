// require()とは？
// require　は 「CommonJS」 形式によるモジュールの読み込み方法。
const foo = require('./bar.js') // require形式で、外部のJSファイルを読み込む。
const item = require(__dirname + '/../static/sample.js')

// importとは？
// import は 「ECMAScript」 形式によるモジュールの読み込み方法。
import { foo } from './foo.js'

// exportsとは？
// 指定した値を外部のNode.jsファイルから読み込んで再利用することができます。
module.exports.プロパティ名 = 値
module.exports.func = ()=>{console.log('青春ブタ野郎')}
module.exports.obj = {price: 120, freshness: "fresh"}

// httpモジュールとは？
// httpモジュールはhttpサーバを構築する上で必要な機能を提供するモジュールです。
// また、httpモジュールは標準モジュールといい、Node.jsに元から含まれているモジュールの1つです。
const http = require("http"); // httpモジュールを読み込む

// createServer()とは？
// Webサーバーを構築する。
var server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>見出し</h1>')
    res.end()
})

// res.writeHead()、res.write()、res.end()とは？
// HTTPレスポンスは以下の3要素で構成されます。
// ステータス行 = ステータス行では主にHTTPリクエストの成否データが入る
// ヘッダー = 送信するデータの情報などの追加情報が入る
// 本文 = データの内容が入る
// writeHead()メソッドは第1引数にステータス行に入れるデータ、
// 第2引数にヘッダー情報に入れるデータを指定します。
// res.write()は、レスポンスbodyを指定できます。
// res.end()は、コンテンツ出力の完了を示します。
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<h1>見出し</h1>')
res.end()

// listen()とは？
// サーバー待機状態時のポート番号を指定します。
// createServerで構築したオブジェクトに、listen()メソッドは含まれます。
server.listen(3000)

// localhostとは？
// localhostは特殊で、自身のPCを示しており、IPアドレスに変換すると、127.0.0.1となります。
'http://localhost:3000/'

// fsモジュールとは？
// fsモジュールはファイルを扱うためのモジュールで、ファイルから書き出したり、
// ファイルに書き込んだりするときに役立ちます。
const fs = require('fs');
//fs.readFile(ファイルのパス, 文字コード, コールバック関数)
const html = fs.readFile(__dirname + '/../static/index.html','utf8',(err,data)=>{
    console.log('読み込むデータ ->' + data)
})
//fs.writeFile(ファイルのパス, 書き込む文字, 文字コード, コールバック関数)
fs.writeFileSync('./text.txt', "こんにちは", utf-8, (err) => {
    // 新規ファイルへ書き込み
})

// server.on()メソッドとは？
addListener(e, function) // 指定したイベントにイベントハンドラを登録する
on(e, function) // 指定したイベントにイベントハンドラを登録する（addListerメソッドの別名）
once(e, function) // 指定したイベントに一度だけ実行されるイベントハンドラを登録する
server.on('request', doRequest); // httpリクエストの、イベントハンドラ
// res.on(), req.on()とは？
// httpメソッドのイベントハンドラ
res.on('data'), req.on('data') // 所持してるデータの、イベントハンドラ
res.on('end'), req.on('end') // httpメソッドの処理完了時の、イベントハンドラ

// URLパルサーとは？
// URLの詳細情報を、得ることができます。
const url_parts = new URL(req.url,'http://localhost:3000')
console.log(url_parts)

// 標準ライブラリ querystring とは？
// クエリ文字列をオブジェクト形式に変換してくれる便利な奴。
// 引数を設定すれば、セパレータやオプションを設定することができます。
let qs = require('querystring')
console.log(parse("login=yes")) // { login: 'yes' }

// https.getメソッドとは？
// 指定した URL に、http通信を行えるメソッド
const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=9ae324b06ad224d5b6fe0b7840b3aefd'
const https = require('https')
const data = []
https.get(url, (res)=>{
    res.on('data',(chunk)=>{
        data.push(chunk) // 断片的なデータを逃さない
    })
    res.on('end',()=>{
        textData = data.toString()
        console.log(textData)
    })
})

// request()メソッドとは？
// 指定した'url'に、httpリクエストを送れるメソッド
// https.getメソッドよりも、スマートな記述で実装できます。
// npm i request でインストールして使います。
const request = require('request')
const options = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=9ae324b06ad224d5b6fe0b7840b3aefd',
    method: 'GET',
    json: true // jsonデータを、予めオブジェクト型に変換してくれます。
}
request(options,(error,response,body)=>{
    console.log(body) // >> typeof object
})

// dotnev

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* ------------------- 応用編 ----------------------------- */

// node.jsで、cssファイルを読み込む

// index.htmlに、cssファイルを読み込むpathを埋め込むことで実現
const getReq = (req,res)=>{
    const url = req.url
    console.log('url = ' + req.url)
    switch (url) {
        case '/cont01':
            fs.readFile(__dirname + '/../static/index.html','utf-8',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(data)
                res.end()
            })
            break;
        case '/style.css':
            fs.readFile(__dirname + '/../static/style.css','utf8',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/css'})
                res.write(data)
                res.end()
            })
            break;
    }
}
/* -------------------------------------------------------- */

// Node.js で、HTML form-postメソッドで送られたデータを受け取る

// formの、name属性で指定した値を、受け取れます。
const formInspect = (req,res)=>{
    let ASCII = ''
    req.on('data',(data)=>{
        ASCII += '' + data // 一度のhttpリクエストで、複数回にわたって、データを送信されるので。
    })
    req.on('end',()=>{
        ASCII = qs.parse(ASCII)
        res.end(ASCII.message) // name="message"
    })
}

// POSTメソッドで、処理を分岐させる。
if (req.method == 'POST'){
    formInspect(req,res)
}

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
/* -------------------------------------------------------- */
