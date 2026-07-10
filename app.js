import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine","ejs")
app.use(express.static("public"));
const URL='https://api.mediastack.com/v1/news'
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(URL, {
      params: {
        access_key: process.env.MEDIASTACK_API_KEY,
        countries: 'in',
        limit: 25,
        languages: 'en'
      },
    });
    const result = response.data;
    // console.log(result);
    // console.log(result.data);
    res.render("main",{data:result.data});
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).render("main",{
      error: "Failed to fetch news. Please try again later."
    });
  }
});

app.get('/category/:cat', async (req, res) => {
  try {
    const response = await axios.get(URL, {
      params: {
        access_key: process.env.MEDIASTACK_API_KEY,
        limit: 25,
        languages: 'en',
        categories: `${req.params.cat}`
      },
    });
    const result = response.data;
    // console.log(result);
    // console.log(result.data);
    res.render("cats",{data:result.data,cat:req.params.cat});
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).render("main",{
      error: "Failed to fetch news. Please try again later."
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
