/* ----------------------------------------------- */

// Express とはなにか？

// 今回はwebAPIサーバーを、Node.jsと、Expressを使って開発します。
// APIっつーのは、url , で、そのurlを押したら、他のデータを引っ張ってくるやつって認識でいいんかな。

// Expressを使うことで最小の構成でサーバーを構築できる。
// ・Express = Node.jsのwebアプリケーションフレームワーク
//     Expressはnpmでインストールできるパッケージのひとつ
//     Expressを使うことで、REST APIを、効率よく作ることができます。
//     Expressを使うことで、ゴリゴリとURI解析のコードを自前で書く必要がなくなる。
// ExpressはNode.js環境で使われる最も人気のあるWebアプリケーションフレームワークのうちの一つです。
// 最小限の機能を提供する薄いフレームワークになっていて、ユーザーの自由度が高い点が特徴的です。
//     Express は、それ自体では最小限の機能を備えたルーティングとミドルウェアの Web フレームワークです。
//     Express アプリケーションは基本的に一連のミドルウェア関数呼び出しです。
//     「Expressアプリケーションは一連のミドルウェア関数呼び出し」といえます。
//     つまり、ユーザーからのHTTPリクエストを受信しレスポンスを返すまでに、
//     いくつかのミドルウェア関数を通過し、リクエストからレスポンスまでのサイクルが完了します。



// 基本的な用語一覧

// ミドルウェア
// クライアント側からのHTTPリクエストを受け取ったときに、毎回、express内で共通させて行いたい処理(関数)をミドルウェアという
// まぁ、ミドルウェア関数 = Express内で記述されるただの関数。

// ルーティング
// クライアントからのリクエストに応じた処理を決めること

// app.js
// expressを使用してWebアプリケーションなどを作る際、最初に呼び出されるスクリプトファイル

// binフォルダ
// C言語でいうプリコンパイルみたいなもん

// publicフォルダ
// クライアント側で実行したい静的ファイルをぶちこむ

/* ----------------------------------------------- */

// Expressメソッド一覧


app.set(何か) // システム全体の設定


const path = require('path'); // パス結合をしてくれる path.join。
console.log(path.join('/a/b', 'c', 'd', 'e.txt')); // => /a/b/c/d/e.txt


// ミドルウェア関数を実行
app.use( [パス] ミドルウェア関数) // [パス]は省略可能で、省略すると、クライアントからのリクエストがあったときに、すべてのリクエストでミドルウェア関数が実行される。


// body-parser
// httpリクエストなどの、Message-bodyを解析する、body-parser
// extended: true にすると、解析された、Message-bodyが、配列で返ってくる。
app.use(express.urlencoded({extended: false}))
req.body.<inputのnameに指定した値> // これで、inputの値を受け取ることができます。


// クライアントにアクセスさせたい静的ファイルが格納されてるフォルダを設定。
app.use(express.static(__dirname + '/public'))
__dirname // プロジェクト全体のファイルのリンク
'/public' // 静的ファイルが格納されてるフォルダ名
express.static() // 静的ファイルが格納されてるフォルダへのリンクを指定する。


app.get('パス', ミドルウェア関数) // クライアントから'パス'へのGET要求があったときに実行する処理


// res.end(), res.send(), res.json() について
res.send(), res.json()
// JSON を返す時は res.send({}) でも res.json({}) でも全く同じ結果になる。
res.end() // Node.js の response.end() と同じモノ。
// 引数を渡さずに使うことで、空のレスポンスを返す用に使うのが良い。


/* ----------------------------------------------- */
// 実際に使ってみた０２

// next の使い方
const cont1 = (req,res,next)=>{
    console.log('cont1を出力')
    next() // cont1関数が、ミドルウェアに当たります。(定義的にいうと)
}
const cont2 = (req,res,next)=>{
    console.log('cont2を出力')
    res.send('処理終了')
}
app.get('/hello', cont1,cont2)


// app.use()の使い方
// 引数を省略することで、全てのhttpリクエストに反応します。
const f_cont1 = (req,res,next)=>{
    res.send('httpリクエストがきた')
}
app.use(f_cont1)

// httpリクエストで静的ファイルを返す、express.static
// http://localhost:3000/静的ファイル名 で、表示可能
app.use(express.static(__dirname + '/statics'))






/* ----------------------------------------------- */
// 実際に使ってみた０１

// require = モジュール化されたJSファイルをNode.jsから読み込む。
var express = require('express') // パッケージ
var sample = require('./sample.js') // モジュール

// process.env というのが、ローカルの環境変数を参照する。
// ローカルの環境変数が設定されていない場合、3000番を使うというコード
const port = process.env.PORT || 3000
app.listen(port)
// npm start を実行したときに、実行される、console.log
console.log("Listen on port: " + port)
/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// express基本の書き方
// expressのgetメソッドでこのURIにアクセスしたら、Hello worldを返すAPIです？API？
const app = express()
app.get('/api/v1/hello', (req,res)=>{
    res.json({"message":"hello world"})// json()の中に書いた、オブジェクト(辞書)をjsonとして返します。
}) 

// express書き方、省略ver
app.get('/hello', (req,res)=>{
    res.json('everything ok')
    res.json('res.json() は、１つしか出力しません') // res.json() 重複するとエラります。
    console.log('ログは、node-dev を実行したターミナルに表示されます。')
})

// express で、データベースから、フィールドを取得。
app.get('/hello', (req,res)=>{
    const db = new sqlite3.Database(dbPath)
    db.all('select name from users', (err,rows)=>{
        res.json(rows)
    })
    db.close()
})

// express url を引数にとる方法
app.get('/api/v1/users/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
})

/* ----------------------------------------------- */
// Node.js のsqlite3 基本のメソッド

const dbPath = 'app/db/database.sqlite3'
const db = new sqlite3.Database(dbPath, ()=>{'コールバック関数'}) // データベース接続の開始

db.serialize(()=>{/* queries */}) // 内部のSQLクエリを同期的に実行
    // 複数のSQLクエリを同期的に実行したいときに使う。
db.all(sql, (err,rows)) // 複数の結果を取得
    // querySelectorAllみたいなもんや。
db.get(sql, (err,row)) // 1つだけの結果を取得
    // querySelectorみたいな感じや。
db.run(sql, (err)) // SQLクエリを実行
    // 結果を取得せず、ただ、SQLクエリを実行するだけ。
db.close() // データベース接続を終了
    // 必ず、最後に終了させる必要があるらしい。


// like句を使って、パターンマッチング(検索機能)を実装。
db.all(`select * from users where name like "%${keyword}%"`, (err,rows)=>{
    res.json(rows)
})

/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* ----------------------------------------------- */




