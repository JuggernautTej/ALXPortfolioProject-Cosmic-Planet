import { Router } from 'express';
import Post from '../tables/Post.js';


const router = Router();

// Routes
// GET method for home route
router.get('', async (req, res) => {
    const siteDesc = {
        title: "Cosmic Planet",
        description: " A blog site where creativity meets the universe. "
    }
    try {
        const data = await Post.find();
        res.render('index', { siteDesc, data });    
    } catch (error) {
        console.log(error)
    }

});




router.get('/about', (req, res) => {
    const siteDesc = {
        title: "Cosmic Planet",
        description: " A blog site where creativity meets the universe. "
    }
    res.render('about', { siteDesc });
});


export default router;