Budgets = new Mongo.Collection("budgets");
/*
Budgets.insert({name:"Not in Budget",type:"internal",new:0,amount:0});
Budgets.insert({name:"Car",type:"debt",new:0,amount:26000});
Budgets.insert({name:"Food",type:"spendings",new:0,amount:150});
*/
Budgets.attachSchema(new SimpleSchema({
  name:{
    type:String,
    label:"Budget Name",
    max:200
  },
  type:{
    type:String,
    regEx: /^(internal|debt|spendings)$/
  },
  new:{
    type:Number,
    label:"New Bookings",
    decimal:true
  },
  amount:{
    type:Number,
    label:"Amount",
    decimal:true
  }
}));

//var notInBudgetId = Budgets.findOne({type:"internal"})._id;

Bookings = new Mongo.Collection("bookings");
/*
Bookings.insert({name:"Food",amount:-200,client:"REWE Barsinghausen",account:"Giro",budgets:[notInBudgetId]});
Bookings.insert({name:"Gadget",amount:-2000,client:"Amazon.de",account:"ING",budgets:[notInBudgetId]});
Bookings.insert({name:"Salary",amount:6000,client:"Red Hat",account:"Giro",budgets:[notInBudgetId]});
*/
if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
