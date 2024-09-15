const nike_products = require('../db/model/nikeProducts');
const {error_function, success_function} = require('../utils/responseHandler');

// when req come, get data from it and add to database

exports.addProduct = async function (req, res) {

    try {

    let body = req.body;
    console.log("body : ",body);

    let products = {
        name : body.name,
        image : body.image,
        gender : body.gender,
        category : body.category,
        color : body.color,
        price : body.price,
        size : body.size,
        description : body.description,
        rating : body.rating
    }

    let addedProduct = await nike_products.create(products);

    let response = success_function ({
        success : true,
        statusCode : 200,
        message : 'product added successfully'
    });

    res.status(response.statusCode).send(response);
    return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function ({
            success : true,
            statusCode : 400,
            message : 'product adition failed'
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

// when req come, get data from database according to the id come with req and give to front end

exports.getAllProducts = async function (req, res) {

    try {

        let products = await nike_products.find();
        console.log("products : ",products);

        let strProducts = JSON.stringify(products);
        console.log("strProducts : ",strProducts);

        let response = success_function({
            success : true,
            statusCode : 201,
            message : "done",
            data : strProducts
        })

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : "error",error
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}


exports.getProduct = async function (req, res) {

    try {

        let id = req.params.id;
        console.log("id : ",id);

        let product = await nike_products.findOne({_id : id});
        console.log("product : ",product);

        let strProduct = JSON.stringify(product);
        console.log("strProduct : ",strProduct);

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "fetch done from server",
            data : strProduct
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : "fetching failed from server"
        })
        
    }

}

exports.editProduct = async function (req, res) {

    let id = req.params.id;
    console.log("id : ",id);

    let body = req.body;
    console.log("body : ",body);

    try {

        let products = {
            name : body.name,
            image : body.image,
            gender : body.gender,
            category : body.category,
            color : body.color,
            price : body.price,
            size : body.size,
            description : body.description,
            rating : body.rating
        };

        let updatedData = await nike_products.updateOne({_id : id}, {$set : products});

        let response = success_function ({
            success : true,
            statusCode : 200,
            message : "updated successfully",
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);
        
        let response = error_function ({
            success : false,
            statusCode : 400,
            message : "updation failed"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

exports.deleteProduct = async function (req, res) {

    let id = req.params.id;
    console.log("id : ",id);

    try {

        await nike_products.deleteOne({_id : id});

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product delete succesfully"
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function ({
            success : false,
            statusCode : 400,
            message : "product deletion failed"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}