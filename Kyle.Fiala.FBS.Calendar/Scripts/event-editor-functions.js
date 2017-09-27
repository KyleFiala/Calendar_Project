var eventEditorFunctions = {
    // selectedEvent: stores the last clicked event into globalVariables._selectedEvent
    selectedEvent: function(calEvent) {
        var tempID = calEvent.id;
        globalVariables._selectedEvent = {
            title: calEvent.title,
            start: calEvent.start,
            end: calEvent.end,
            id: tempID,
            overlap: true

        };
    },

    // getEventData: retrieves data from an event and returns it in an easy to access object
    getEventData: function(calEvent) {
        var tempStart = moment(calEvent.start).format('YYYY-MM-DD HH:mm');
        var tempEnd = moment(calEvent.end).format('YYYY-MM-DD HH:mm');
        var tempSplitStart = tempStart.split(" ");
        var tempSplitEnd = tempEnd.split(" ");

        var eventObject = {
            title: calEvent.title,
            startDate: tempSplitStart[0],
            startTime: tempSplitStart[1],
            endDate: tempSplitEnd[0],
            endTime: tempSplitEnd[1],
            allDay: calEvent.allDay
        };

        return eventObject;
    },

    // toggleEditStartEndInput: disables or enables start and end input fields in event editor based on all day checkbox bool.
    toggleEditStartEndInput: function() {

        if (document.getElementById('eventEditAllDayCheckbox').checked) {
            globalVariables._tempStart = document.getElementById('eventEditStartTimeInput').value;
            globalVariables._tempEnd = document.getElementById('eventEditEndTimeInput').value;
            document.getElementById('eventEditStartTimeInput').value = "";
            document.getElementById('eventEditEndTimeInput').value = "";
            document.getElementById('eventEditEndTimeInput').disabled = true;
            document.getElementById('eventEditStartTimeInput').disabled = true;
        } else {
            document.getElementById('eventEditStartTimeInput').value = globalVariables._tempStart;
            document.getElementById('eventEditEndTimeInput').value = globalVariables._tempEnd;
            document.getElementById('eventEditEndTimeInput').disabled = false;
            document.getElementById('eventEditStartTimeInput').disabled = false;
        }
    },

    // openEventEditor: opens event Editor pane
    openEventEditor: function() {
        document.getElementById('eventEditorDiv').hidden = "";
    },

    // closeEventEditor: closes event Editor pane
    closeEventEditor: function() {
        document.getElementById('eventEditorDiv').hidden = "hidden";
    },

    // populateEventEditor: populates the event Editor with clicked on event data.
    populateEventEditor: function(eventObject) {
        if (eventObject.allDay) {
            document.getElementById('eventTitleHeader').innerHTML = 'Event: ' + eventObject.title;
            document.getElementById('eventEditTitleInput').value = eventObject.title;
            document.getElementById('eventEditDateInput').value = eventObject.startDate;
            document.getElementById('eventEditEndTimeInput').disabled = true;
            document.getElementById('eventEditStartTimeInput').disabled = true;
            document.getElementById('eventEditAllDayCheckbox').checked = true;
            eventEditorFunctions.toggleEditStartEndInput();
        } else {
            document.getElementById('eventTitleHeader').innerHTML = 'Event: ' + eventObject.title;
            document.getElementById('eventEditTitleInput').value = eventObject.title;
            document.getElementById('eventEditDateInput').value = eventObject.startDate;
            document.getElementById('eventEditStartTimeInput').value = eventObject.startTime;
            document.getElementById('eventEditEndTimeInput').value = eventObject.endTime;
            // ensure fields are enabled if the even is not allDay
            document.getElementById('eventEditEndTimeInput').disabled = false;
            document.getElementById('eventEditStartTimeInput').disabled = false;
            document.getElementById('eventEditAllDayCheckbox').checked = false;
        }

    },

    // removeEvent: removes event based on last selectedEvents id.
    removeEvent: function(event) {
        $('#calendar').fullCalendar('removeEvents', event.id);
    },

    updateEvent: function(eventObject) {

        var originalEvent = globalVariables._selectedEvent;
        var updatedEvent = {};

        if (!document.getElementById('eventEditAllDayCheckbox').checked) {
            updatedEvent = {
                id: originalEvent.id,
                title: document.getElementById('eventEditTitleInput').value,
                start: document.getElementById('eventEditDateInput').value + "T" + document.getElementById('eventEditStartTimeInput').value,
                end: document.getElementById('eventEditDateInput').value + "T" + document.getElementById('eventEditEndTimeInput').value,
                overlap: true

            };
        } else {
            updatedEvent = {
                id: originalEvent.id,
                title: document.getElementById('eventEditTitleInput').value,
                start: document.getElementById('eventEditDateInput').value,
                overlap: true
            };
        }

        eventEditorFunctions.removeEvent(originalEvent);

        $('#calendar').fullCalendar('renderEvent', updatedEvent, true);

        eventEditorFunctions.closeEventEditor();

    }
};

$(document).ready(function () {

    $('#cancelEditButton').click(function () {
        eventEditorFunctions.closeEventEditor();
    })

    $('#submitEditButton').click(function () {
        eventEditorFunctions.updateEvent(globalVariables._selectedEvent)
    })

    $('#eventEditAllDayCheckbox').click(function () {
        eventEditorFunctions.toggleEditStartEndInput();
    })

    $("#deleteEventButton").click(function () {
        eventEditorFunctions.removeEvent(globalVariables._selectedEvent);
        eventEditorFunctions.closeEventEditor();
    })

});