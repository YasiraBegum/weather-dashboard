const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '81ffbe14226e93dccd19e8e7240567d6';

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'City not found' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
