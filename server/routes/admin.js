import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import Post from '../tables/Post.js';
import Users from '../tables/Users.js';

dotenv.config();

const router = Router();
const layoutAdmin = '../views/layouts/admin';

// Routes
// GET method for Admin - login page
router.get('/admin', async (req, res) => {
    try {
        const siteDesc = {
            title: "The Curator",
            description: "A blog site where creativity meets the universe."
        }
        res.render('admin/login', { siteDesc, layout: layoutAdmin });
    } catch (error) {
        console.log(error)
    }
});

export default router;