import express from 'express';
import { body, validationResult } from 'express-validator';
import connection from '../database.js';

const router = express.Router();

/**
 * INDEX rentBuku
 */
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM rentBuku ORDER BY id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data rentBuku',
                data: rows
            });
        }
    });
});

/**
 * STORE POST
 */
router.post('/create', [
    body('idBuku').notEmpty(),
    body('namaBuku').notEmpty(),
    body('durasi').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const formData = {
        idBuku: req.body.idBuku,
        namaBuku: req.body.namaBuku,
        password: req.body.password,
        durasi: req.body.durasi
    };

    connection.query('INSERT INTO rentBuku SET ?', formData, (err, rows) => {
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
router.get('/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`SELECT * FROM rentBuku WHERE id = ${id}`, (err, rows) => {
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
    body('idBuku').notEmpty(),
    body('namaBuku').notEmpty(),
    body('password').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const id = req.params.id;
    const formData = {
        idBuku: req.body.idBuku,
        namaBuku: req.body.namaBuku,
        password: req.body.password
    };

    connection.query(`UPDATE rentBuku SET ? WHERE id = ${id}`, formData, (err, rows) => {
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
     
    connection.query(`DELETE FROM rentBuku WHERE id = ${id}`, (err, rows) => {
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