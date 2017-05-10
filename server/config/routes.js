var mongoose = require('mongoose');
var products = require('../controllers/product')
var users = require('../controllers/user')
var adminUser = require('../controllers/adminUser')
// var passport = require('./passport')
var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = 'shadman';


var path = require('path')

// Making the Admin and Manager Accounts
adminUser.createAdminUser();


const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

module.exports = function(app){

app.get('/products', function(request, response) {
  products.index(request, response);
});
app.get('/edit/:id', function(request, response) {
  products.show(request, response);
});

// this is going to be the route for the admin add product page

app.get('/smiotastore/admin/addproduct', function(request, response){
  response.sendFile(path.join(__dirname,'../../views/addProductPage.html'))
});

// this is where the stripe get method is going to go
// need to send it to json so angualr has the info
app.get("/checkout", function(request, response){
  response.render("index.pug", {keyPublishable})
});
// then add the charge method using the code there
app.post("/charge", function(request, response){
  let amount = 500;

  stripe.customers.create({
    email: request.body.stripeEmail,
    card: request.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(charge => response.render("charge.pug"));
});

app.post('/user', function(request, response) {
  console.log("ji");
  console.log(response["signedInUser"]);
  users.verifyUser(request, response);
});



app.get('/logout', function(request, response){
  request.logout();
  response.redirect('/')
})


// End of Facebook
app.post('/products', function(request, response) {
  products.create(request, response);
});
app.put('/products/:id', function(request, response) {
  products.update(request, response);
});
app.delete('/products/:id', function(request, response) {
  products.delete(request, response);
});


//This is the redirect to set token page
app.get('/mainpage/:id', function(request, response) {
  response.redirect('/#!/mainpage/' + request.params.id)
});

// This is to verify the token and send the email and name
app.use(function(request, response, next) {

  var token = request.body.token || request.body.query || request.headers['x-access-token'];

  if (token){
    // verify token
    jwt.verify(token, secret, function(err, decoded) {
      if (err){
        response.json({success: false, message: 'Token Invalid'});
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    response.json({success: false, message: 'No token provided'});
  }
});

app.post('/verifytoken', function(request, response){
  console.log('inside the server verifytoken func');
  response.send(request.decoded);
});












}
