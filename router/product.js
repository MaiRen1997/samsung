const express = require('express');
const conn = require('../dao/conn');
const router = express.Router();

router.route('/getProducts')
    .get((req, res, next) => {
        // res.json(type);
        let sql = `select * from product where type = '${req.query.type}'`;
        // res.json(sql);
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    });

    /* router.route('/getProducts')
    .get((req, res, next) => {
        let sql = 'select * from product';
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    }); */


router.route('/getItem')
    .get((req, res, next) => {
        let sql = `select * from shop_car where id=${req.query.id}`;
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            else{
               res.json(result); 
            }
            /* if (result.length) {
                res.cookie('username', req.body.username);
                res.cookie('isLogined', true);
                res.json({
                    msg: "查询成功",
                    error: 0,
                    result:result
                });
            }
            else{
                res.json({
                    msg: "查询失败",
                    error: 1
                }); 
            } */
            // res.json(req.query.id);
        });
    });


/* router.route('/getItems')
    .get((req, res, next) => {
        let sql = `select * from product where id in (${req.query.idList})`;

        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    }); */

module.exports = router;