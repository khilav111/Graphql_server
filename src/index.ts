import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.get("/", (req, res) => {
    res.json({ message: "server is running fine " });
  });
  app.use(express.json());
  app.listen(PORT, () => console.log(`server start at the port ${PORT}`));
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello:String ,
         
        }
        `,

    resolvers: {
      Query: {
        hello: () => `hey there, I am a graphql server`,
       
      },
    },
  });
  await gqlServer.start();
  app.use("/graphql", expressMiddleware(gqlServer));
}
init();
