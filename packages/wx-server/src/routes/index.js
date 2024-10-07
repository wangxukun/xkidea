import Router from 'koa-router';
import wxk from './wxk';
import signJsapi from './signJsapi';

const router = new Router();

// enable routing
router.get('wxk', wxk);
router.get('/jsapi', signJsapi);

export default router;
