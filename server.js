const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const data = require("./data");
console.log(data);
const schema = buildSchema(`
    type Ramen {
        menu: String
        picture: String
        shop: String
        address: String
        price: String
        taste: String
        men_type: String
        evaluation: Int
        topping: String
        memo: String
    }

    input RamenInput {
        menu: String
        picture: String
        shop: String
        address: String
        price: String
        taste: String
        men_type: String
        evaluation: Int
        topping: String
        memo: String
    }

    type Mutation {
        ModifyRamen(menu: String!, input: RamenInput): [Ramen]
    }

    type Query {
        RamenAll: [Ramen]
        RamenOne(menu: String): Ramen
    }
`);

const root = {
    RamenAll: () => {
        return data.ramen;
    },
    RamenOne: (request) => {
        return data.ramen.find((ramen) => ramen.menu === request.menu);
    },
    ModifyRamen: (request) => {
        if(typeof request.menu !== "undefined") {
            for(let i = 0; i < data.ramen.length; i++) {
                if(data.ramen[i].menu === request.menu){
                    data.ramen[i] = request.input;
                }
            }
        }
        return data.ramen;
    }
    // AddRamen
    // DeleteRamen
}

const app = express();

app.use(express.static(path.join(__dirname + "/dist")));

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



