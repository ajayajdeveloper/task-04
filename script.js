
// creating  table and required  html elements 

var divElem2 = document.createElement("div")
divElem2.setAttribute("class","container")
document.body.append(divElem2)


var table = document.createElement("TABLE");
table.setAttribute("class", "table table-dark");
table.setAttribute("id", "our-table");
document.body.append(table);
divElem2.append(table);


var tableHead = document.createElement("THEAD");
document.body.append(tableHead);
table.append(tableHead);

var tableRow= document.createElement("TR");
document.body.append(tableRow);
tableHead.append(tableRow);


var tableCol1= document.createElement("TH");
tableCol1.innerText="id"
document.body.append(tableCol1);
tableRow.append(tableCol1);


var tableCol2 = document.createElement("TH");
tableCol2.innerText="name"
document.body.append(tableCol2);
tableRow.append(tableCol2)

var tableCol3= document.createElement("TH");
tableCol3.innerText="email"
document.body.append(tableCol3);
tableRow.append(tableCol3)

var tableBody= document.createElement("TBODY");
tableBody.setAttribute("id", "table-body"); 
document.body.append(tableBody);
table.append(tableBody);

const divElem4 = document.createElement("div")
divElem4.setAttribute("class","pagination-wrapper")
document.body.append(divElem4);

const divElem3 = document.createElement("div")
divElem3.setAttribute("class","container")
document.body.append(divElem3);
divElem3.append(divElem4);


//passing json data

var tableData = JSON.parse(data);



//Assign the values

var state = {
    'querySet': tableData,
    'page': 1,
    'rows': 5,
    'window': 5,
}

buildTable()

// to determine the pages 

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

//creating button for the pages and add to html elements

function pageButtons(pages) {
    var wrapper = document.querySelector('.pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}



//using "Template Litterals to create rows 
        //using loop to append date to row  
function buildTable() {
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet

    for (var i = 1 in myList) {
        
        var row = `<tr>
      
                  <td>${myList[i].id}</td>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].email}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
}
