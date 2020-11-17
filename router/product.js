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
        // let sql = `select * from shop_car where id=${req.query.id}`;
        let sql = `select * from shop_car`;
        // res.json(sql);
        conn.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
               res.json(result); 
            }
            /* if (result.length) {
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


router.route('/setItems')
    .get((req, res, next) => {
        // res.json(1);
        // let sql = `select * from product where id in (${req.query.idList})`;
        // res.json(req.query.total_price);
        let sql =`UPDATE shop_car  SET num = ${req.query.num},total_price =${req.query.total_price}  WHERE order_id = ${req.query.id}`;
        //  res.json(sql);
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    });
router.route('/removeItems')
    .get((req, res, next) => {
        // res.json(1);
        // let sql = `select * from product where id in (${req.query.idList})`;
        // res.json(req.query.total_price);
        let sql =`DELETE FROM shop_car  WHERE order_id = ${req.query.id}`;
        //  res.json(sql);
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    });
router.route('/add_Items')
    .get((req, res, next) => {
        // res.json(1);
        // let sql = `select * from product where id in (${req.query.idList})`;
        // res.json(req.query.total_price);
        let sql =`INSERT INTO shop_car(id, title, num, price, total_price,picture) VALUES('${req.query.id}','${req.query.title}','${req.query.num}','${req.query.price}','${req.query.total_price}','${req.query.picture}')`;
       /*  sql = sql.toString();
        console.log(sql); */
        //  res.json(sql);
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });
    });

module.exports = router;