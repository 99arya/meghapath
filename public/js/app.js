/*  global $ */

$(document).ready(function(){
    $.getJSON("/api/tables")
    .then(addTables)
    
    $('#tableInput').keypress(function(event){
        if(event.which==13){
            createTable();
        }
    })

})




function addTables(tables){
    tables.forEach(function(table){
        addTable(table)
    })
}

function addTable(table){
    var newTable=$('<li>' + table.name +" - "+ table.available + '<span id="del"> X </span></li>')
    newTable.data('numb', table.name)
    newTable.data('id',table._id)
    newTable.data('available', table.available)
    if(table.available==false){
        newTable.toggleClass("avail")
    }
        
        
        $('.list').append(newTable)
}


function createTable(){
    
    var userInput=$('#tableInput').val();
    
    
    $.post('/api/tables', {name:userInput})
    .then(function(newTable){
        $('#tableInput').val('');
        addTable(newTable)
    })
    .catch(function(err){
        console.log(err)
    })
}


// $('.list').on('click', 'span', function(){
//     alert($(this).parent().data('id'))
// })


$('.list').on('click', 'li', function(){
    updateTable($(this))
})



$('.list').on('click', 'span', function(e){
    e.stopPropagation()
 removeTable($(this).parent())
  
})

function removeTable(table){
      var clickedId= table.data('id')
   var deleteUrl='/api/tables/'+ clickedId;
   $.ajax({
       method:'DELETE', 
       url:deleteUrl
   })
   .then(function(data){
      table.remove()
   })
}

function updateTable(table){
      var lickedId= table.data('id')
   var updateUrl='/api/tables/'+ lickedId;
   
   var isDone=!table.data('available')
   var updateData={available:isDone}
    
    $.ajax({
        method:'PUT',
        url:updateUrl,
        data:updateData
    })
    .then(function(updatedTable){
        table.toggleClass("avail")
        table.data('available', isDone)
        console.log(updatedTable)
    })
    .then(function(createBill){
        // var clickedId= table.data('id')
        var tn=table.data('numb')
        $.ajax({
            method: 'POST',
            url:'/newbill',
            data:{waitername:'waiter123',tablenumber:tn}
                     })
        // .then({
            
        // })
        .then(function(Bill){
            console.log("in then fn")
            console.log('in .then fn bill'+Bill)
            $('#qqq').html('')
            $('#qqq').html(Bill)
            window.location.href = '/bills/'+Bill._id;
        })
        
        
    })
}


// $(document).ready(function(){
//     $.getJSON("http://canatech.in:5002/getMenu/")
//     .then(addMeals)
// })

// function addMeals(todos){
//     todos.forEach(function(meal){
//         var newMeal=$('<li>' + meal.name + '</li>')
//         $('.list').append(newMeal)
//         console.log(newMeal)
//     })
// }





// $.ajax({
//     url: "http://canatech.in:5002/getMenu",
//     type: 'GET',
//     success: function(res) {
//         var text = res.responseText;
//         console.log(text)
//         // $('.list').append(text)
//         // then you can manipulate your text as you wish
//     }
// });