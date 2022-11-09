const bcrypt = require('bcrypt');
const Book = require('../models/Book');
const cloudinary = require("../utils/Cloudinary");


const upload = async (req, res) =>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        let book = new Book({
            title: req.body.title,
            author: req.body.author,
            referencenumber: req.body.referencenumber,
            format: req.body.format,
            language: req.body.language,
            isbn3: req.body.isbn3,
            releasedate: req.body.releasedate,
            publisher: req.body.publisher,
            weight: req.body.weight,
            downloadurl: result.secure_url,
          });

        res.status(201).json({'message': 'Book uploaded successfully', data : {
            ...book
        }});

    }
    catch(err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = {upload};
