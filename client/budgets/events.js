Template.budget.events({
  "dragenter":function(event,template) {
    event.preventDefault();
  },
  "dragover":function(event,template) {
    var e = event.originalEvent;

    e.dataTransfer.effectAllowed = "move";
    event.preventDefault();
  },
  "drop .btn":function(event,template) {
    var booking = Session.get("dropedBooking");
    var target = $(event.target);

    target.tooltip({title:"Added "+booking.name+" - "+booking.amount,placement:"bottom",trigger:"manual"});
    target.tooltip('show');

    // remove from the current budget
    var currentBudgetId = Template.parentData().selectedBudget;
    var currentBudgetIndex = booking.budgets.indexOf(currentBudgetId);
    if (currentBudgetIndex > -1)
      booking.budgets.splice(currentBudgetIndex,1);

    // check and add to budget if necessary
    var newBudgetId = event.currentTarget.dataset.budgetid;
    var newBudgetIndex = booking.budgets.indexOf(newBudgetId);
    if (newBudgetIndex == -1)
      booking.budgets.push(newBudgetId);

    Bookings.update(booking._id,booking);

    window.setTimeout(function() {target.tooltip('destroy')},1500);
    Session.set("dropedBooking",undefined);
  },
  "click .btn":function(event,template) {
    var target = $(event.target);
    var budgetId = event.currentTarget.dataset.budgetid; 
    
    if(this.type === "internal")
      budgetId = "NotInBudget";  

    selectBudget(budgetId);
  }
});

Template.modalAddBudget.events({
  "click #addBudgetSubmit":function(event,template) {
    var newBudget = {
      name: $('#editBudgetName').val(),
      type: $("input[name='newBudgetType']:checked").val(),
      new:0,
      amount : $('#editBudgetAmount').val()
    }

    Budgets.insert(newBudget, {validationContext:'addBudget'}, function(error,result) {
      if(!error) {
        $('#addBudget').modal('hide');

        // reset the form
        $('#editBudgetName').val("");
        $("input[name='newBudgetType']:checked").attr("checked",false);
        $('#editBudgetAmount').val('');
       }
    });
  }
});
