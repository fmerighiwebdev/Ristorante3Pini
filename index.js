import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const cookiePref = req.cookies.cookiePref || null;
    res.render('index.ejs', { cookiePref });
});

app.get('/menu', (req, res) => {
    res.render('menu.ejs');
});

app.get('/conventions', (req, res) => {
    res.render('conventions.ejs');
});

app.get('/privacy-policy', (req, res) => {
    res.render('privacy.ejs');
});

app.post('/cookie-pref', (req, res) => {
    const cookiePref = req.body.cookieAction;

    if (cookiePref === 'accept') {
        res.cookie('cookiePref', 'accepted', { maxAge: 1000 * 60 * 60 * 24 * 30 });
    } else if (cookiePref === 'deny') {
        res.cookie('cookiePref', 'denied', { maxAge: 1000 * 60 * 60 * 24 * 30 });
    }

    res.redirect(req.get('referer'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});