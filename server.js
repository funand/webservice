const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var request = require('request');

app.set('view engine', 'ejs');

const answers = {
    "description": {
        q: "Tell me about yourself",
        a: "I am a problem-solving Software Engineer, looking to do social good. "
    },
    "hobbies": {
        q: "What are your favorite hobbies?",
        a: "My hobbies are sports, programming, video games and poker."
    },
    "tech": {
        q: "What excites you about technology",
        a: "I am excited by virtual reality, artificial intelligence and blockchain capabilities. "
    },
    "techstack": {
        q: "What is your preferred technology stack",
        a: "My preferred technology stack is the react/node stack."
    }
}

app.get('/aboutme', (req, res) => {

    if(!req.query.q || req.query.q === '') {
        res.send(answers);
    }

    switch(req.query.q) {
        case 'description': res.send(answers.description);
        case 'hobbies': res.send(answers.hobbies);
        case 'tech': res.send(answers.tech);
        case 'techstack': res.send(answers.techstack);
        default: res.send('Not found');
    }

});

// I centered the page with margin, do you wan't text-align center?
app.get('/posts', (req, res) => {
    request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('index', {
                data: JSON.parse(body)
            });
        }
    });
});

app.use((req, res) => {
    res.status(404).send('Not found')
});

app.listen(port, () => {
    console.log('RESTful API server started on: ' + port);
});