/* global $*/
$('document').ready(function() {
    alert("The system is ready!")
})



var kot = {}

var mealqty = {} 

var mealqty2={}

var mealList = []

var kotMealList = []

var myList=[]

$(".card").on("click", function(){
 var mealid=$(this).data("id-value");

 
 var mealid = mealid.split( "\n" );
 var mealid = mealid[0]
 var mealid = mealid.replace( "{ _id: ", "" )
 var mealid = mealid.replace( ",", "" )

 
 var mealname=$(this).data("mealname-value");
 var mealprice=$(this).data("mealprice-value"); 
 

 if (mealList.includes(mealname)){
     
          mealqty[mealname] = mealqty[mealname]+1;
          
          $('#'+mealid).html('<td>' + mealname + '</td><th scope="row">'+ mealqty[mealname] +'</th><td>' + mealprice + '</td><td>' + mealprice*mealqty[mealname] + '</td>')
          
           var Qty=mealqty[mealname];
          
        
          
          var myObject = new Object();
                myObject.name = mealname;
                myObject.qty = mealqty[mealname];
                myObject.id = mealid;
                myObject.price = mealprice;
                myObject.rate = mealprice*mealqty[mealname];
                
                
                
                myList = $.grep(myList, function(e){ 
                  return e.name != myObject.name; 
                    });
              
 
    
              myList.push(myObject)
                  
  
  

  }
 else {
          mealList.push(mealname);
          
          mealqty[mealname] = 1;
          
          
          var newTab=$('<tr class="tableMealId" id ='+ mealid + '><td>' + mealname + '</td><th scope="row">'+ mealqty[mealname] +'</th><td>' + mealprice + '</td><td>' + mealprice*mealqty[mealname] + '</td></tr>')
          newTab.data('id',mealid)
           $('#billtable').append(newTab)
          
          
      
          var Qty=mealqty[mealname];
          
            
            
              var myObject = new Object();
                myObject.name =  mealname;
                myObject.qty = mealqty[mealname];
                myObject.id = mealid;
                myObject.price = mealprice;
                myObject.rate = mealprice*mealqty[mealname];


              myList.push(myObject)
                  

 }
 
 
 
 
if (kotMealList.includes(mealname)){
  mealqty2[mealname] = mealqty2[mealname]+1;
  
  $('#'+mealid+'_a').html('<td>' + mealname + '</td><th scope="row">'+ mealqty2[mealname] +'</th>')
  }
 else {
  
  kotMealList.push(mealname);
  mealqty2[mealname] = 1;
  
  $('#kottable').append('<tr id ='+ mealid+ '_a><td>' + mealname + '</td><th scope="row">'+ mealqty2[mealname] +'</th></tr>');
 
 }




  var pregst = mealprice - 0.05*mealprice;

 
 
 


//  alert(kot)
 
//  $('#myTable').append('<tr><td>my data</td><td>more data</td></tr>');

var result = [];
  $('table tr').each(function(){
  	$('td', this).each(function(index, val){
    	if(!result[index]) result[index] = 0;
      result[index] += parseInt($(val).text());
    });
  });
  
  $('table').append('<tr></tr>');
  $(result).each(function(){
  	$('#total_forces').html(this.toFixed(2))
 
  var cgst=this*0.025;
     	$('#cgst').html(cgst.toFixed(2))

  var sgst=this*0.025;
     	$('#sgst').html(sgst.toFixed(2))
var tax = cgst + sgst;
  
 var pregsttotal = (this ).toFixed(2);

   	$('#total_gross').html(pregsttotal)
    $('#tax').html(tax.toFixed(2))

  });
 
 
});


  
  $(document).ready(function(printBill) {
            $("#printbill").on("click", function () {//$btnPrint is button which will trigger print
                var divContents = $("#billdiv").html();//div which have to print
                var printWindow = window.open('', '', 'height=700,width=900');
                printWindow.document.write('<html><head><title>BILL</title>');
                printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >');//external styles
                printWindow.document.write('<link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">');//external styles
                printWindow.document.write('<style>font-family: "Share Tech Mono", monospace;</style>');//external styles
                printWindow.document.write('<link rel="stylesheet" href="/stylesheets/main.css" type="text/css"/>');
                printWindow.document.write('</head><body>');
                
                printWindow.document.write(divContents);
                printWindow.document.write('</body></html>');
                printWindow.document.close();

                printWindow.onload=function(){
                printWindow.focus();                                         
                printWindow.print();
                printWindow.close();
                }
            });
}); 


  $(document).ready(function() {
            $("#printkot").on("click", function () {//$btnPrint is button which will trigger print
                var divContents = $("#kotdiv").html();//div which have to print
                var printWindow = window.open('', '', 'height=700,width=900');
                printWindow.document.write('<html><head><title></title>');
                printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >');//external styles
                printWindow.document.write('<link rel="stylesheet" href="/stylesheets/main.css" type="text/css"/>');
                printWindow.document.write('</head><body>');
                
                printWindow.document.write(divContents);
                printWindow.document.write('</body></html>');
                printWindow.document.close();

                printWindow.onload=function(){
                printWindow.focus();                                         
                printWindow.print();
                printWindow.close();
                }
            });
});



function download(){
    var a = document.body.appendChild(
        document.createElement("a")
    );
    a.download = "export.html";
    a.href = "data:text/html," + document.getElementById("billdiv").innerHTML;
    a.click();
}

$('#delkot').on('click',function(e){
         e.preventDefault();
        $("#kottable tr").remove();
        $("#kottable").append('<tr><th scope="col">Name</th><th scope="col">Qty.</th></tr>');
        
        kotMealList = [];
        mealqty2={}
      });
      
          

    




