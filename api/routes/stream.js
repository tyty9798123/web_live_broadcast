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
module.exports = router