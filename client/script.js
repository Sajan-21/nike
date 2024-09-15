// adding product to database

function viewAddingForm() {

    document.getElementById('name').style.display = "block";
    document.getElementById('image').style.display = "block";
    document.getElementById('gender').style.display = "block";
    document.getElementById('category').style.display = "block";
    document.getElementById('color').style.display = "block";
    document.getElementById('price').style.display = "block";
    document.getElementById('size').style.display = "block";
    document.getElementById('description').style.display = "block";
    document.getElementById('rating').style.display = "block";
    document.getElementById('submit').style.display = "block";
    
}

async function addProduct(event) {

    event.preventDefault();

    let product = {
        name : document.getElementById('name').value,
        image : document.getElementById('image').value,
        gender : document.getElementById('gender').value,
        category : document.getElementById('category').value,
        color : document.getElementById('color').value,
        price : document.getElementById('price').value,
        size : document.getElementById('size').value,
        description : document.getElementById('description').value,
        rating : document.getElementById('rating').value
    }
    console.log("product : ",product);

    let strProduct = JSON.stringify(product);
    console.log("strProduct : ",strProduct);

    try {

        let response = await fetch('/product',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strProduct
        });

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseMessage = parsedResponse.message;
        console.log("responseMessage : ",responseMessage);

        if(parsedResponse.statusCode === 200){
            alert("product added successfully...");
        }else{
            alert("product addition failed...");
        }

        window.location = `admin.html`;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

// get all products

async function getAllProducts () {

    try {

        let response = await fetch('/products');
        console.log("response : ",response);

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseData = parsedResponse.data;
        console.log("responseData : ",responseData);

        let parsedData = JSON.parse(responseData);
        console.log("parsedData : ",parsedData);

        let rows = '';

        for(let i = 0; i < parsedData.length; i++){

            rows = rows + `
                <div class="border rounded box" onclick="toSinglePage('${parsedData[i]._id}')">
                    <div><img class="img-shop" src="${parsedData[i].image}"></div>
                    <div class="p-2 text-start">${parsedData[i].category}</div>
                    <div class="p-2 fs-4 fw-bold text-center">${parsedData[i].name}</div>
                    <div class="p-2 fs-5 text-danger text-center">${parsedData[i].price} $</div>
                </div>
            `;
        }

        document.getElementById('allProductsContainer').innerHTML = rows;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

// go to single viewPage

async function toSinglePage(id) {

    window.location = `singlePage.html?id=${id}`;

}

// get single Product

async function getSingleProduct() {

    let location = window.location;
    console.log("location : ",location);

    let queryString = location.search;
    console.log("queryString : ",queryString);

    let url_params = new URLSearchParams(queryString);
    console.log("url_params : ",url_params);

    let id = url_params.get('id');
    console.log("id : ",id);

    try {

        let strResponse = await fetch(`/product/${id}`);
        console.log("strResponse : ",strResponse);

        let parsedResponse = await strResponse.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseData = parsedResponse.data;
        console.log("responseData : ",responseData);

        let product = JSON.parse(responseData);
        console.log("product : ",product);

        let row = `
                <div class="row p-5">
                    <div class="col-6">
                    <img class="img-singlePage" src="${product.image}">
                    <div class="p-2 fs-5 text-start">colours : ${product.color} </div>
                    </div>
                    <div class="col-6 d-flex flex-column gap-3 justify-content-center border-start">
                    <div class="p-2 fs-4">${product.category}</div>
                    <div class="p-2 fs-1 fw-bold">${product.name}</div>
                    <div class="p-2 fs-4 text-danger">${product.price} $</div>
                    <div class="p-2 fs-4">${product.description}</div>
                    <div class="p-2 fs-4">rating : ${product.rating} out of 5</div>
                    <div class="d-flex justify-content-between gap-3">
                        <button class="btn btn-success px-3 py-2">buy Now</button>
                        <button class="btn btn-warning px-3 py-2">add to Cart</button>
                    </div>
                    </div>
                </div>
            `;
        document.getElementById('singleProductContainer').innerHTML = row;

    } catch (error) {

        console.log("error : ",error);

    }
}

// adminPage

async function customize() {

    document.getElementById('name').style.display = "none";
    document.getElementById('image').style.display = "none";
    document.getElementById('gender').style.display = "none";
    document.getElementById('category').style.display = "none";
    document.getElementById('color').style.display = "none";
    document.getElementById('price').style.display = "none";
    document.getElementById('size').style.display = "none";
    document.getElementById('description').style.display = "none";
    document.getElementById('rating').style.display = "none";
    document.getElementById('submit').style.display = "none";

    try {

        let response = await fetch('/products');
        console.log("response : ",response);

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseData = parsedResponse.data;
        console.log("responseData : ",responseData);

        let parsedData = JSON.parse(responseData);
        console.log("parsedData : ",parsedData);

        let rows = '';

        for(let i = 0; i < parsedData.length; i++){

            rows = rows + `
                <div class="border border-warning rounded p-3 d-flex flex-column gap-2">
                    <div class="d-flex gap-3 justify-content-end">
                        <button class="px-3 rounded-pill border border-primary" onclick="editPage('${parsedData[i]._id}')">edit</button>
                        <button class="px-3 rounded-pill border border-danger" onclick="deleteProduct('${parsedData[i]._id}')">delete</button>
                    </div>
                    <div>name : ${parsedData[i].name}</div>
                    <div>image url : ${parsedData[i].image}</div>
                    <div>gender : ${parsedData[i].gender}</div>
                    <div>category : ${parsedData[i].category}</div>
                    <div>color : ${parsedData[i].color}</div>
                    <div>price : ${parsedData[i].price} $</div>
                    <div>size : ${parsedData[i].size}</div>
                    <div>description : ${parsedData[i].description}</div>
                    <div>rating : ${parsedData[i].rating}</div>
                </div>
            `;
        }

        document.getElementById('db').innerHTML = rows;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

// go to edit page

function editPage(id) {

    window.location = `editProduct.html?id=${id}`;

}

// giving value to the input boxes

async function dotValue() {

    let location = window.location;
    console.log("location : ",location);

    let queryString = location.search;
    console.log("queryString : ",queryString);

    let url_params = new URLSearchParams(queryString);
    console.log("url_params : ",url_params);

    let id = url_params.get('id');
    console.log("id : ",id);

    try {

        let strResponse = await fetch(`/product/${id}`);
        console.log("strResponse : ",strResponse);

        let parsedResponse = await strResponse.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseData = parsedResponse.data;
        console.log("responseData : ",responseData);

        let product = JSON.parse(responseData);
        console.log("product : ",product);

        let name = document.getElementById('name');
        name.value = product.name;
        let image = document.getElementById('image');
        image.value = product.image;
        let gender = document.getElementById('gender');
        gender.value = product.gender;
        let category = document.getElementById('category');
        category.value = product.category;
        let color = document.getElementById('color');
        color.value = product.color;
        let price = document.getElementById('price');
        price.value = product.price;
        let size = document.getElementById('size');
        size.value = product.size;
        let description = document.getElementById('description');
        description.value = product.description;
        let rating = document.getElementById('rating');
        rating.value = product.rating;

        

    } catch (error) {

        console.log("error : ",error);

    }
    
}

//update product

async function editProduct(event) {

    event.preventDefault();

    let location = window.location;
    console.log("location : ",location);

    let queryString = location.search;
    console.log("queryString : ",queryString);

    let url_params = new URLSearchParams(queryString);
    console.log("url_params : ",url_params);

    let id = url_params.get('id');
    console.log("id : ",id);

    let product = {
        name : document.getElementById('name').value,
        image : document.getElementById('image').value,
        gender : document.getElementById('gender').value,
        category : document.getElementById('category').value,
        color : document.getElementById('color').value,
        price : document.getElementById('price').value,
        size : document.getElementById('size').value,
        description : document.getElementById('description').value,
        rating : document.getElementById('rating').value
    }
    console.log("product : ",product);

    let strProduct = JSON.stringify(product);
    console.log("strProduct : ",strProduct);

    try {

        let response = await fetch(`/product/${id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strProduct
        });

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let responseMessage = parsedResponse.message;
        console.log("responseMessage : ",responseMessage);

        if(parsedResponse.statusCode === 200){
            alert("product updated successfully...");
        }else{
            alert("product updation failed...");
        }

        window.location = `admin.html`;
        
    } catch (error) {

        console.log("error : ",error);
        
    }
    
}

// delete product

async function deleteProduct(id) {

    console.log("button clicked...");

    try {

        let response = await fetch(`/product/${id}`,{
            method : 'DELETE',
        });
    
        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);
    
        let responseMessage = parsedResponse.message;
        console.log("responseMessage : ",responseMessage);
    
        if(parsedResponse.statusCode === 200){
            alert("product deleted succesfully");
        }else{
            alert("product deletion failed");
        }
    
        window.location = `admin.html`;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}