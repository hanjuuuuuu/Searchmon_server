const express = require('express')
const cors = require('cors')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(express.static('public'));
app.use(bodyParser.json())

const corsOptions = {
    origin: function (origin, callback) {      
        callback(null, true)
    }, 
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
}
app.use(cors()) // config 추가

app.post('/hanju', (req, res) => {
    console.log('get hanju')
    const client_id = 'awZJoquuRitqGeG9TC_a';
    const client_secret = 'zd3zD6iUIB';
    const api_url = 'https://openapi.naver.com/v1/datalab/search';
    console.log(req.body);

    const {
         startDate,
         endDate,
         timeUnit,
         keywordGroups,
         device,
         ages,
         gender,
     } = req.body;
     const request_body = {
         startDate: startDate,
         endDate: endDate,
         timeUnit: timeUnit,
         keywordGroups: keywordGroups,
         device: device === "all" ? "" : device,
         ages: ages === "all" ? "" : ages,
         gender: gender === "all" ? "" : gender,
     };

     request.post({
         url: api_url,
         body: JSON.stringify(request_body),
         headers: {
             'X-Naver-Client-Id': client_id,
             'X-Naver-Client-Secret': client_secret,
             'Content-Type': 'application/json'
         }
     }, ( err, response, body )=>{
         res.send(body)
     })
})

app.listen(port, ()=>{
    console.log('im listening....')
})