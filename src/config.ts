export const config = () =>{
    return{
        port: parseInt(process.env.PORT,10) || 5454,
        jwtSecret: process.env.JWT_SECRET,
        mongoUri: process.env.MONGO_PORT
    }
}