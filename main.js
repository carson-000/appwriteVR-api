import login from './login.js';

export default async (context) => {
    const { req, res } = context;
    const path = new URL(req.url).pathname;

    if (path === '/login') return login(context);

    return res.json({ error: 'Not found' }, 404);
};