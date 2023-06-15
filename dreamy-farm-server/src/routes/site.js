import express from 'express';
import SiteController from '~/controllers/SiteController';

const router = express.Router();

const siteController = new SiteController();

router.get('/', siteController.index);

router.get('/search', siteController.search);

export default router;
