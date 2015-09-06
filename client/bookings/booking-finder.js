/*  searchElement:{
 *    compareBooking:{}, // mandatory
 *    currentBooking:{}, // optional
 *    onResult:function  // optional - mandatory for searchForBookings because 
 *                          it uses Collection.forEach()
 *  }
 * */
function searchForBookings(searchElement) {
  Bookings.find({search:{$exists:true}}).forEach(function(compareBooking) {
    searchElement.compareBooking = compareBooking;
    findBookings(searchElement);
  });
}

function findBookings(searchElement) {
  var searchConditions = [searchElement.compareBooking.search];
  
  if(searchElement.currentBooking !== undefined)
    searchConditions.push({_id:searchElement.currentBooking._id});

  var bookingResult = Bookings.findOne({$and:searchConditions}).fetch();
  var result = {
    foundBookings:bookingResult,
    search:searchElement.compareBooking.search,
    matchingBudgets:searchElement.compareBooking.budgets
  };

  if(searchElement.onResult !== undefined && bookingResult.length > 0)
    searchElement.onResult(result);
  else if(onResult === undefined)
    return result;
}

