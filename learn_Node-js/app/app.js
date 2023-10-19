const http = require('http')
const fs = require('fs')
const item = require(__dirname + '/../static/sample.js')
const ejs = require('ejs')
const qs = require('querystring')

// style.cssの内容を読み込みます。
const css = fs.readFileSync(__dirname + '/../static/style.css','utf8',(err,data)=>{
    if (err){console.log('エラー発生' + err)}
})
// index.htmlの内容を読み込みます。
const html = fs.readFileSync(__dirname + '/../static/index.html','utf8',(err,data)=>{
    if(err){console.log(err)}
})
// index.ejs の内容を読み込みます。(ejs.render()メソッドにかけるために)
const template = fs.readFileSync('./ejs/index.ejs','utf-8',(err,data)=>{
    if(err){console.log('エラー発生だっちゃ' + err)}
})
// formを受信した時の処理
const formInspect = (req,res)=>{
    let ASCII = ''
    req.on('data',(data)=>{
        ASCII += '' + data
        console.log('関数１')
    }).on('end',()=>{
        ASCII = qs.parse(ASCII)
        console.log(ASCII.message)
        res.end(ASCII.message)
    })
}


// ルーティング設定をする関数
const getReq = (req,res)=>{
    const url_parts = new URL(req.url,'http://localhost:3000')
    console.log(url_parts)
    const url = req.url
    console.log('url = ' + req.url)
    console.log(req.method)
    switch (url) {
        case '/cont01':
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(html)
            res.end()
            break;
        case '/style.css':
            res.writeHead(200,{'Content-Type':'text/css'})
            res.write(css)
            res.end()
            break;
        case '/cont02':
            if(req.method == 'POST'){
                formInspect(req,res)
            }else{
                const rend_temp = ejs.render(template)
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(rend_temp)
                res.end()
            }
            break
        default:
            res.writeHead(404,{'Content-Type':'text/html'})
            res.write('<p>searched results not found</p>')
            res.end()
            break
    }
}

// webサーバーを構築します。
const server = http.createServer()
// onメソッドでイベントハンドラを設定
server.on('request',getReq)
server.listen(3000)
console.log('3000番ポート開放中..')

// require()で読み込んだ外部JSファイルのメソッドを実行
item.func()

