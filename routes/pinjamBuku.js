import express from 'express';
import { body, validationResult } from 'express-validator';
import connection from '../database.js';

const router = express.Router();

/**
 * INDEX pinjam
 */
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM pinjam ORDER BY id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data pinjam',
                data: rows
            });
        }
    });
});

/**
 * STORE POST
 */
router.post('/create', [
    body('namaPeminjam').notEmpty(),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('noPinjam').notEmpty(),
    body('isbn').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const formData = {
        namaPeminjam: req.body.namaPeminjam,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        noPinjam: req.body.noPinjam,
        isbn: req.body.isbn
    };

    connection.query('INSERT INTO pinjam SET ?', formData, (err, rows) => {
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

    connection.query(`SELECT * FROM pinjam WHERE id = ${id}`, (err, rows) => {
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
    body('namaPeminjam').notEmpty(),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('noPinjam').notEmpty(),
    body('isbn').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const id = req.params.id;
    const formData = {
        namaPeminjam: req.body.namaPeminjam,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        noPinjam: req.body.noPinjam,
        isbn: req.body.isbn
    };

    connection.query(`UPDATE pinjam SET ? WHERE id = ${id}`, formData, (err, rows) => {
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
     
    connection.query(`DELETE FROM pinjam WHERE id = ${id}`, (err, rows) => {
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