import jwt from "jsonwebtoken";

export const generateToken = async (userId: any) => {
    const token = await jwt.sign({ userId }, "GARVIT", {
        expiresIn: "7d",
    });
    return token;
};