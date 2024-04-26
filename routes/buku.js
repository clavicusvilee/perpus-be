import express from 'express';
import { body, validationResult } from 'express-validator';
import connection from '../database.js';

const router = express.Router();

/**
 * INDEX buku
 */
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM buku ORDER BY id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data buku',
                data: rows
            });
        }
    });
});

/**
 * STORE POST
 */
router.post('/create', [
    body('namaBuku').notEmpty(),
    body('isbn').notEmpty(),
    body('kategori').notEmpty(),
    body('pengarang').notEmpty(),
    body('stok').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const formData = {
        namaBuku: req.body.namaBuku,
        isbn: req.body.isbn,
        kategori: req.body.kategori,
        pengarang: req.body.pengarang,
        stok: req.body.stok
    };

    connection.query('INSERT INTO buku SET ?', formData, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            });
        }
    });
});

/**
 * SHOW POST
 */
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`SELECT * FROM buku WHERE id = ${id}`, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        }

        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            });
        }
    });
});

/**
 * UPDATE POST
 */
router.patch('/update/:id', [
    body('namaBuku').notEmpty(),
    body('isbn').notEmpty(),
    body('kategori').notEmpty(),
    body('pengarang').notEmpty(),
    body('stok').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const id = req.params.id;
    const formData = {
        namaBuku: req.body.namaBuku,
        isbn: req.body.isbn,
        kategori: req.body.kategori,
        pengarang: req.body.pengarang,
        stok: req.body.stok
    };

    connection.query(`UPDATE buku SET ? WHERE id = ${id}`, formData, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            });
        }
    });
});

/**
 * DELETE POST
 */
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
     
    connection.query(`DELETE FROM buku WHERE id = ${id}`, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            });
        }
    });
});

export default router;