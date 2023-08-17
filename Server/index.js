const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://gsalive2002:gsalive2002@cluster0.ypuyyvj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

app.post('/api/register', async (req, res) => {
    console.log(req.body);

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ status: 'error', error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
   
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        }).collation({ locale: 'en', strength: 2 });
        //collation o perfom proper comparsion of strings 
        

        if (user) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
            );
            
            return res.json({ status: 'ok', user: token});
        } else {
            return res.json({ status: 'error', user: false });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ status: 'error', error: 'Server error' });
    }
});

app.get('/api/dialog', async (req, res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.findOne({email:email})
        return res.json({status :'ok',dialog:user.dialog})

    }catch(error){
        console.log(error)
        res.json({status:'error',error:'invalid token'})
    }
})
//creae the dialog
app.post('/api/dialog', async (req, res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.updateOne (
            {email:email},
            {$set:{dialog:req.body.dialog}}
            )
        return res.json({status :'ok',dialog:user.dialog})

    }catch(error){
        console.log(error)
        res.json({status:'error',error:'invalid token'})
    }
})
app.listen(1337, () => {
    console.log('Server is running on port 1337');
});
