const User = require("../models/UserModel");

module.exports.addToLikedAnimes = async(req,res) => {
    try{
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedAnimes } = user;
            const animesAlreadyLiked = likedAnimes.find(({ id }) => id === data.id);
            if(!animesAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id, {
                        likedAnimes: [...user.likedAnimes, data],
                    },
                    {new: true}
                );
            }else return res.json({msg:"Anime already added to the list"});
        }else await User.create({email,likedAnimes:[data]});
        return res.json({msg:"Movie added successfully"});
    }catch(err) {
        return res.json({msg:"Error adding anime"});
    }
};

module.exports.getLikedAnimes = async(req,res) => {
    try{
        const { email } = req.params;
        const user = await User.findOne({ email });
    if(user) {
        return res.json({msg:"success", animes: user.likedAnimes});
    }else return res.json({msg: "User with given email not found."});
    }catch(err) {
        return res.json({msg: "Error fetching anime"});
    }
}

module.exports.removeFromLikedAnimes = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const { likedAnimes } = user;
            console.log(likedAnimes);
            const updatedLikedAnimes = likedAnimes.filter(({ id }) => id !== data.id);

            if (likedAnimes.length !== updatedLikedAnimes.length) {
                await User.findByIdAndUpdate(
                    user._id,
                    { likedAnimes: updatedLikedAnimes },
                    { new: true }
                );
                return res.json({ msg: "Anime removed successfully" });
            } else {
                return res.json({ msg: "Anime not found in the liked list" });
            }
        } else {
            return res.json({ msg: "User not found" });
        }
    } catch (err) {
        return res.json({ msg: "Error removing anime" });
    }
};