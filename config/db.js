import mongoose from 'mongoose';
const connectDb=async()=>{
try{
const connectdatabase=await mongoose.connect(process.env.MONGO_URL);
console.log('Database connected')
}catch(err){
console.log(err.message);
    process.exit(1);

}
}
export default connectDb;