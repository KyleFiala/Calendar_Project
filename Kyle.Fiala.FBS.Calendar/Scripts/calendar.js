$(document).ready(function () {
    //Gobal variable declarations
    var _tempDate;

    // setDayData: used to retrieve data of clicked day and display it in "Selected Day"
    // using id's from table data elements.
    // splitDate = ['dayName', 'month', 'dayNumber', 'year', 'time', 'monthNumber']
    function setDayData(date) {
        var formattedDate = date.toString().replace(" GMT+0000", "");
        var splitDate = formattedDate.split(" ");
        document.getElementById('dataDay').innerHTML = splitDate[0] + ', ' + splitDate[1] + ' ' + splitDate[2] + ' ' + splitDate[3];
    };

    // getDayData: returns an array containing all pieces of a date object
    // splitDate = ['dayName', 'month', 'dayNumber', 'year', 'time', 'monthNumber']
    function getDayData(date) {
        var formattedDate = date.toString().replace(" GMT+0000", "");
        var tempDate = new Date($('#calendar').fullCalendar('getDate'));
        var month_int = tempDate.getMonth() + 1;

        var splitDate = formattedDate.split(" ");
        splitDate.push("0" + month_int.toString());

        return splitDate;
    };

    // openScheduler: reveals eventSchedulerDiv and fields. Assigns clicked day date to Date Field
    function openScheduler() {
        document.getElementById('eventSchedulerDiv').hidden = "";
        document.getElementById('eventDateInput').value = _tempDate[3] + "-" + _tempDate[5] + "-" + _tempDate[2];
    };

    // closeScheduler: resets fields to empty strings and hides eventSchedulerDiv
    function closeScheduler() {
        document.getElementById('eventSchedulerDiv').hidden = "hidden";
        document.getElementById('eventTitleInput').value = "";
        document.getElementById('eventDateInput').value = "";
        document.getElementById('eventAllDayCheckbox').checked = false;
        toggleStartEndInput();

    };

    // toggleStartEndInput: disables or enables start and end input fields based on all day checkbox bool.
    function toggleStartEndInput() {
        if (document.getElementById('eventAllDayCheckbox').checked) {
            document.getElementById('eventStartTimeInput').value = "";
            document.getElementById('eventEndTimeInput').value = "";
            document.getElementById('eventEndTimeInput').disabled = true;
            document.getElementById('eventStartTimeInput').disabled = true;
        } else {
            document.getElementById('eventStartTimeInput').value = "12:00";
            document.getElementById('eventEndTimeInput').value = "12:30";
            document.getElementById('eventEndTimeInput').disabled = false;
            document.getElementById('eventStartTimeInput').disabled = false
        }
    };

    function createEvent() {
        var eventObject = {};
        if (!document.getElementById('eventAllDayCheckbox').checked) {
            eventObject = {
                title: document.getElementById('eventTitleInput').value,
                start: document.getElementById('eventDateInput').value + "T" + document.getElementById('eventStartTimeInput').value,
                end: document.getElementById('eventDateInput').value + "T" + document.getElementById('eventEndTimeInput').value,
                overlap: true

            };
        } else {
            eventObject = {
                title: document.getElementById('eventTitleInput').value,
                start: document.getElementById('eventDateInput').value,
                overlap: true
            };
        }

        $('#calendar').fullCalendar('renderEvent', eventObject, true);
    };

    // Code below relies on an HTML element with an id of "calendar". Initializes fullCalendar
    $('#calendar').fullCalendar({
        // header, used to format the display of fullCalendar
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        // triggered when a user clicks on a day. date holds a 'Moment' for a clicked day.
        dayClick: function (date, jsEvent, view) {
            setDayData(date);
            _tempDate = getDayData(date);
            openScheduler();
        },
        // Formats event after a event has been rendered
        eventAfterRender: function(event, $el, view ) {
            var formattedTime = $.fullCalendar.formatRange(event.start, event.end, "h:mm");
            // if event has fc-short class, data-start value will be displayed
            // remove fc-short class and update fc-time span text
            if($el.is('.fc-short') ) {
                $el.find(".fc-time span").text(formattedTime + " - " + event.title);
                $el.removeClass('fc-short');
                $el.find('.fc-title').remove();
            }
        },
        defaultView: 'month',
        editable: true,
        eventLimit: true, // allow "more" link when too many events

    });

    $('input.timepicker').timepicker(
        {
        timeFormat: 'HH:mm',
        defaultTime:'12',
        scrollbar: true
        }
    );
    // initialize event endTime to default 12:30 and prevent keystrokes within eventStartTimeInput and eventEndTimeInput
    document.getElementById("eventEndTimeInput").value = "12:30";
    $('#eventStartTimeInput').keydown(function () {
        return false;
    });

    $('#eventEndTimeInput').keydown(function () {
        return false;
    });

    $('#cancelButton').click(function () {
        closeScheduler();
    })

    $('#submitButton').click(function () {
        createEvent();
        closeScheduler();
    })

    $('#eventAllDayCheckbox').click(function () {
        toggleStartEndInput();
    })



});
