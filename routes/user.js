import express from 'express';
import { body, validationResult } from 'express-validator';
import connection from '../database.js';

const router = express.Router();

/**
 * INDEX user
 */
router.get('/list', (req, res) => {
    connection.query('SELECT * FROM user ORDER BY id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data user',
                data: rows
            });
        }
    });
});

/**
 * STORE POST
 */
router.post('/create', [
    body('username').notEmpty(),
    body('role').notEmpty(),
    body('password').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const formData = {
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    };

    connection.query('INSERT INTO user SET ?', formData, (err, rows) => {
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

    connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, rows) => {
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
    body('username').notEmpty(),
    body('role').notEmpty(),
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
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    };

    connection.query(`UPDATE user SET ? WHERE id = ${id}`, formData, (err, rows) => {
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
     
    connection.query(`DELETE FROM user WHERE id = ${id}`, (err, rows) => {
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