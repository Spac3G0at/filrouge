const app = require('express')();
const db = require('./conf');

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
	db.query('SELECT * FROM nodejs', (err, results) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(results);
		}
	});
})

.get('/light', (req, res) => {
	db.query('SELECT id, text, boolean FROM nodejs', (err, results) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(results);
		}
	});
})

.get('/contains/:query', (req, res) => {
	const query = req.params.query;
	db.query(`SELECT * FROM nodejs WHERE text LIKE '%${query}%'`, (err, result) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(result);
		}
	});
})

.get('/begin/:query', (req, res) => {
	const query = req.params.query;
	db.query(`SELECT * FROM nodejs WHERE text LIKE '${query}%'`, (err, result) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(result);
		}
	});
})

.get('/greater/:number', (req, res) => {
	const number = req.params.number;
	db.query(`SELECT * FROM nodejs WHERE entier > ${number}`, (err, result) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(result);
		}
	});
})

.get('/order/:order', (req, res) => {
	const order = req.params.order;
	db.query(`SELECT * FROM nodejs ORDER BY id ${order}`, (err, result) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données');
		} else {
			res.json(result);
		}
	});
})

.post('/', (req, res) => {
	const formData = req.body;
	db.query('INSERT INTO nodejs SET ?', formData, (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send("Erreur lors de la sauvegarde des données");
		} else {
			res.sendStatus(200);
		}
	});
})

.put('/edit/:id', (req, res) => {
	const id = req.params.id;
	const formData = req.body;
	db.query('UPDATE nodejs SET ? WHERE id = ?', [formData, id], err => {
		if (err) {
			console.log(err);
			res.status(500).send("Erreur lors de la modification des données");
		} else {
			res.sendStatus(200);
		}
	});
})

.put('/toggle/:id', (req, res) => {
	const id = req.params.id;
	db.query('UPDATE nodejs SET boolean = !boolean WHERE id = ?', [id], err => {
		if (err) {
			console.log(err);
			res.status(500).send("Erreur lors de la modification des données");
		} else {
			res.sendStatus(200);
		}
	});
})

.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	db.query('DELETE FROM nodejs WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send("Erreur lors de la suppression des données");
		} else {
			res.sendStatus(200);
		}
	});
})

.delete('/deleteThem', (req, res) => {
	db.query('DELETE FROM nodejs WHERE boolean = 0', (err, result) => {
		if (err) {
			res.status(500).send("Erreur lors de la suppression des données");
		} else {
			res.sendStatus(200);
		}
	});
})

.listen(3000, () => {
	console.log('Running on port 3000');
});