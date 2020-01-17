/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const projectRouters = require("./data/routers/project-routers");
const actionRouters = require("./data/routers/action-routers");

const port = process.env.PORT || 4000;

const app = express();

function errorHandlingMiddleware(err, req, res, next) {
  res.status(500).json(err.message);
}

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(projectRouters);
app.use(actionRouters);

app.get("*", (req, res) => {
  res.status(404).json("Page not found");
});

app.use((req, res) => {
  res.json("This API is working and active");
});

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
