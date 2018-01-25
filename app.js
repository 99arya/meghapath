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
var methodOverride=require("method-override");

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
app.use(bodyParser.json());


  //=========================================================================================================================                                    
 //  CONNECT AND USE THE REQUIRED  web application framework for Node.js
//=========================================================================================================================                                    


    // mongoose.connect("mongodb://localhost/cafe_o2")
    mongoose.connect("mongodb://sumitarya:behaPPYhaha99!@ds255715.mlab.com:55715/o2db")
    // mongoose.Promise = require('bluebird');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(__dirname + '/views'));
    app.use(bodyParser.json());
    app.use(methodOverride("_method"));
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
    username:String,
    mealcategory: String
    });

var Meal = mongoose.model("Meal", mealSchema);



  //=========================================================================================================================                                    
 //  LIST MODEL AND SCHEMA
//=========================================================================================================================                                    

    





var listSchema = new mongoose.Schema({
    
    name:String,
    qty:String,
    id:String,
    price:String,
    rate:String
     
            
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
    total: Number,
    cgst: Number,
    sgst: Number,
    tax: Number,
    pm: String,
    custName: String,
    custPhone:{type: Number},
    custEmail: {type: String},
    
    feedback: [{
        created: {type: Date, default: Date.now},
        fn: Number,
        custName: String,
        custPhone: String,
        orderNumber: String,
        comment: String
        
    }],
   
    
    meals: [{
            
                name:String,
                qty:Number,
                id:String,
                price:String,
                rate:String
             
                    
            }]
            
      
                
    
    });

var Bill = mongoose.model("Bill", billSchema);

  // ===================================================
 //  Contact model and schema
//======================================================

var contactSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    name: String,
    email: String,
    subject: String,
    mobile: String,
    message: String,
    cn: Number
})
    
    var Contact = mongoose.model("Contact", contactSchema)
    
    
    // =========
    
app.post("/contact", function(req, res) {
    
    
    Contact.count(function(err, count){
        if(err){
            console.log(err)
        } else {
        
            console.log("old -" + count)
    
    
    var cn = count + 1;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var mobile = req.body.mobile;
    var message = req.body.message;
    
    var newContact = new Contact({cn:cn, name:name, email:email, subject:subject, mobile:mobile, message:message })
    
    console.log("new -" + cn)
    
    Contact.create(newContact, function(err, contact) {
        if(err){
            console.log(err)
        } else {
            newContact.save(function(err, contact){
                if(err){
                    console.log(err)
                } else {
                    res.json("contact SAVED" + contact);
                    console.log(contact)
                }
            })
            
        }
    })
            
            
            
            
            
        }      
    })
    
   

})
    
   
        app.get("/contacts", function(req, res) {
            
            Contact.find(function(err, allContacts){
            if(err){
                console.log(err);
            } else {
                res.render("contacts",{contacts:allContacts, currentUser:req.user}); 
          
            }
        })
            
        })
 
    
    

  //=========================================================================================================================                                    
 //  FEEDBACK MODEL AND SCHEMA
//=========================================================================================================================                                    

var feedbackSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    fn: Number,
    custName: String,
    custPhone: String,
    orderNumber: String,
    comment: String
    
    
    
})

var Feedback = mongoose.model("Feedback", feedbackSchema)




  //=========================================================================================================================                                    
 //  FEEDBACK GET AND POST ROUTES
//=========================================================================================================================                                    

app.get("/feedback", function(req, res) {
    
    Feedback.count(function(err, count){
        if(err){
            console.log(err)
        }
        console.log("feedback count - " + count)
        res.render("feedback", {currentUser:req.user, error:req.flash("error"), success:req.flash("success") })
            ;});
         });

    
    
    // res.render("feedback")
// =====================
app.get("/feedback/:id", function(req, res) {
    
    var billId = req.params.id;
    
    Feedback.count(function(err, count){
        if(err){
            console.log(err)
        }
        
        Bill.findById({_id:billId}, function(err, foundBill){
            if(err){
                console.log(err)
            } else {
                console.log("HAHA" + foundBill)
                console.log("feedback count - " + count)
                 res.render("feedback", {bill:foundBill, currentUser:req.user, error:req.flash("error"), success:req.flash("success") })
           
                
                
            }
        })
        
        
         ;});
         });





app.post("/feedback", function(req, res) {
    
    
    Feedback.count(function(err, count){
        if(err){
            console.log(err)
        } else {
        
            console.log("old -" + count)
    
    
    var fn = count + 1;
    var custName = req.body.custName;
    var custPhone = req.body.custPhone;
    var orderNumber = req.body.orderNumber;
    var comment = req.body.comment;
    
    var newFeedback = new Feedback({fn:fn, custName:custName, custPhone:custPhone, orderNumber:orderNumber, comment:comment })
    
    console.log("new -" + fn)
    
    Feedback.create(newFeedback, function(err, feedback) {
        if(err){
            console.log(err)
        } else {
            newFeedback.save(function(err, feedback){
                if(err){
                    console.log(err)
                } else {
                    res.json("FEEDBACK SAVED" + feedback);
                    console.log(feedback)
                }
            })
            
        }
    })
            
            
            
            
            
        }      
    })
    
    
    
    


})
        // ==================test start
        


// app.post("/feedback/:id", function(req, res) {
    
    
//     Feedback.count(function(err, count){
//         if(err){
//             console.log(err)
//         } else {
        
//             console.log("old -" + count)
    
    
//     var fn = count + 1;
//     var custName = req.body.custName;
//     var custPhone = req.body.custPhone;
//     var orderNumber = req.body.orderNumber;
//     var comment = req.body.comment;
//     var billId = req.params.id;
    
//     var newFeedback = new Feedback({fn:fn, custName:custName, custPhone:custPhone, orderNumber:orderNumber, comment:comment })
    
//     console.log("new -" + fn)
    
    
    

    
//     //=====create start
//     Feedback.create(newFeedback, function(err, feedback) {
//         if(err){
//             console.log(err)
//         } else {
//             newFeedback.save(function(err, feedback){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     res.json("FEEDBACK SAVED" + feedback);
//                     console.log(feedback)
                    
                    
                    
                        
//      Bill.findById({_id: req.params.id},{ $push:{feedback:newFeedback}}, { new:true, upsert:true }, function(err, bill, newFeedback){
//           if(err){
//               console.log("cho " + err)
//           } else {
//               console.log(bill)
//               console.log("details updated" + newFeedback)
        
    
                    
                    
//                 }
//             })
            
//         }
//     })
         
//          //=====create end
         
         
         
//           } //

//       }) //===bill.update end
            
            
            
            
            
//         }      
//     }) 
//     //====count end
    
    
    
    


// })

//===post end
        
        
        
        // ===================test end
        
        // ============================TEST START
        
        

app.post("/feedback/:id", function(req, res) {
    
    
    Feedback.count(function(err, count){
        if(err){
            console.log(err)
        } else {
        
            console.log("old -" + count)
    

    
    
    
            
                    
                    
                        
     Bill.findById({_id: req.params.id},  function(err, bill){
          if(err){
              console.log("cho " + err)
          } else {
              console.log("found bill " + bill)
             
            
                 
                var fn = count + 1;
                var custName = req.body.custName;
                var custPhone = req.body.custPhone;
                var orderNumber = req.body.orderNumber;
                var comment = req.body.comment;
                var billId = req.params.id;
                
                var newFeedback = new Feedback({fn:fn, custName:custName, custPhone:custPhone, orderNumber:orderNumber, comment:comment })
                
                console.log("new -" + fn)
                
                
                console.log("xyz " + newFeedback)
                
                    Feedback.create(newFeedback, function(err, feedback) {
                        if(err){
                            console.log(err)
                        } else {
                            feedback.save();
                            bill.feedback.push(feedback);
                            bill.save()
                            console.log("done " )
                            req.flash("success", "Feedback Saved")
                            res.redirect("/")
                        }
                    })
    
                    
                    
                }
            })
            
        }
    })
         
         //=====create end
         
         
        //===bill.update end
            
            
            
            
            
            
   
    //====count end
    
    
    
    


})
        
        // ============================TEST END
        
        
        
        // ==================
        app.get("/feedbacks", function(req, res) {
            
            Feedback.find(function(err, allFeedbacks){
            if(err){
                console.log(err);
            } else {
                res.render("feedbacks",{feedbacks:allFeedbacks, currentUser:req.user}); 
          
            }
        })
            
        })


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
            
             
            
        });
        
        });
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
        
        
        Bill.findById(req.params.id).populate("meals bills meals").exec(function(err, foundBill){
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
        var category = req.body.category;
        var price = req.body.price;
        var username = req.user.username;
        
    var newMeal = {mealname:name, mealprice:price, username:username, mealcategory:category}
    
    console.log("___CAT___" + category)


    Meal.create(newMeal, function(err, newlyCreated){
        if(err){
                console.log(err)
            } else {
                res.redirect("meals")
                    
        }
    });
    });

// =========================================================================================
// POST A NEW LIST TO BILL ID
// =========================================================================================                

	
app.post("/bills/:id", function(req, res) {
    
    
    var myList = req.body;
    
    var arr = myList.meals;
    var arr2 = JSON.parse(arr)
    
    var billId = req.params.id;
    var myarray = [];
    
    
    
    for(var i=0 ; i < arr2.length; i++ )
    {
        console.log(arr2[i])
        var obj = arr2[i];
        var myListObj = new List(obj);
        
        myarray.push(myListObj);
        
    
    
     Bill.findOneAndUpdate({_id: billId},{ $push:{meals: myListObj}}, { new:true}, function(err, list){
        
        if(err){
            console.log(err)
        } else {
            
                  
            console.log("___" + list + "___" );
            
        }
        
        
    
     
   
    
});

                  
        
    }//for
    
   
    
    
})




// =========================================================end
// =========================================================start

app.post("/bills/:id/bd", function(req, res) {

    var total = req.body.total;
    var cgst = req.body.cgst;
    var sgst = req.body.sgst;
    var tax = req.body.tax;
    var pm = req.body.pm;
    var custName = req.body.custName;
    var custPhone = req.body.custPhone;
    var custEmail = req.body.custEmail;
    
    

    
         Bill.findByIdAndUpdate({_id: req.params.id},{ $set:{total:total, cgst:cgst, sgst:sgst, tax:tax, pm:pm, custName:custName, custPhone:custPhone, custEmail:custEmail }}, { new:true}, function(err, newDetails){
            if(err){
                console.log(err)
            } else {
                console.log("details updated" + newDetails)
            }
             
         })
    
})

// =========================================================end


 
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
 app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Sumit's Server started! App is running on PORT : " + process.env.PORT);
        log.info('Express', 'Listening on port ');
    });
    
    
    
    
    
    

  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "ALTUM Lab" "WWW.SUMITARYA.TK"
//===========================================================================================================================