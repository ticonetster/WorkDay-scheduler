    var hoursDay =  new Array(9);
    var todayDisplay = $("#currentDay");
    var currentHour = moment().hour();
    for(var i=9; i < 18; i++){
        //Fill Array with hours from 9-5
        hoursDay.push(moment( {hour: i} ).format("h A"));
        //create row div wrapper
        var row = document.createElement("div");
        row.className ="row time-block"
        document.querySelector(".container").appendChild(row);
        //create time div
        var row_time = document.createElement("div");
        row_time.className = "col-2 col-lg-1 hour";
        row_time.textContent = hoursDay[i];
        document.querySelector(".row").appendChild(row_time);
        //create textbox div
        var row_textarea = document.createElement("textarea");
        row_textarea.className = "col-8 col-lg-10 textarea";
        row_textarea.id = "txt"+ i;
        document.querySelector(".row").appendChild(row_textarea);
        //check if local storage has a key with this hour else leave empty
        var keyValue = localStorage.getItem(hoursDay[i]);
        if(keyValue){
            row_textarea.value = keyValue;
        };
        //create save button div
        var row_button = document.createElement("button");
        row_button.className = "col-2 col-lg-1 saveBtn"
        row_button.id = "id" + i;
        row_button.innerHTML = "<i id='"+ row_button.id +"' class='fas fa-save' onclick='saveBtn'></i>"
        row_button.addEventListener('click', saveBtn);
        document.querySelector(".row").appendChild(row_button);
        //Format textarea depending on time
        switch(true){
            case currentHour > i:
                row_textarea.classList.add("past");
                row_textarea.disabled = true;
                row_button.disabled = true;
                break;
            case currentHour < i:
                row_textarea.classList.add("future");
                break;
            default:
                row_textarea.classList.add("present");
        }
    }
   
    function saveBtn(e){
        var key = e.target.id;
        var txtId = key.replace("id", "txt");
        key = key.replace("id", "");
        var theTxt = document.getElementById(txtId).value
        //store it
        localStorage.setItem(hoursDay[key], theTxt);
    }
    setInterval(function(){
        var today = moment().format('dddd, MMMM Do');
        todayDisplay.text(today);
    })