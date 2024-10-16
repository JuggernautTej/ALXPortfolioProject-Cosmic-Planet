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
const jwtSecret = process.env.JWT_SECRET;

// A middleware function to guard login.
// Add this function to every page that needs login
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json( { message: 'Unauthorized' } );// you can render a page here
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json( { message: 'Unauthorized' } );
    }
}


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

// Routes
// POST method for Admin - check login
router.post('/admin', async (req, res) => {
    try {
        // Logic is to get the username and password from the form
        const  { username, password } = req.body;
        const user = await Users.findOne({ username });

        if(!user) {
            return res.status(401).json( { message: 'Invalid credentials'} );
        }

        const isPwdValid = await bcrypt.compare(password,user.password);
        if(!isPwdValid) {
            return res.status(401).json( { message: 'Invalid credentials'} );
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
        // res.redirect('/admin'); // for testing
    } catch (error) {
        console.log(error)
    }
});

// Routes
// POST method for Admin - register
router.post('/register', async (req, res) => {
    try {
        // Logic is to get the username and password from the form
        const  { username, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10)
        try {
            const user = await Users.create({ username, password:hashedPwd });
            res.status(201).json({ message: 'User Created', user}); // i can substitute this with a page that will display a user page
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }
            res.status(500).json({ message: 'Internal server error'})
        }

    } catch (error) {
        console.log(error)
    }
});

// Routes
// GET method for Admin pages and dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const siteDesc = {
            title: 'Dashboard',
            description: 'Something'
        }
        const data = await Post.find();
        res.render('admin/dashboard', {
            siteDesc,
            data,
            layout: layoutAdmin
        });
    } catch (error) {
        console.log(error);
    }

    });

// Routes
// GET method for Admin to create new post
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const siteDesc = {
            title: 'Add Post',
            description: 'Simple add post'
        }
        const data = await Post.find();
        res.render('admin/add-post', {
            siteDesc,
            data,
            layout: layoutAdmin
        });
    } catch (error) {
        console.log(error)
    }
    });

// Routes
// POST method for Admin to create new post
// edit to add-blog
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }
    
    } catch (error) {
        console.log(error)
    }
    });

// Routes
// GET method for Admin to create new post
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const siteDesc = {
            title: 'Edit Post',
            description: 'Curator Post Management Page'
        }

        const data = await Post.findOne({ _id: req.params.id });
         res.render('admin/edit-post', {
            siteDesc,
            data,
            layout: layoutAdmin
         })
    } catch (error) {
        console.log(error)
    }
    });

// Routes
// PUT method for Admin to create new post
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
         });
         res.redirect(`/edit-post/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }
    });

// Routes
// DELETE method for Admin to delete a post
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});
export default router;