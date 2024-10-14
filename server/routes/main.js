import { Router } from 'express';
import Post from '../tables/Post.js';


const router = Router();

// Routes
// GET method for home route
router.get('', async (req, res) => {
    try {
        const siteDesc = {
            title: "Cosmic Planet",
            description: " A blog site where creativity meets the universe."
        }
        let perPage = 6; // change back to 10
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } }]) // this makes the oldest post be at the top
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            siteDesc,
            data,
            current: page,
            nextPage:  hasNextPage ? nextPage : null});    
    } catch (error) {
        console.log(error)
    }

});

// Routes
// GET method for blog by id
router.get('/post/:id', async (req, res) => {

    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug});
        const siteDesc = {
            title: data.title,
            description: "A blog site where creativity meets the universe."
        }
        res.render('post', { siteDesc, data });
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