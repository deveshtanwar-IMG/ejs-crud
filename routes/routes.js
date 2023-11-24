const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const multer = require('multer');
const fs = require('fs');

// Image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('image');

router.get('/', async (req, res) => {
    try {
        const getData = await Users.find();
        res.render('index', { title: 'Home Page', data: getData })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.get('/add', (req, res) => {
    res.render('add', { title: 'Add User' })
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getDataById = await Users.findById({ _id: id })
        res.render('edit', { title: 'Edit User', data: getDataById })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.post('/add', upload, async (req, res) => {
    try {
        const user = {
            ...req.body,
            image: req.file.filename
        }
        await Users.create(user);
        res.redirect('/')
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.post('/edit/:id', upload, async (req, res) => {
    try {
        const { id } = req.params;
        const { image } = await Users.findOne({ _id: id }, { image: 1 })
        if (req.file) {
            req.body.image = req.file.filename
            fs.unlink('uploads/' + `${image}`, (err) => {
                if (err) {
                    throw err;
                }
            });
        } else {
            req.body.image = image
        }
        await Users.findByIdAndUpdate({ _id: id }, req.body)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Users.findByIdAndDelete({ _id: id })
        console.log(deleteData)
        fs.unlink('uploads/' + `${deleteData.image}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        throw error;
    }
})

module.exports = router;