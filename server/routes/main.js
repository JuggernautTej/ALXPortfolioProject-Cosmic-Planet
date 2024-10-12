import { Router } from 'express';

const router = Router();


router.get('', (req, res) => {
    res.send("Testing app 1234");
});

export default router;