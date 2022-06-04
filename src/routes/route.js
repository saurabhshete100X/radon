const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();



router.get('/movies', function(req, res){
  let arr = ["Rang de basanti","The shining","Lord of the rings","Batman begins"]

    res.send(arr)
})
router.get('/movies/:indexNumber', function(req, res){
    let arr = ["Rang de basanti","The shining","Lord of the rings","Batman begins"]
    let i = req.params.indexNumber
    if(i <arr.length){
        movie = arr[i];
    }
    else{
        movie = ("Enter valid index")
    }
      res.send(movie)
  })
  
  router.get('/films', function(req, res){
    let arr = [
        {
            "id":1,
            "name": "The shining"
        },
        {
            "id":2,
            "name": "incendies"
        },
        {
            "id":3,
            "name": "Rang de basanti"
        },
        {
            "id":4,
            "name": "Finding Nemo"
        },
    ]
  
      res.send(arr)
  })

  router.get('/films/:filmid', function(req, res){
    let arr = [
        {
            "id":1,
            "name": "The shining"
        },
        {
            "id":2,
            "name": "incendies"
        },
        {
            "id":3,
            "name": "Rang de basanti"
        },
        {
            "id":4,
            "name": "Finding Nemo"
        },
    ]
  
    let index = req.params.filmid -1

    if(index <arr.length ){
        movie = arr[index];
      }
    else{
        res.send ("No movie exists with this id")
    }

      res.send(movie)
  })




module.exports = router;
// adding this comment for no reason