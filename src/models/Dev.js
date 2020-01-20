import Mongoose from 'mongoose';
import PointSchema from './utils/PointSchema';

const DevSchema = new Mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        indexes: '2dsphere'
    }
});

export default Mongoose.model("Dev", DevSchema);