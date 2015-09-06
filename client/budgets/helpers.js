Template.budgetList.helpers({
  budgets:Budgets.find(),
  isInternal:function(type) {
    return type !== 'internal';
  }
});

Template.budget.helpers({
  itemType:function(type) {
    var currentBudgetId = Router.current().params._id;
    if(this._id === currentBudgetId ||
       ("NotInBudget" === currentBudgetId && 
        this._id === Budgets.findOne({type:'internal'})._id))
      return "warning";
    else if(type === "spendings") return "primary";
    else return "danger";
  },
  hasNew:function(n) {
    return n > 0;
  }
});

Template.budgetFunctions.helpers({
  getBudgetBookingsAmount:function() {
    var currentBudgetId = Template.currentData().selectedBudget;
    var bookings = Bookings.find(
        {budgets:{$in:[currentBudgetId]}}
      );
    
    var bookingAmount = 0;
    bookings.forEach(function(booking) {
      bookingAmount += booking.amount;
    });

    console.log("-- "+bookingAmount);
    return bookingAmount;
  },
  getBudgetSum:function() {
    var budgetAmount = 
      Template.budgetFunctions.__helpers.get("getBudgetBookingsAmount")();

    if(Template.currentData().budget.type === 'debt')
      return Template.currentData().budget.amount -
        budgetAmount;
    else
      return Template.currentData().budget.amount +
        budgetAmount;
  },
  isDebt:function() {
    return Template.currentData().budget.type === 'debt';
  }
});

Template.colorizeDecimal.helpers({
  isNegative:function(decimal) {
    return decimal < 0;
  }
});

Template.budgetErrors.helpers({
  errors: function() {
    var context = Budgets.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data) {
      return {message: context.keyErrorMessage(data.name)}
    });
  }
});
