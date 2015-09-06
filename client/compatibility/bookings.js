function renderBookingList() {
  var budget = getBudgetPerId(this.params._id);
  
  if(budget !== undefined) {
    var bookingList = Bookings.find(
        {budgets:{$in:[budget._id]}}
      );

    // Render booking list - Results found
    if(bookingList.count() > 0) 
      this.render('bookingList', {
        data:{
          bookings:bookingList,
          budgetName:budget.name
        }
      });
    // no results found - render errormessage
    else this.render('noBookings');
  }
  // no budget found - render 404
  else this.render('budget404');
}
