var express=require("express")
var router=express.Router()
var db=require("../models")


router.get('/', function(req, res){
    db.Table.find()
    .then(function(tables){
        res.json(tables)
    })
    .catch(function(err){
        res.send(err)
    })
    
})


router.post('/', function(req, res){
    var username = req.user.username
    var name = req.body.name;
    
    db.Table.create({username:username, name:name})
    .then(function(newTable){
        res.json(newTable)
        
    })
    .catch(function(err){
        res.send(err)
    })
})


router.get('/:tableId', function(req, res){
    db.Table.findById(req.params.tableId)
    .then(function(foundTable){
        res.json(foundTable)
    })
    .catch(function(err){
        res.send(err)
    })
})


router.put('/:tableId', function(req, res){
    db.Table.findOneAndUpdate({_id: req.params.tableId}, req.body, {new:true})
    .then(function(table){
        res.json(table)
    })
    .catch(function(err){
        res.send(err)
    })
})


router.delete('/:tableId', function(req, res){
    db.Table.remove({_id: req.params.tableId})
    .then(function(){
        res.json({message: 'Deleted!!'})
    })
     .catch(function(err){
        res.send(err)
    })
})




module.exports=router;