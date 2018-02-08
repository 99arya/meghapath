
  
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
            var billType = $('#billType').find(":selected").text();
            $('#kotspan').html(billType)
            
            
            
            
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
      
          
$('#applyDiscount').click(function(){
    var old = $('#total_gross').text()
    var x = $('#discountPercentage').val()
    var y = x/100
    var z = y*old
    var next = old - z
    $('#total_gross').html(next.toFixed(2))
})

/* global $*/





$('#addTable').click(function () {
    var name = $('#tableName').val();
    
    
 
    
    $.ajax({
        url: '/api/newTable',
        type: "POST",
        data: {name},
        dataType: 'json',
        success: function (data) {
           var name = data.name
           var available = data.available
           var username = data.username
           
           console.log(name)
           console.log(available)
           console.log(username)
           
           
        }
    });
});





