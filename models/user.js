const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
	{
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        twitter: {
            userId: String,
            token: String,
            tokenSecret: String
        }
	},
	{ minimize: false }
);

UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);
module.exports = User;