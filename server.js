var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();

app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'banana',
			entries: 0,
			joined: new Date()
		}
	],
}
 
app.get('/', (req, res) => {
	res.send(database.users)
})

app.post('/signin', (req, res) => {
	bcrypt.compare("apples", '$2a$10$7oIc0T5Qsih9Y2AvCaR6p.TwqAPzLyHvBveXdnvbrEpB0LQKiLuuC', function(err, res) {
	    console.log('first guess', res)
	});
	bcrypt.compare("veggies", '$2a$10$7oIc0T5Qsih9Y2AvCaR6p.TwqAPzLyHvBveXdnvbrEpB0LQKiLuuC', function(err, res) {
	    console.log('second guess', res)
	});
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) 
	{
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);
    });
});
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (found === false) {
		res.status(400).json('not found');
	}
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})

app.put('/image', (req, res) => {
		const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})