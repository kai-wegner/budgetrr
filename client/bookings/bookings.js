Template.booking.events({
  'dragstart .bookingItem':function(event,template) {
    console.log("Dragged");
    
    var e = event.originalEvent;
    e.dataTransfer.effectAllowed = "move";

    Session.set("dropedBooking",this);
  }
 });
