// expressの読み込み
const express = require('express')
const app = express()
// sqlite3の読み込み
const sqlite3 = require('sqlite3')
const dbPath = 'app/db/database.sqlite3'
// body-parserの標準設定。
app.use(express.urlencoded({extended: false}))
// 静的ファイルへのパスを通します。
app.use(express.static(__dirname + '/statics'))

app.get('/api/v1/users', (req,res)=>{
    const db = new sqlite3.Database(dbPath)
    db.all('select * from users', (err,rows)=>{
        res.json(rows)
        console.log('ユーザーリストの取得')
    })
    db.close()
})

app.get('/api/v1/users/:id', (req,res)=>{
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id
    db.get(`select * from users where id = ${id}`, (err,row)=>{
        res.json(row)
        console.log('ユーザー情報の取得')
    })
})

app.post('/api/v1/users', (req, res)=>{
    // const db = new sqlite3.Database(dbPath)
    // body-parserで、受け取った値を運用
    const name = req.body.name
    const profile = req.body.profile ? req.body.profile : ""
    console.log(name)
    console.log(profile)
})

// PUTは、なぜかエラーがでますね。
app.put('api/v1/users/123', (req)=>{
    console.log('ここまでは実行されてる')
    const db = new sqlite3.Database(dbPath)
    db.run('update users set name = Bob where id = 6', (err)=>{
        console.log('ユーザー情報の更新')
        console.log(err)
    })
    db.close()
})

app.delete('/api/v1/users/:id', (req)=>{
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id
    db.run(`delete from users where id = ${id}`, (err)=>{
        console.log(err)
    })
    db.close()
})

app.search('/api/v1/search', (req,res)=>{
    const db = new sqlite3.Database(dbPath)
    const keyword = req.query.q
    db.all(`select * from users where name like "%${keyword}%"`, (err,rows)=>{
        res.json(rows)
    })
    db.close()
})

const port = process.env.PORT || 3000
app.listen(port)
console.log("Listen on port: " + port)












