const jwt = require('jsonwebtoken');

export async function isAuth(req, res, next) {        
    const token = req.cookies['token'] || '';
    try {
        if (req.url.startsWith('/auth') || req.url.startsWith('/app.bundle.js')) {
            return next();
        } else if (!token) {
            return res.redirect('/auth/signin')
        } else {
            const decrypt = await jwt.verify(token, 'my-secret-key');
            req.user = decrypt.email;
            console.log('decrypt', decrypt)
            return next();
        }

    } catch (err) {
        return res.status(500).json(err.toString());
    }
}