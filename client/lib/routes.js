Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', function () {
  this.render('budgetList');
  this.render('selectaBudget',{to:'top'});
});

Router.route('/budget/:_id', function () {
  var budget = getBudgetPerId(this.params._id);
  var budgetId = budget !== undefined ? budget._id : this.params._id;

  this.layout('Layout',{
    data:{
      selectedBudget:budgetId,
      budget:budget
    }
  });

  renderBudgetList.call(this);
  renderBookingList.call(this);
});
