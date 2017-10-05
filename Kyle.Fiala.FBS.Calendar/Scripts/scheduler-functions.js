var schedulerFunctions = {
    // setDayData: used to retrieve data of clicked day and display it in "Selected Day"
    // using id's from table data elements.
    // splitDate = ['dayName', 'month', 'dayNumber', 'year', 'time', 'monthNumber']
    setDayData: function(date) {
        var formattedDate = date.toString().replace(" GMT+0000", "");
        var splitDate = formattedDate.split(" ");
        document.getElementById('dataDay').innerHTML = splitDate[0] + ', ' + splitDate[1] + ' ' + splitDate[2] + ' ' + splitDate[3];
    },

    // getDayData: returns an array containing all pieces of a date object
    // splitDate = ['dayName', 'month', 'dayNumber', 'year', 'time', 'monthNumber']
    getDayData: function(date) {
        var formattedDate = date.toString().replace(" GMT+0000", "");
        var splitDate = formattedDate.split(" ");
        var month_int = moment().month(splitDate[1]).format("M");

        if (Number(month_int) < 10) {
            splitDate.push("0" + month_int);
        } else {
            splitDate.push(month_int);
        }
        
        
        return splitDate;
    },

    // openScheduler: reveals eventSchedulerDiv and fields. Assigns clicked day date to Date Field
    openScheduler: function() {
        document.getElementById('eventSchedulerDiv').hidden = "";
        document.getElementById('eventDateInput').value = globalVariables._tempDate[3] + "-" + globalVariables._tempDate[5] + "-" + globalVariables._tempDate[2];

        // initialize event endTime to default 12:30 and prevent keystrokes within eventStartTimeInput and eventEndTimeInput
        document.getElementById('eventStartTimeInput').value = "12:00";
        document.getElementById('eventEndTimeInput').value = "12:30";
        document.getElementById('eventEndTimeInput').disabled = false;
        document.getElementById('eventStartTimeInput').disabled = false;
        document.getElementById('eventAllDayCheckbox').checked = false;
    },

    // closeScheduler: resets fields to empty strings and hides eventSchedulerDiv
    closeScheduler: function() {
        document.getElementById('eventSchedulerDiv').hidden = "hidden";
        document.getElementById('eventTitleInput').value = "";
        document.getElementById('eventDateInput').value = "";
        document.getElementById('eventAllDayCheckbox').checked = false;

    },

    // toggleStartEndInput: disables or enables start and end input fields based on all day checkbox bool.
    toggleStartEndInput: function() {
        if (document.getElementById('eventAllDayCheckbox').checked) {
            document.getElementById('eventStartTimeInput').value = "";
            document.getElementById('eventEndTimeInput').value = "";
            document.getElementById('eventEndTimeInput').disabled = true;
            document.getElementById('eventStartTimeInput').disabled = true;
        } else {
            document.getElementById('eventStartTimeInput').value = "12:00";
            document.getElementById('eventEndTimeInput').value = "12:30";
            document.getElementById('eventEndTimeInput').disabled = false;
            document.getElementById('eventStartTimeInput').disabled = false;
        }
    },

    // createEvent: creates and Event Object and then renders that object onto the calendar
    createEvent: function() {
        var eventObject = {};
        if (!document.getElementById('eventAllDayCheckbox').checked) {
            eventObject = {
                id: globalVariables._eventId++,
                title: document.getElementById('eventTitleInput').value,
                start: document.getElementById('eventDateInput').value + "T" + document.getElementById('eventStartTimeInput').value,
                end: document.getElementById('eventDateInput').value + "T" + document.getElementById('eventEndTimeInput').value,
                overlap: true

            };
        } else {
            eventObject = {
                id: globalVariables._eventId++,
                title: document.getElementById('eventTitleInput').value,
                start: document.getElementById('eventDateInput').value,
                overlap: true
            };
        }

        $('#calendar').fullCalendar('renderEvent', eventObject, true);
    }

};




$(document).ready(function () {

    
    $('#eventStartTimeInput').keydown(function () {
        return false;
    });

    $('#eventEndTimeInput').keydown(function () {
        return false;
    });

    $('#eventEditStartTimeInput').keydown(function () {
        return false;
    });

    $('#eventEditEndTimeInput').keydown(function () {
        return false;
    });

    $('#cancelButton').click(function () {
        schedulerFunctions.closeScheduler();
    });

    $('#submitButton').click(function () {
        schedulerFunctions.createEvent();
        schedulerFunctions.closeScheduler();
    });

    $('#eventAllDayCheckbox').click(function () {
        schedulerFunctions.toggleStartEndInput();
    });
});