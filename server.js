const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//port form machine and heroku heroku
const port = process.env.PORT || 3000;
var app = express();

//registerPartials advance templating used for include 
hbs.registerPartials(__dirname + '/views/partials');
//apply handlebards
app.set('view engine', 'hbs');


//middleware for static html or file
//custom
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	//logger
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log("Unable to append to server.log");
		}
	});
	next();
});

//For maintenance page
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');	
// });

//from express
app.use(express.static(__dirname + '/public'));

//partial helper name, function
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamtIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (request, response) => {
	// response.send('Hello express');
	response.render('home.hbs', { 
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to our api docx'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',  {
		pageTitle: 'About Page'
	});
});

app.get('/profile', (req, res) => {
	res.render('portfolio.hbs',  {
		pageTitle: 'Portfolio Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		status: 404,
		errorMessage: 'request error, seems like nothing bad happened'
	});
});

app.get('/api', (request, response) => {
	// response.send('Hello express');
	response.send({ 
		name: 'Justin',
		likes: [
			'dota2',
			'food', 
			'reading'
		]
	});
});


//start up or listen the app in server
app.listen(port, () => {
	console.log(`Server is up port ${port}`);
});