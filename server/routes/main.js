import { Router } from 'express';

const router = Router();


router.get('', (req, res) => {
    const siteDesc = {
        title: "Cosmic Planet",
        description: " A blog site where creativity meets the universe. "
    }
    res.render('index', { siteDesc });
});

router.get('/about', (req, res) => {
    const siteDesc = {
        title: "Cosmic Planet",
        description: " A blog site where creativity meets the universe. "
    }
    res.render('about', { siteDesc });
});


export default router;