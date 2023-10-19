
// 今回は、web上に存在するapi -> openweather api というものを使います。
// 個人情報となる、API Key を、別のファイルで管理して、
// 匿名的に、http通信を行うため、dotenv というモジュールを使っていきます。
const request = require('request')
const https = require('https')

const options = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=9ae324b06ad224d5b6fe0b7840b3aefd',
    method: 'GET',
    json: true
}
request(options,(error,response,body)=>{
    console.log(body)
    console.log(body.main.temp)
})

// 気温を摂氏のデータで取得する
Insert = '&units=metric'
api_body = `q=London${Insert}&appid=`


dotenvモジュールの使い方を webサイトで調べて、習得して、
はい。まぁ、youtubeのつづきですよね。