import axios from 'axios';
import Dev from '../models/Dev';

export default {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {
            return res.status(400).json({ error: 'Usuário já cadastrado!' });;
        }

        const response = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name, avatar_url, bio } = response.data;
        const techsArray = techs.split(",").map(tech => tech.trim());

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        dev = await Dev.create({
            github_username,
            name: name ? name : github_username,
            avatar_url,
            bio,
            techs: techsArray, 
            location
        });

        return res.json(dev);
    }
}