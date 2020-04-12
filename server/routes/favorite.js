const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) =>{

    //mongoDBからfavorite数を取得する
    Favorite.find({ "movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            //Frontへfavorite数を渡す。
            return res.status(200).json({
                 success: true, favoriteNumber: info.length })
        })

})

router.post('/favorited', (req, res) =>{

    //自分のfavorite情報確認
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            //Frontへfavorite数を渡す。

            let result = false;
            if(info.length !== 0) {
                result = true;
            }
            return res.status(200).json({
                 success: true, favorited: result })
        })

})

router.post('/removeFromFavorite', (req, res) =>{

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) =>{
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, doc })
        })
})

router.post('/addToFavorite', (req, res) =>{

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json( { success: true} )
    });

})

module.exports = router;