"use server";
import User from "@/models/users.models";
import { connectDB } from "@/utils/db";

async function checkUsernameAvailability(username: string) {
    await connectDB();
    if (!username) {
        return false;
    }
    // if username length is less than 3 or more than 20, return false
    if (username.length < 3 || username.length > 20) {
        return false;
    }
    // check if username contains special characters except for underscore, hyphen, and dot
    const regex = /^[a-zA-Z0-9_.-]+$/;
    if (!regex.test(username)) {
        return false;
    }
    // check if username contains whitespace characters in start, end, or in between
    const regex2 = /^\S+$/;
    if (!regex2.test(username)) {
        return false;
    }
    const user = await User.findOne({ username: username });
    return user ? false : true;
}

async function findEmailFromUserName(username: string) {
    await connectDB();
    if (!username) {
        return '';
    }
    const user = await User.findOne({ username: username });
    return user ? user.email : '';
}

export { checkUsernameAvailability, findEmailFromUserName };
export default checkUsernameAvailability;