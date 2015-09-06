function renderBudgetList() {
  var budget = getBudgetPerId(this.params._id);

  this.render('budgetList',{to:'top'});
  if(budget !== undefined)  
    this.render('budgetFunctions', {to:'budgetFunctions'})
}

function selectBudget(budgetId) {
  Router.go('/budget/'+budgetId);
}

function getBudgetPerId(id) {
  var budgetId = id;
  
  if(budgetId === "NotInBudget")
    budgetId = Budgets.findOne({type:"internal"})._id;  

  return Budgets.findOne({_id:budgetId});
}
