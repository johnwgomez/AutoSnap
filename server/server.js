require('dotenv').config();

const express = require('express');
const jwt = require ('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false, limit : '10mb' }));
app.use(express.json({ limit: '10mb'}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware (optional***** when ready)
    context: ({ req }) => {
    // Grab the raw "Authorization" header (e.g. "Bearer abc.def.ghi")
     const authHeader = req.headers.authorization || '';
     const token = authHeader.startsWith('Bearer ')
       ? authHeader.split(' ')[1]
       : authHeader;

     if (!token) {
       return {}; // no token sent, no user in context
     }

     try {
       // Verify & decode; if invalid, this will throw
       const user = jwt.verify(token, process.env.JWT_SECRET);
       return { user }; // make `context.user` available inside resolvers
    } catch {
       return {}; // invalid token → context without `user`
     }
  }
  });

  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startServer();