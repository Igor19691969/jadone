'use strict';


var mongoose = require('mongoose'),
    nodemailer = require("nodemailer"),
    User = mongoose.model('User'),
    moment = require('moment'),
    _=require('underscore'),
    Order = mongoose.model('OrderArch');
var OrderM = mongoose.model('Order');

/**
 * Get awesome things
 */
exports.list= function(req, res) {
    var query = (req.query.user)?{'user':req.query.user}:null;
   // console.log(req.query.user);
    Order.find(query)
       .sort('-num')
        //.select('name index country region')
        .exec(function (err, result){
            if (err)
                return res.json(err);
            else {

                return res.json(result);
            }
        })
}


exports.get= function(req, res) {
    //console.log(req.body);
    Order.findById(req.params.id)

        .exec(function (err, result) {

        if (err) return res.json(err);

        res.json(result);})


}

exports.delete = function(req,res,next){
    if (req.query.remain && req.query.remain=='remain'){
        Order.findOne({_id:req.params.id}, function (err,doc) {
            if (err) {console.log(err);return next(err);}
            doc.status=2;
            doc.date2='';
            doc.date3='';
            doc.date4='';
            var upsertData = doc.toObject();
            delete upsertData._id;
            OrderM.update({_id: doc._id}, upsertData, {upsert: true},
                function(e, result){
                    if (e) return next(e)
                    res.json({});
                })


        })
    }else {
        Order.findByIdAndRemove(req.params.id, function (err,doc) {
            if (err) {console.log(err);return res.json(err);}

            res.json({});
        })
    }

}
