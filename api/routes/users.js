const { Router } = require('express')
const mysql = require('../connections/mysql')
const router = Router()

function sendSuccessStatus(res, status){
    res.send({
        success: status
    })
}
router.post('/sign_up', function(req, res, next) {
    if (req.body.email != undefined && req.body.password != undefined){

        let query = `
            INSERT INTO users (email, password)
            VALUES ('${req.body.email}', '${req.body.password}');
        `;
        mysql.query(query, (err, results) => {
            if (err){
                return sendSuccessStatus(res, false)
            }
            else{
                return sendSuccessStatus(res, true)
            }
        })
        
    }
})

router.post('/log_in', function(req, res, next) {
    if (req.body.email != undefined && req.body.password != undefined) {

        let query = `
            SELECT id from users 
            where email = '${req.body.email}' and password = '${req.body.password}';
        `
        mysql.query(query, (err, results) => {
            if (err){
                return sendSuccessStatus(res, false)

            }
            else{
                if (results[0]){
                    req.session.uid = results[0].id;
                    return sendSuccessStatus(res, true)
                }
                else{
                    return sendSuccessStatus(res, false)
                }
            }
        })
    }
})

router.post('/is_user', function(req, res, next) {
    if (req.session.uid != undefined) {
        return res.send({user_id: req.session.uid})
    }
    return res.send({user_id: -1})
})

module.exports = router