# mini-ramen-database

* Now under construction.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### How to create table (examples for using PostgreSQL)
```
create database ramen;

create sequence ramen_id_seq;

create table ramen (id int primary key default nextval('ramen_id_seq'), name varchar(255), picture varchar(255), shop_name varchar(255), shop_address varchar(255), price int, taste varchar(255), men_type varchar(255), evaluation int, topping varchar(255), memo varchar(255));

```

### How to test using mock data(JSON)
* Open GraphiQL
```
query {
    RamenAll {
        menu,
        picture,
        shop,
        address,
        price,
        taste,
        men_type,
        evaluation,
        topping,
        memo
    }
}
```