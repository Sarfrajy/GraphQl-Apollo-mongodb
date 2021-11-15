const {ApolloServer}= require('apollo-server');
const gql=require('graphql-tag');
const mongoose=require('mongoose');

const Post= require('./model/Post')
const user= require('./model/User')

const {MONGODB}=require('./config')

const typeDefs=gql`
type Post{
    id:ID!
    body:String!
    createAt:String!
    username:String!
}

type Query{
    getpost: [Post]
}
`
const resolvers={
    Query:{
      async getpost(){
          try{
              const posts=await Post.find();
              return posts;
          }catch(err){
              throw new Error(err);
          }

        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
mongoose.connect(MONGODB,{useNewUrlParser:true})
.then(()=>{
    console.log('connected')
    return server.listen(5000);
})
.then((res)=>{
    console.log(`Your Api is Running at ${res.url}`);
});