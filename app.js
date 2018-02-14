  //=========================================================================================================================                                    
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "Ornio Lab" "WWW.SUMITARYA.TK"
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
    // mongoose.connect(process.env.MONGOURL)
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

    var klistSchema = new mongoose.Schema({
    
    name:String,
    qty:String,
    id:String,
  
     
            
    });

var Klist = mongoose.model("Klist", klistSchema);






var listSchema = new mongoose.Schema({
    
    name:String,
    qty:String,
    id:String,
    price:String,
    rate:String
     
            
    });

var List = mongoose.model("List", listSchema);

  //=========================================================================================================================                                    
 //  kot MODEL AND SCHEMA
//=========================================================================================================================                                    

    

var kotSchema = new mongoose.Schema({
    kn:Number,
    created: {type: Date, default: Date.now},
    username:String,
    bn:Number,
    tn:String,
    waitername: String,
    billType:String,
    cName:String,
    bId:String, 
    kotStatus:String, 
    tableId:String,
      meals: [{
                name:String,
                
                qty:Number,
                id:String}]
 
})

var Kot = mongoose.model("Kot", kotSchema)



// =========post kot====



// ==============================

var customerSchema = new mongoose.Schema({
     
    cName: String,
    cPhone:String,
    cEmail:String,
    cn:Number,
    username:String
})

var Customer = mongoose.model("Customer", customerSchema)





  //=========================================================================================================================                                    
 //  BILL MODEL AND SCHEMA
//=========================================================================================================================                                    

    
var billSchema = new mongoose.Schema({
   
   customer:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer"
            },
   
    bn:Number,
    tablenumber: String,
    waitername: String,
    created: {type: Date, default: Date.now},
    
    username: String,
    total: Number,
    cgst: Number,
    sgst: Number,
    tax: Number,
    pm: String,
    tableId:String,
   
    
    billType: String,
    discount: Number,
    totalAmt: Number,
    
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
             
                    
            }],
            
    kots: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Kot"
            }
        ]
    
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
    
    function((smail){
    
    var cn = count + 1;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var mobile = req.body.mobile;
    var message = req.body.message;
    
    var newContact = new Contact({cn:cn, name:name, email:email, subject:subject, mobile:mobile, message:message })
    
    console.log("new -" + cn)
    
    // using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'aryasumit145@gmail.com',
  from: 'no-reply@MeghaPath.com',
  subject: subject,
  text: message,
  html: '<h2 style="text-center">New query from: ' + name + '</h2>' +
  
   '<h3 style="text-center">E-Mail: ' + email + '</h2>' +
  '<h3 style="text-center">Mobile: ' + mobile + '</h3>' +
  '<h4>Message: ' + message + '</h4>' +
  '<p> Generated by MeghaPath</p>',
};
sgMail.send(msg);
    console.log("Email sent successfully")
    console.log(msg)
    req.flash("success", "Message Sent")
        
    })
                    
    Contact.create(newContact, function(err, contact) {
        if(err){
            console.log(err)
        } else {
            newContact.save(function(err, contact){
                if(err){
                    console.log(err)
                } else {
                    req.flash("success", "Message Sent")
                    res.redirect("/");
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





// app.post("/feedback", function(req, res) {
    
    
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
    
//     var newFeedback = new Feedback({fn:fn, custName:custName, custPhone:custPhone, orderNumber:orderNumber, comment:comment })
    
//     console.log("new -" + fn)
    
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
//                 }
//             })
            
//         }
//     })
            
            
            
            
            
//         }      
//     })
    
    
    
    


// })
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
                
                var newFeedback = new Feedback({billId:billId, fn:fn, custName:custName, custPhone:custPhone, orderNumber:orderNumber, comment:comment })
                
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

// ====================


app.post("/api/getcustomer", function(req, res) {
    var cPhone = req.body.cPhone;
    
    Customer.findOne({cPhone:cPhone}, function(err, foundCust) {
       
       if(err){
           console.log(err)
       } else {
                          res.json(foundCust)

       }
    })
})


// =====================


app.post("/api/customer", function(req, res) {
    
    Customer.count({username: req.user.username},function(err, count){
        
    if(err){
        console.log(err)
    } else {
        console.log("cccccooutn" + count)
    var username = req.user.username;
    var cn= count+1;
    var cName = req.body.cName;
    var cPhone = req.body.cPhone;
    var cEmail = req.body.cEmail;
    
    var newCustomer = new Customer({username:username, cn:cn, cName:cName, cPhone:cPhone, cEmail:cEmail})

      Customer.create(newCustomer, function(err, foundCustomer){
          if(err){
              console.log(err)
          } else {
              res.json(foundCustomer)
          }
      })
      
        
    }})
        
    })



  //=========================================================================================================================                                    
 //  ROOT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/", function(req, res){
    
    
        
        res.render("landing", {currentUser:req.user, error:req.flash("error"), success:req.flash("success") })
        
         });




  //=========================================================================================================================                                    
 //  CONTACT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/contact", function(req, res){
    
    
        res.render("index", {currentUser:req.user})
            ;});
        



  //=========================================================================================================================                                    
 //  ABOUT ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/about", function(req, res){
    
   
        res.render("about", {currentUser:req.user})
            ;});
         





  //=========================================================================================================================                                    
 //  NEW BILL ROUTE - GET - NEW BILL FORM
//=========================================================================================================================                                    

 
app.get("/newbill", isLoggedIn, function(req, res){
    
    
        res.render("newbill", {currentUser:req.user, error:req.flash("error"), success:req.flash("success")})
        
           
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
                        var tableId = req.body.tableId
                        
       
        
        var newBill = new Bill({tableId:tableId, bn:bn, tablenumber:tablenumber, waitername: waitername,  username:username})
        
        
        
        Bill.create(newBill, function(err, bill){
            if(err){
                console.log(err);
            } else {
                
                 newBill.save(function(err, bill){
                    if(err){
                        console.log(err)
                    } 
                   
                    // res.redirect('/bills/' + bill._id)
                    console.log(bill._id)
                    res.json({id:bill._id, tid:bill.tableId})
                })
                 
                
            }
            
             
            
        });
        
        });
                });
    
        
        
  //=========================================================================================================================                                    
 //  BILLS ROUTE - GET - DISPLAY ALL BILLS
//=========================================================================================================================                                    

        
app.get("/bills", isLoggedIn,  function(req, res) {
          
                         $orderby :{start_date : -1}
//  , {sort:{'createdAt':-1}},
        Bill.find({username: { $eq: req.user.username}}, function(err, allBills){
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
        
        
        Bill.findById(req.params.id).populate("meals categories kots").exec(function(err, foundBill){
            if(err){
                console.log(err)
            } else {
                
                    Meal.find({username: { $eq: req.user.username }}, function(err, allMeals){
                            if(err){
                                console.log(err);
                            } else {
                                // res.render("show",{bill: foundBill, meals:allMeals, currentUser:req.user}); 
                            Cat.find({username:{$eq: req.user.username}}, function(err, allCats) {
                                if(err){
                                    console.log(err)
                                } else {
                                    
                                    Kot.find({username:{$eq:req.user.username}}, function(err, allKots) {
                                      if(err){
                                          console.log(err)
                                      }  else {
                                    res.render("show",{ bill: foundBill, meals:allMeals, cats:allCats, currentUser:req.user}); 

                                      }
                                    })
                                    

                                }
                            })
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
        
        console.log("f")
    
     
   
    
});

                  
        
    }//for
    
   
    res.send({status:200})
    
})


  //=========================================================================================================================                                    
 //  KOT ROUTE - GET - DISPLAY ALL KOT
//=========================================================================================================================                                    

        
app.get("/api/getkots", isLoggedIn,  function(req, res) {
          
        Kot.find({username: { $eq: req.user.username}}, function(err, allKots){
                    if(err){
                        console.log(err);
                    } else {
                        res.json(allKots)
                    }
                })
    
      })




// ===========================================
// CREATE A NEW KOT (ok)
///============================================


   
app.post("/api/newkot",  isLoggedIn, function(req, res){
       
       
        
      
        
    Kot.count({username: req.user.username},function(err, count){
            if(err){
                console.log(err)
            }
           
                        var kn = count+1; //
                        var tn=req.body.tn;
                        var bn = req.body.bn;
                        var waitername = req.body.waitername;
                        var username = req.user.username; //
                        var tableId = req.body.tableId
                        var bId = req.body.bId;
                        var kotStatus = "New" //
                        var cName = req.body.cName;
                        var billType = req.body.billType;
       
        
        var newKot = new Kot({billType:billType, cName:cName, kn:kn, tn:tn, bn:bn, tableId:tableId, waitername: waitername, bId:bId, kotStatus:kotStatus, username:username})
        
        
        
        Kot.create(newKot, function(err, kot){
            if(err){
                console.log(err);
            } else {
                
                 newKot.save(function(err, kot){
                    if(err){
                        console.log(err)
                    } 
                   
                    // res.redirect('/bills/' + bill._id)
                    console.log("kot id " + kot)
                
                    res.json(kot)
                })
                 
                
            }
            
             
            
        });
        
        });
                });
    
        
        

// =========================================================================================
// push meals to nely created kot
// =========================================================================================                

	
app.post("/api/kotmeals/:id", function(req, res) {
    
    
    var yourList = req.body;
    
    var arr = yourList.meals;
    var arr2 = JSON.parse(arr)
    
    var kId = req.params.id;
    var myarray = [];
    
    
    
    for(var i=0 ; i < arr2.length; i++ )
    {
        console.log(arr2[i])
        var obj = arr2[i];
        var yourKotObj = new Klist(obj);
        
        myarray.push(yourKotObj);
        
    
    
     Kot.findOneAndUpdate({_id: kId},{ $push:{meals: yourKotObj}}, { new:true}, function(err, list){
        
        if(err){
            console.log(err)
        } else {
            
        
        console.log("___" + list + "___" );
           
        }
        
        
    
     
   
    
});

                  
        
    }//for
    
   
    res.send({status:200})
    //  res.json(list)
})


// =========================================
// put newly created kot into bill id
// ====================================


        

app.post("/api/pushkot/:id", function(req, res) {
    var kId = req.body.kId;
   
     Kot.findById({_id:kId}, function(err, kot) {
                    if(err){
                        console.log(err)
                    } else {
                    console.log(kot)
                    
                    console.log("now will push this kot to this bill" )
                     
                    
                Bill.findById({_id:req.params.id}, function(err, bill) {
                    if(err){
                        console.log(err)
                    } else {
                       console.log("finally ") 
                       bill.kots.push(kot);
                      bill.save()
                      res.send({status:200})
                      console.log("bill "+ bill)
                    }
                    
                    
                }) //push kot
                  
                     
                    
                }
            }) //findkot
            

}) //post


// =========================================================================================
// POST A NEW LIST TO kot ID
// =========================================================================================                

	
app.post("/bills/:id/kot", function(req, res) {
    
    
    var yourList = req.body;
    
    var arr = yourList.meals;
    var arr2 = JSON.parse(arr)
    
    var billId = req.params.id;
    var myarray = [];
    
    
    
    for(var i=0 ; i < arr2.length; i++ )
    {
        console.log(arr2[i])
        var obj = arr2[i];
        var yourKotObj = new Kot(obj);
        
        myarray.push(yourKotObj);
        
    
    
     Bill.findOneAndUpdate({_id: billId},{ $push:{kots: yourKotObj}}, { new:true}, function(err, list){
        
        if(err){
            console.log(err)
        } else {
            
        
        console.log("___" + list + "___" );
            
        }
        
        console.log("f")
    
     
   
    
});

                  
        
    }//for
    
   
    res.send({status:200})
    
})


// =========================================================start

app.post("/api/getcust", function(req, res) {
    var cPhone = req.body.cPhone;
    console.log("-----" + cPhone + "-----")
    
    Bill.findOne({cPhone: cPhone},  function(err, foundCust) {
        if(err){
            console.log(err)
        } else {
            res.json(foundCust)
        }
    })
    
})


// =========================================================end

// =========================================================end
// =========================================================start

app.post("/bills/:id/bd", function(req, res) {

    var total = req.body.total;
    var cgst = req.body.cgst;
    var sgst = req.body.sgst;
    var tax = req.body.tax;
    var pm = req.body.pm;
    var cName = req.body.cName;
    var cPhone = req.body.cPhone;
    var cEmail = req.body.cEmail;
    var idd = req.params.id;
    var billType = req.body.billType;
    var discount = req.body.discount;
    var totalAmt = req.body.totalAmt;
    var waitername = req.body.waitername;
    var tableId = null
    

    
         Bill.findByIdAndUpdate({_id: req.params.id},{ $set:{waitername:waitername, total:total, cgst:cgst, sgst:sgst, tax:tax, pm:pm, cName:cName, cPhone:cPhone, cEmail:cEmail, billType:billType, discount:discount, totalAmt:totalAmt, tableId:tableId }}, { new:true}, function(err, newDetails){
            if(err){
                console.log(err)
            } else {
                console.log("details updated" + newDetails)
                
            }
            //  res.redirect("/bills/" + idd)
                res.json(newDetails)         
             
         })
    
})



app.get("/kitchen", function(req, res) {
    res.render("kitchen")
})






// ===================

app.get("/api/kitchen", function(req, res) {
    
    Kot.find({$and: [{username:req.user.username}, {kotStatus:{$ne:"Ready"}}]}, function(err, allKots) {
        if(err){
            console.log(err)
        } else {
            res.json(allKots)
        }
    })
    
    
})


// =========================

app.put("/api/kitchen/:id", function(req, res) {

var kId = req.params.id;
var kotStatus=req.body.kotSchema;
    
     Kot.findOneAndUpdate({_id: { $eq: kId }}, {$set:{kotStatus:kotStatus}}, function(err, done){
        if(err){
            console.log(err)
            
        } else {
            res.json(done)
            
        }
    
}) 
})



// =========================================================end
  // ===================================================
 //  table model and schema
//======================================================

var tableSchema = new mongoose.Schema({
    
    name: String,
    username:String,
    bill:String,
    available:{
       type:String,
       default:true
     }
    
})
    
    var Table = mongoose.model("Table", tableSchema)

// =============get

app.get("/api/dashboard", isLoggedIn, function(req, res) {
    Table.find({}, function(err, allTables) {
        if(err){
            console.log(err)
        } else {
            res.render("dashboard", { currentUser:req.user, tables:allTables})
        }
    })
})



// =========================================================start


app.get("/api/gettable", isLoggedIn, function(req, res) {
    Table.find({username: { $eq: req.user.username }}, function(err, allTables) {
        if(err){
            console.log(err)
        } else {
            res.json(allTables)
        }
    })
})


app.post("/api/newtable",  function(req, res) {
    
        var name = req.body.name;
        
        var username = req.user.username;
        console.log("----" + username)
        
    var newTable = {name:name, username:username}
    



    Table.create(newTable, function(err, newlyCreated){
        if(err){
                console.log(err)
            } else {
                // res.redirect("meals")
                res.json(newlyCreated)
                
                    
        }
    });
    })


app.put("/api/truetable",   function(req, res) {
    var name= req.body.id;
    var bill=req.body.bill
    
    Table.findOneAndUpdate({_id: { $eq: name }}, {$set:{available:"false", bill:bill}}, function(err, done){
        if(err){
            console.log(err)
            
        } else {
            res.json(done)
            console.log("falsed")
        }
    
}) })




app.put("/api/falsetable", function(req, res) {
    var name= req.body.id;
    var bill=""
    
    Table.findOneAndUpdate({_id: { $eq: name }}, {$set:{available:"true",  bill:bill}}, function(err, done){
        if(err){
            console.log(err)
            
        } else {
            res.json(done)
            console.log("trued")
        }
    
}) })


// =========================================================end
  // ==================================================================
 //category start
//===================================================================

var catSchema = new mongoose.Schema({
    
        name: String,
        username:String,
        
    })
        
    var Cat = mongoose.model("Cat", catSchema)

// ====new category=====

app.post("/api/newcategory",  function(req, res) {
        
            var name = req.body.name;
            
            var username = req.user.username;
            console.log("----" + username)
            
        var newCat = {name:name, username:username}
  
        Cat.create(newCat, function(err, newlyCreated){
            if(err){
                    console.log(err)
                } else {
                    // res.redirect("meals")
                    res.json(newlyCreated)
               
            }
        });
        })
        
// =====get categories===

app.get("/api/getcategories", isLoggedIn, function(req, res) {
    Cat.find({username: { $eq: req.user.username }}, function(err, allCats) {
        if(err){
            console.log(err)
        } else {
            res.json(allCats)
        }
    })
})

  // ==================================================================
 //category end
//===================================================================



 
  // ==================================================================
 //API
//===================================================================



// var tableRoutes=require("./routes/tables")

// app.use('/api/tables', tableRoutes)

 

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
        oname:req.body.oname,
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
            req.flash("success", "Welcome "+user.oname)
            res.redirect("/newbill")
        })
    })
})

 //=========================================================================================================================                                    
// EDIT PROFILE
app.get("/edit", function(req, res){
    
    User.find({username: { $eq: req.user.username }}, function(err, foundUser){
        if(err){
            console.log(err)
        } else{
            res.render("edituser",{user:foundUser, currentUser:req.user})
        }
        
    })
})




app.put("/edit", function(req, res){
    
    User.findOneAndUpdate({username: { $eq: req.user.username }}, {$set:{username:req.body.username, oname:req.body.oname, restoname:req.body.restoname, add1:req.body.add1, add2:req.body.add2, add3:req.body.add3, phone:req.body.phone, gst:req.body.gst, cin:req.body.cin}},function(err, foundUser){
        if(err){
            console.log(err)
        } else{
            req.flash("success", "Profile Updated!")
            res.redirect("/")
            // res.render("edituser",{user:foundUser, currentUser:req.user})
        }
        
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
      successRedirect: "/api/dashboard",
      failureRedirect: "/login",
      successFlash : true,
      failureFlash : true
    }), function(req, res, err) {
    
            req.flash("success", "Welcome  "+req.body.oname)
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
 //  DESIGNED AND DEVELOPED BY "SUMIT ARYA" : "<ARYASUMIT145@GMAIL.COM>" "Ornio Lab" "WWW.SUMITARYA.TK"
//===========================================================================================================================