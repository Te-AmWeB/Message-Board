const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let messages = [
    { id: 1, user: "Amanda", text: "Hi there!", added: new Date() },
    { id: 2, user: "Charles", text: "Hello world!", added: new Date() },
    { id: 3, user: "Egor", text: "Good morning!", added: new Date() }
];

// ===== ГЛАВНАЯ СТРАНИЦА =====
app.get('/', (req, res) => {
    res.render('index', { messages: messages });
});

// ===== СТРАНИЦА НОВОГО СООБЩЕНИЯ =====
app.get('/new', (req, res) => {
    res.render('form');
});

// ===== СТРАНИЦА ОТДЕЛЬНОГО СООБЩЕНИЯ =====
app.get('/message/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const msg = messages.find((m) => m.id === id);
    if (msg) {
        res.render('message', { msg: msg });
    } else {
        res.status(404).send('Сообщение не найдено');
    }
});

// ===== ОТПРАВКА НОВОГО СООБЩЕНИЯ (С ПРОВЕРКОЙ) =====
app.post('/new', (req, res) => {
    const { user, text } = req.body;
    if (!user || !text || user.trim() === '' || text.trim() === '') {
        return res.render('new', { error: '❌ Заполните все поля!' });
    }

    const newMsg = {
        id: messages.length + 1,
        user: user.trim(),
        text: text.trim(),
        added: new Date()
    };
    messages.push(newMsg);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});