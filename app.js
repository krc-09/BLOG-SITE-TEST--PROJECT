const sequelize = require('./utils/database');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const Blog = require('./Models/Blog'); 
const Comment = require('./Models/Comment')


app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'views'))); 


 const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes);

sequelize.sync()
  .then(result => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });

