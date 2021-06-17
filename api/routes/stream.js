const { Router } = require('express')
const { get } = require('.')
const mysql = require('../connections/mysql')
const router = Router()
const random = require('../plugins/random')
function sendSuccessStatus(res, status){
    res.send({
        success: status
    })
}
router.post('/create_code', function(req, res, next) {
    // destroy streaming code
    if (req.session.uid){
        let randomCode = random(30);
        let deletePrevious = `delete from streaming_code where user_id = ${req.session.uid}`;
        mysql.query(deletePrevious);
        let createCode = `insert into streaming_code (code, user_id) values('${randomCode}', ${req.session.uid});`
        mysql.query(createCode)
        return res.send({
            success: true,
            code: randomCode
        })
    }
})

router.get('/get_code', function(req, res, next) {
    if (req.session.uid){
        let get_code = `select code from streaming_code where user_id = ${req.session.uid};`;
        mysql.query(get_code, (err, result) => {
            if (result[0]){
                res.send({
                    success: true,
                    code: result[0].code
                })
            }
        })
    }
})

router.get('/get_code_by_email', function(req, res, next) {
    if (req.query.email){
        let get_code = `select code from streaming_code, users where streaming_code.user_id = users.id and users.email = '${req.query.email}'`;
        mysql.query(get_code, function(err, results) {
            if(results[0]){
                return res.send({
                    success: true,
                    code: results[0].code
                })
            }
        })
    }
})

router.post('/create_audience_code', (req, res, next) => {
    if (req.session.uid){
        
        let addAudienceCode = `
            insert into audience_code (code, counter, user_id)
            values ('${req.body.code}', ${req.body.counter}, ${req.session.uid});
        `
        mysql.query(addAudienceCode, function (err, results) {
            if (err){
                res.send({
                    success: false
                })
            }
            else{
                return res.send({
                    success: true,
                })
            }
        })
    }
})

router.post('/check_audience_code', (req, res, next) => {
    let streamerEmail = req.body.streamerEmail;
    let code = req.body.code;
    
    let stmt = `
        SELECT b.id as audience_code_id, b.counter as counter FROM users as a, audience_code as b
        WHERE a.email = '${streamerEmail}' AND
        b.code = '${code}' AND
        a.id = b.user_id;
    `
    mysql.query(stmt, (err, result) => {
        if (err){
            res.send({success: false, msg: '資料庫發生錯誤'})
        }
        else{
            if (!result[0])
            {
                return res.send({ success: false, msg: '使用者不存在' })
            }
            let counter = result[0].counter || -1;
            let audience_code_id = result[0].audience_code_id;
            if (counter === 1){
                // delete the rows and success
                let deleteRow = `DELETE FROM audience_code where id = ${audience_code_id};`
                mysql.query(deleteRow, (err, result) => {
                    if (err){
                        return res.send({success: false, msg: '資料庫發生錯誤'})
                    }
                })
                return res.send({success: true})
            }
            let updateCounter = `
                UPDATE audience_code SET counter = counter -1 WHERE id = ${audience_code_id};
            `
            mysql.query(updateCounter, (err, results)=> { 
                if (err){
                    res.send({success: false, msg: '資料庫發生錯誤'})
                }
                else{
                    if ( Number(counter) > 0 ){
                        res.send({
                            success: true
                        })
                    }
                    else{
                        res.send({success: false, msg: '金鑰使用次數已經完畢'})
                    }
                }
            })
        }
    })
})
module.exports = router