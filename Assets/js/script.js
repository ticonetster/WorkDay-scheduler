    //Create an array with the 9 hours we'll be working with
    var hoursDay =  new Array(9);
    //get the display time element to later display the curent time
    var todayDisplay = $("#currentDay");
    //get the curent hour to later style and or disable the textareas
    var currentHour = moment().hour();
    for(var i=9; i < 18; i++){
        //Fill Array with hours from 9-5 (ex format: 9 AM)
        hoursDay.push(moment( {hour: i} ).format("h A"));
        //create row div wrapper, this will hold all 3 elements (time, textarea and button)
        var row = document.createElement("div");
        row.className ="row time-block"
        document.querySelector(".container").appendChild(row);
        //create time div, will display the 9-5 hour
        var row_time = document.createElement("div");
        row_time.className = "col-lg-1 hour";
        row_time.textContent = hoursDay[i];
        document.querySelector(".row").appendChild(row_time);
        //create textbox div
        var row_textarea = document.createElement("textarea");
        row_textarea.className = "col-lg-10 textarea";
        row_textarea.id = "txt"+ i;
        document.querySelector(".row").appendChild(row_textarea);
        //check if local storage has a key with this hour else leave empty
        var keyValue = localStorage.getItem(hoursDay[i]);
        if(keyValue){
            row_textarea.value = keyValue;
        };
        //create save button div
        var row_button = document.createElement("button");
        row_button.className = "col-lg-1 saveBtn"
        row_button.id = i;
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
    //Function that gets triggered by clicking the save button
    function saveBtn(e){
        //get the button ID, which is the time slot
        var recordId = e.target.id;
        //add the string txt to the ID to get the unique ID for textarea i
        var txtId = "txt"+ recordId;
        //get the textarea content that matches the ID
        var theTxt = document.getElementById(txtId).value
        //store it in localstorage
        localStorage.setItem(hoursDay[recordId], theTxt);
    }
    //set todays date and display it
    setInterval(function(){
        var today = moment().format('dddd, MMMM Do');
        todayDisplay.text(today);
    })