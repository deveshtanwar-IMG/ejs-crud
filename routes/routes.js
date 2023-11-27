const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const fs = require('fs');
const upload = require('../assets/index')
const multer = require('multer')


router.get('/', async (req, res) => {
    try {
        const getData = await Users.find();
        res.render('index', { data: getData })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.get('/add', (req, res) => {
    res.render('add', { duplicate: '' })
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getDataById = await Users.findById({ _id: id })
        res.render('edit', { duplicate: '', data: getDataById })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.post('/add', async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.render('add', { duplicate: 'File size exceded, max 1mb allowed' })
            } else if (err) {
                // An unknown error occurred when uploading.
                res.render('add', { duplicate: 'File format should jpeg/jpg/png only' })
            }
            else {
                // Everything went fine.
                const { email } = req.body;
                const userExist = await Users.findOne({ email: email });
                if (userExist) {
                    req.files.map((val) => {
                        return (fs.unlink('./public/uploads/' + val.filename, (err) => {
                            console.log('duplicate file delete')
                            console.log('error >>>>', err);
                        }))
                    })
                    res.render('add', { duplicate: 'This email is already used' })
                }
                else {
                    const user = {
                        ...req.body,
                        image: req.files.map((val) => {
                            return (val.filename);
                        })
                    }
                    console.log(user);
                    await Users.create(user);
                    res.redirect('/')
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getDataById = await Users.findById({ _id: id })
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.render('edit', { duplicate: 'File size exceded, max 1mb allowed', data: getDataById})
            } else if (err) {
                // An unknown error occurred when uploading.
                res.render('edit', { duplicate: 'File format should jpeg/jpg/png only',data: getDataById })
            }
            else {
                // Everything went fine.
                const { id } = req.params;
                const { image } = await Users.findOne({ _id: id })
                const user = {
                    ...req.body,
                    image: [
                        ...image,
                        ...req.files.map((val) => {
                            return (val.filename);
                        })
                    ]
                }
                await Users.findByIdAndUpdate({ _id: id }, user)
                res.redirect('/')
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Users.findByIdAndDelete({ _id: id })
        deleteData.image.map((val) => {
            console.log(val)
            fs.unlink('./public/uploads/' + `${val}`, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Delete File successfully.");
            });
        })
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        throw error;
    }
})

router.get('/remove/:id/:imageId', async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const imageId = req.params.imageId;
        fs.unlink('./public/uploads/' + imageId, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete File Successfully")
        });
        await Users.findByIdAndUpdate({ _id: id }, { $pull: { image: imageId } })
        return res.redirect(`/edit/${id}`)
    }
    catch (error) {
        console.log(error);
        throw error;
    }
})

module.exports = router;