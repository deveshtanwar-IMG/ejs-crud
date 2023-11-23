const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const multer = require('multer');
const fs = require('fs');

// Image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
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
        console.log(error)
    }
})

router.post('/add', upload, async (req, res) => {
    try {
        const user = {
            ...req.body,
            image: req.file.filename
        }
        await Users.create(user);
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/edit/:id', upload, async (req, res) => {
    try {
        const { id } = req.params;
        const user = {
            ...req.body,
            image: req.file.filename
        }
        const updateData = await Users.findByIdAndUpdate({ _id: id }, user)
        fs.unlink('uploads/' + `${updateData.image}`, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File successfully.");
        });
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error);
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
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;