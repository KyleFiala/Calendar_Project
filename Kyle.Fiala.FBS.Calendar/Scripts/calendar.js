//Gobal variable declarations
var globalVariables = {
    _eventId: 0,
    _tempDate: "",
    _tempStart: "",
    _tempEnd: "",
    _selectedEvent: {}
}

$(document).ready(function () {

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
            schedulerFunctions.setDayData(date);
            globalVariables._tempDate = schedulerFunctions.getDayData(date);
            schedulerFunctions.openScheduler();
            eventEditorFunctions.closeEventEditor();
        },
        eventClick: function (calEvent, jsEvent, view) {
            eventEditorFunctions.selectedEvent(calEvent);
            eventEditorFunctions.openEventEditor();
            eventEditorFunctions.populateEventEditor(eventEditorFunctions.getEventData(calEvent));
            schedulerFunctions.closeScheduler();

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

});
