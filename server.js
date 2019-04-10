const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const data = require("./data/ramen.json");

const schema = buildSchema(`
    type Ramen {
        menu: String
        picture: String
        shop: String
        address: String
        price: String
        taste: String
        men-type: String
        evaluation: Int
        topping: String
        memo: String
    }

    type Query {
        RamenAll: [Ramen]
    }
`);
console.log("========> HOGE");
const root = {
    RamenAll: () => {
        return data.ramen;
    }
}

const app = express();

app.use(express.static(path.join(__dirname + "/dist")));
console.log("HOGE");
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    })
);

app.use("/api", (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log("App listening on " + port + "!");
});



