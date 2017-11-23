var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Passenger = mongoose.model('Passenger');
var RegularCard = mongoose.model('RegularTravelCard');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all drugs from the database
router.get('/', auth.optional, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    //if (!user) { return res.sendStatus(401); }

    Passenger.find({})
      .then(function (passengers) {
        if (!passengers) { return res.sendStatus(404); }
        return res.json({
            passengers: passengers
        });
      }).catch(next);

  });
});

router.get('/regularCard', auth.optional, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
      //if (!user) { return res.sendStatus(401); }
  
      RegularCard.find({})
        .populate('card_holder')
        .then(function (passengers) {
          if (!passengers) { return res.sendStatus(404); }
          return res.json({
              passengers: passengers
          });
        }).catch(next);
  
    });
  });

//Add new drug to the database
router.post('/', auth.optional, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    //if (!user) { return res.sendStatus(401); }

    var passenger = new Passenger(req.body.passenger);
    return passenger.save().then(function () {
      return res.json( { status : "SUCCESS"});
    });
  }).catch(next);
});

router.post('/regularCard', auth.optional, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
      //if (!user) { return res.sendStatus(401); }
  
      var card = new RegularCard(req.body.card);
      return card.save().then(function () {
        return res.json( { status : "SUCCESS"});
      });
    }).catch(next);
});

// //Getting by quering the drug id
// router.get('/:drugid', auth.required, function (req, res, next) {

//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     Drug.findOne({ drug_srno: req.params.drugid })
//       .then(function (drug) {
//         if (!drug) { return res.sendStatus(404); }
//         return res.json({
//           drug: drug
//         });
//       }).catch(next);

//   });
// });

// //Delete drug by quering the drug id
// router.delete('/:drugid', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     Drug.remove({ drug_srno: req.params.drugid })
//       .then(function (status) {
//         return res.json( { status : "SUCCESS"});
//       })
//       .catch(next);
//   }).catch(next);
// });

// //Update drug by drug id
// router.put('/:drugid', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     Drug.findOne({ drug_srno: req.params.drugid })
//       .then(function (drug) {
//         if (!drug) { return res.sendStatus(404); }
//         drug.drug_name = req.body.drug.drug_name;
//         drug.drug_price = req.body.drug.drug_price;
//         drug.drug_current_quantity = req.body.drug.drug_current_quantity;
//         drug.drug_status_reorder = req.body.drug.drug_status_reorder;
//         drug.save()
//           .then(function (drug) {
//             return res.json( { status : "SUCCESS"});
//           }).catch(next);
//       }).catch(next);
//   }).catch(next);;
// });

// //Add new drug category to database
// router.post('/categories', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     var drugCategory = new DrugCategory(req.body.drugcategory);
//     drugCategory.category_id = "DCAT_" + new Date().getTime();
//     return drugCategory.save().then(function () {
//       return res.json( { status : "SUCCESS"});
//     });
//   }).catch(next);
// });

// //Getting all drug categories from database
// router.get('/categories/all', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     DrugCategory.find({})
//       .then(function (drugcategories) {
//         if (!drugcategories) { return res.sendStatus(404); }
//         return res.json({
//           drugcategories: drugcategories
//         });
//       }).catch(next);

//   });
// });

module.exports = router;