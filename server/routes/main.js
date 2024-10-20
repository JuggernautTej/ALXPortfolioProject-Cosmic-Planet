import { Router } from 'express';
import axios from 'axios';
import Post from '../tables/Post.js';


const router = Router();

// NASA API Fetch Function
async function getNASAImages() {
    const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=10`;
    try {
        const response = await axios.get(nasaApiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching NASA images:', error);
        return [];
    }
}

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

        // EDIT THE SORTING-SORT BY UPDATEDAT!!
        const data = await Post.aggregate([ { $sort: { createdAt: -1 } }]) // this makes the oldest post be at the top
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        const nasaImages= await getNASAImages();

        const fallbackImgs = [
            '/imgs/fallback1 (1).jpg',
            '/imgs/fallback1 (2).jpg',
            '/imgs/fallback1 (3).jpg',
            '/imgs/fallback1 (4).jpg',
            '/imgs/fallback1 (5).jpg',
            '/imgs/fallback1 (6).jpg'
        ]

        res.render('index', { 
            siteDesc,
            data,
            current: page,
            nextPage:  hasNextPage ? nextPage : null,
            currentRoute:'/',
            nasaImages,
            images: fallbackImgs
        });    
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
        res.render('post', { siteDesc, data, currentRoute:`/post/${slug}` });
    } catch (error) {
        console.log(error)
    }
});

// Routes
// POST method for the search bar
router.post('/search', async (req, res) => {
    try {
        const siteDesc = {
            title: "Search",
            description: "A blog site where creativity meets the universe."
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
        // console.log(searchTerm)
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
            ]
        });
        res.render("search", {
            data,
            siteDesc
        });
    } catch (error) {
        console.log(error)
    }
});


router.get('/about', (req, res) => {
    const siteDesc = {
        title: "Cosmic Planet",
        description: " A blog site where creativity meets the universe. "
    }
    res.render('about', { siteDesc, currentRoute:'/about' });
});


export default router;

// need to add current route to every route