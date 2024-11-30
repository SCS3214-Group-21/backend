const verifyMail = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).render('404');
    }

    try {
        const user = await User.findOne({ where: { token } });
        if (user) {
            await User.update({ token: null, is_verified: 1 }, { where: { id: user.id } });
            return res.render('mail-verification', { message: "Mail Verified Successfully!" });
        } else {
            return res.render('404');
        }
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};
~




































