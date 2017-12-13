  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "ALTUM Lab" "WWW.SUMITARYA.TK"
//=========================================================================================================================                                    


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var $ = require("jquery");
var flash = require("connect-flash");
var log = require('npmlog');

var  path = require('path');
var passport = require("passport"), 
    LocalStratregy=require("passport-local"),
    User=require("./models/user");


var port = process.env.PORT || 80;
  //=========================================================================================================================                                    
 //  PASSPORT CONFIGURATION
//=========================================================================================================================                                    


app.use(require("express-session")({
    secret:"KindlyRememberYourPassword",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStratregy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



  //=========================================================================================================================                                    
 //  CONNECT AND USE THE REQUIRED  web application framework for Node.js
//=========================================================================================================================                                    


    // mongoose.connect("mongodb://localhost/cafe_o2")
    mongoose.connect("mongodb://sumitarya:behaPPYhaha99!@ds255715.mlab.com:55715/o2db")
    // mongoose.Promise = require('bluebird');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(__dirname + '/views'));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    
    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        next();
    });

    app.use(flash());

  //=========================================================================================================================                                    
 //  MEAL MODEL AND SCHEMA
//=========================================================================================================================                                    


var mealSchema = new mongoose.Schema({
    mealname: String,
    mealprice: Number,
    username:String
    });

var Meal = mongoose.model("Meal", mealSchema);





  //=========================================================================================================================                                    
 //  MEAL MODEL AND SCHEMA
//=========================================================================================================================                                    


var listSchema = new mongoose.Schema({
    list:[
        {name: String, qty: Number, id: String, price: Number, rate: Number},
        [
            {tableNumber: Number},

{orderNumber: Number},

{waiterName: String},

{billId: String},

{totalGross: String}
            ]
            
            ]
    
    });

var List = mongoose.model("List", listSchema);




  //=========================================================================================================================                                    
 //  BILL MODEL AND SCHEMA
//=========================================================================================================================                                    

    
var billSchema = new mongoose.Schema({
   
    bn:Number,
    tablenumber: { type: Number, required: true },
    waitername: { type: String, required: true },
    created: {type: Date, default: Date.now},
    
    username: String,
    
    meals: [
        {type: mongoose.Schema.Types.ObjectId,
            ref: "Meal"
        }
        ],
        lists: [{type: mongoose.Schema.Types.ObjectId,
            ref: "List"
        }]
    });

var Bill = mongoose.model("Bill", billSchema);
    




  //=========================================================================================================================                                    
 //  NEWAPI ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/newapi", function(req, res){
    
        res.render("api")
        });





  //=========================================================================================================================                                    
 //  ROOT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/", function(req, res){
    
    Bill.count(function(err, count){
        if(err){
            console.log(err)
        }
        
        res.render("landing", {currentUser:req.user, error:req.flash("error"), success:req.flash("success") })
            ;});
         });




  //=========================================================================================================================                                    
 //  CONTACT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/contact", function(req, res){
    
    Bill.count(function(err, count){
        if(err){
            console.log(err)
        }
        res.render("index", {currentUser:req.user})
            ;});
         });



  //=========================================================================================================================                                    
 //  ABOUT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/about", function(req, res){
    
    Bill.count(function(err, count){
        if(err){
            console.log(err)
        }
        res.render("about", {currentUser:req.user})
            ;});
         });





  //=========================================================================================================================                                    
 //  NEW BILL ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/newbill", isLoggedIn, function(req, res){
    
    Bill.count(function(err, count){
        if(err){
            console.log(err)
        }
        console.log("Total matches: "+count);
        res.render("newbill", {currentUser:req.user, error:req.flash("error"), success:req.flash("success")})
        
            ;});
         });




  //=========================================================================================================================                                    
 //  MEALS ROUTE - GET - DISPLAY ALL MEALS
//=========================================================================================================================                                    

 app.get("/meals",  isLoggedIn, function(req, res){
            
                       
        Meal.find({username: { $eq: req.user.username }}, function(err, allMeals){
            if(err){
                console.log(err);
            } else {
                res.render("meals",{meals:allMeals, currentUser:req.user}); 
          
            }
        })
    });
        
   

  //=========================================================================================================================                                    
 //   POST - CREATE A NEW BILL WITH AUTO GENEREATED BILL NUMBER
//=========================================================================================================================                                    

   
app.post("/newbill",  isLoggedIn, function(req, res){
        
        // Bill.count( { author: { $eq: req.user.username } } )
        // var val=Bill.find()
        
        // Bill.find({"author.username": { $eq: req.user.username }}, function(err, allBills){
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 var x=allBills.size()
                       
        //             console.log("success----------"+x)
        //             }
        //         })
        
        
        Bill.count({username: req.user.username},function(err, count){
            if(err){
                console.log(err)
            }
           
                        var bn = count+1;
                        var tablenumber = req.body.tablenumber;
                        var waitername = req.body.waitername;
                        var username = req.user.username;
                        
       
        
        var newBill = new Bill({bn:bn, tablenumber:tablenumber, waitername: waitername,  username:username})
        
        
        
        Bill.create(newBill, function(err, bill){
            if(err){
                console.log(err);
            } else {
                
                 newBill.save(function(err, bill){
                    if(err){
                        console.log(err)
                    } console.log(bill);
                   
                    res.redirect('/bills/' + bill._id)
                    console.log(bill)
                })
                 
                
            }
            
             
            
        });});
                });
    
        
        
  //=========================================================================================================================                                    
 //  BILLS ROUTE - GET - DISPLAY ALL BILLS
//=========================================================================================================================                                    

        
app.get("/bills", isLoggedIn,  function(req, res) {
          
                         
 
        Bill.find({username: { $eq: req.user.username }}, function(err, allBills){
                    if(err){
                        console.log(err);
                    } else {
                        res.render("bill",{bills:allBills, currentUser:req.user}); 
                 
                    }
                })
    
      })


  //  ======================================================================================
 // SHOW PAGE FOR SPECIFIC BILL ID, DISPLAY MEALS IS THAT BILL, DISPLAY ALL MEALS
//  ======================================================================================
   

app.get("/bills/:id",  isLoggedIn, function(req, res) {
        
        
        Bill.findById(req.params.id).populate("meals bills").exec(function(err, foundBill){
            if(err){
                console.log(err)
            } else {
                
                    Meal.find({username: { $eq: req.user.username }}, function(err, allMeals){
                            if(err){
                                console.log(err);
                            } else {
                                res.render("show",{bill: foundBill, meals:allMeals, currentUser:req.user}); 
                          
                            }
                        })

            }
        });
        req.params.id
        });
    
 
 // =========================================================================================================================                                    
//  GET A FORM TO ADD A NEW MEAL
// =========================================================================================================================                                    


app.get("/newmeal", isLoggedIn,  function(req, res) {
    var username=req.user.username;
    res.render("newmeal", {username:username})
    
})
  //=========================================================================================================================                                    
 //  MEALS ROUTE - POST - create
//=========================================================================================================================                                    
       
app.post("/newmeal", isLoggedIn,  function(req, res){

        var name = req.body.name;
        
        var price = req.body.price;
        var username = req.user.username;
        
    var newMeal = {mealname:name, mealprice:price, username:username}
    


    Meal.create(newMeal, function(err, newlyCreated){
        if(err){
                console.log(err)
            } else {
                res.redirect("meals")
                    
        }
    });
    });

                
// =========================================================================================
// POST A NEW MEAL
// =========================================================================================                
                
// app.post("/bills/:id/meals", isLoggedIn,  function(req, res) {
    
//         Bill.findById(req.params.id, function(err, bill) {
//             if(err){
//                 console.log(err)
//             } 
            
            
            
//             // Meal.create(req.body.meal, function(err, meal) {
//             //     if(err){
//             //         console.log(err)
//             //     }
//             //     bill.meals.push(meal)
               
//             //     bill.save()
//             //      console.log(bill)
//             //     res.redirect('/bills/' + bill._id);
//             // })
//         })
// })
 
 
 
 
//  ====================================================TEST============

// app.post("/bills/:id/meals", isLoggedIn,  function(req, res) {
    
//         Bill.findById(req.params.id, function(err, bill) {
//             if(err){
//                 console.log(err)
//             } 
            
            
//             List.create(req.body.forEach(function(myList) {
//                   var transfer = new transfer(myList);
//                   transfer.save();
//                 })
                
                
//                 , function(err, list) {
//                 if(err){
//                     console.log(err)
//                 }
                
                
                
//                 bill.lists.push(list)
               
//                 bill.save()
//                  console.log(bill)
//                 res.redirect('/bills/' + bill._id);
//             })
//         })
// })

 
  // =========================================================================================================================                                    
 // create meal and push to specific bill
// =========================================================================================================================                                    


// app.post("/bills/:id/meals", isLoggedIn,  function(req, res) {
//     Bill.findById(req.params.id, function(err, bill) {
//         if(err){
//             console.log(err)
//         } Meal.create(req.body.meal, function(err, meal) {
//             if(err){
//                 console.log(err)
//             }bill.meals.push(meal)
           
//             bill.save()
//              console.log(bill)
//             res.redirect('/bills/' + bill._id);
//         })
//     })
// })
 
 
  // ==================================================================
 //API
//===================================================================



var tableRoutes=require("./routes/tables")

app.use('/api/tables', tableRoutes)

 

  //=========================================================================================================================                                    
 //  AUTH ROUTES
//=========================================================================================================================                                    


//=========================================================================================================================                                    
// SHOW REGISTER FORM


app.get("/register", function(req, res) {
    res.render("register", { error:req.flash("error"), success:req.flash("success")})
})

 //=========================================================================================================================                                    
// POST REGISTER FORM


app.post("/register", function(req, res) {
    var newUser = new User(
        {
        username:req.body.username, 
        email:req.body.email,
        restoname:req.body.restoname,
        add1:req.body.add1,
        add2:req.body.add2,
        add3:req.body.add3,
        phone:req.body.phone,
        
    })
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            req.flash("error", err.message)
            return res.render("register", {error:req.flash("error"), success:req.flash("success")})
        } 
        
        console.log("user---"+user)
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome "+user.username)
            res.redirect("/newbill")
        })
    })
})


 //=========================================================================================================================                                    
// SHOW LOGIN FORM


  app.get("/login", function(req, res) {
      
      res.render("login", {error:req.flash("error"), success:req.flash("success")});
  });
 
  //=========================================================================================================================                                    
 // HANDLE LOGIN LOGIC
 
 

  app.post("/login", passport.authenticate("local", 
    {
      successRedirect: "/newbill",
      failureRedirect: "/login",
      successFlash : true,
      failureFlash : true
    }), function(req, res, err) {
    
            req.flash("success", "Welcome "+req.body.username)
            req.flash("error", err.message)
      
  });
  
  //=====================================================================================================================================
 //LOGOUT ROUTE
  
  app.get("/logout", function(req, res) {
      req.logout();
      req.flash("success", "Logged you out!")
      res.redirect("/");
  })
  
  
  
  function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
          return next();
      } 
      req.flash("error", "Kindly Login to continue!")
      res.redirect("/login")
  }
 
 
 // =========================================================================================================================                                    
 app.listen(8080, process.env.IP, function(){
        console.log("Sumit's Server started! App is running on PORT : " + process.env.PORT);
        log.info('Express', 'Listening on port ');
    });
    
    
    
    
    
    
    
    
  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "ALTUM Lab" "WWW.SUMITARYA.TK"
//=========================================================================================================================                                    
