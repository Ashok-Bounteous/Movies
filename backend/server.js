// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 3000;

// const apiKey = 'F4bSsszGrZFZ3GY2hRrNMQ==DMCsGYBQ8NTAWspF';
// const apiEndpoint = 'http://api.api-ninjas.com/v1/celebrity';


// app.get('/api/celebrity', async (req, res) => {
//   const { name } = req.query;

//   try {
//     const response = await axios.get(`${apiEndpoint}?name=${name}`, {
//       headers: { 'X-Api-Key': apiKey }
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server listening at http://localhost:${port}`);
// });
// const express = require('express');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// // const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use(cors());

// let users = require('./db.json').users;
// const defaultMovies = require('./defaultMovies.json');

// app.post('/api/signup', (req, res) => {
//   const { email, password } = req.body;
//   const user = { email, password, movies: defaultMovies };

//   if (users.find(u => u.email === email)) {
//     return res.status(409).send('User already exists.');
//   }

//   users.push(user);

//   fs.writeFile('./db.json', JSON.stringify({ users }), (err) => {
//     if (err) {
//       return res.status(500).send('Error saving user.');
//     }
//     res.status(201).send('User created.');
//   });
// });

// app.post('/api/search', (req, res) => {
//   const { email, movie } = req.body;
//   const user = users.find(u => u.email === email);

//   if (!user) {
//     return res.status(404).send('User not found.');
//   }

//   user.movies.push(movie);

//   fs.writeFile('./db.json', JSON.stringify({ users }), (err) => {
//     if (err) {
//       return res.status(500).send('Error saving movie.');
//     }
//     res.status(200).send('Movie added.');
//   });
// });

// app.get('/api/user-movies', (req, res) => {
//   const { email } = req.query;
//   const user = users.find(u => u.email === email);

//   if (!user) {
//     return res.status(404).send('User not found.');
//   }

//   res.status(200).json(user.movies);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3100;

const apiKey = 'F4bSsszGrZFZ3GY2hRrNMQ==DMCsGYBQ8NTAWspF';
const apiEndpoint = 'http://api.api-ninjas.com/v1/celebrity';

app.use(bodyParser.json());
app.use(cors());

const https = require('https');
const agent = new https.Agent({  
  rejectUnauthorized: false
});


let users = require('./db.json').users;
// const defaultMovies = require('./defaultMovies.json');
const defaultMovies = require('./db.json').default;

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const user = { email, password, movies: defaultMovies };

  if (users.find(u => u.email === email)) {
    return res.status(409).send('User already exists.');
  }

  users.push(user);

  fs.writeFile('./db.json', JSON.stringify({ users }), (err) => {
    if (err) {
      return res.status(500).send('Error saving user.');
    }
    res.status(201).send('User created.');
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password.');
  }

  res.status(200).send('Login successful.');
});

app.post('/api/search', (req, res) => {
  const { email, movie } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).send('User not found.');
  }

  user.movies.push(movie);

  fs.writeFile('./db.json', JSON.stringify({ users }), (err) => {
    if (err) {
      return res.status(500).send('Error saving movie.');
    }
    res.status(200).send('Movie added.');
  });
});

app.get('/api/user-movies', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).send('User not found.');
  }

  res.status(200).json(user.movies);
});

app.get('/api/celebrity', async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`${apiEndpoint}?name=${name}`, {
      headers: { 'X-Api-Key': apiKey },
      httpsAgent: agent
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
