$(document).ready(function () {

    // setDayData: used to retrieve data of clicked day and display it using id's from table data elements.
    function setDayData(date) {

        var formattedDate = date.toString().replace(" GMT+0000", "");

        // ['dayName', 'month', 'dayNumber', 'year', 'time']
        var splitDate = formattedDate.split(" ");
        document.getElementById('dataDay').innerHTML = splitDate[0] + ', ' + splitDate[1] + ' ' + splitDate[2] + ' ' + splitDate[3];
    };
    function createEvent() {
        document.getElementById('eventSchedulerDiv').hidden = "";

    };
    

    // Code below relies on an HTML element with an id of "calendar"
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
            createEvent();
        },
        defaultView: 'month',
        editable: true,
        eventLimit: true, // allow "more" link when too many events

        events: [
            {
                title: 'Test Event',
                start: '2017-09-21',
                description: 'test description'
            }],

    });

    $('input.timepicker').timepicker({});

    $('#cancelButton').click(function () {
        document.getElementById('eventSchedulerDiv').hidden = "hidden";
    })

});
