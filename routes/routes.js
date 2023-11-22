const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

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

router.post('/add', async (req, res) => {
    try {
        await Users.create(req.body);
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndDelete({ _id: id })
        res.status(200).redirect('/')
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;