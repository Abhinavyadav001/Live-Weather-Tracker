const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Public static path
const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views')); 

// Routing
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/weather", (req, res) => { 
    res.render("weather");
});

app.get("*", (req, res) => {
    res.status(404).render('404error', {
        error: 'Oops Page not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
