import { loadPOTUSPrices, loadPOTUSPredicitons,loadVPPrices, loadVPPredicitons,  loadWHPrices, loadWHPredicitons } from "./Requests";
import { functionTypeAnnotation } from "@babel/types";

const norm = [];
const kde = [];
export const gridDData = [
    {
        "ProductID": 1,
        "ProductName": "Chai",
        "SupplierID": 1,
        "CategoryID": 1,
        "QuantityPerUnit": "10 boxes x 20 bags",
        "UnitPrice": 18,
        "UnitsInStock": 39,
        "UnitsOnOrder": 0,
        "ReorderLevel": 10,
        "Discontinued": false,
        "Category": {
            "CategoryID": 1,
            "CategoryName": "Beverages",
            "Description": "Soft drinks, coffees, teas, beers, and ales"
        },
        "FirstOrderedOn": new Date(1996, 8, 20)
    },
    {
        "ProductID": 2,
        "ProductName": "Chang",
        "SupplierID": 1,
        "CategoryID": 1,
        "QuantityPerUnit": "24 - 12 oz bottles",
        "UnitPrice": 19,
        "UnitsInStock": 17,
        "UnitsOnOrder": 40,
        "ReorderLevel": 25,
        "Discontinued": false,
        "Category": {
            "CategoryID": 1,
            "CategoryName": "Beverages",
            "Description": "Soft drinks, coffees, teas, beers, and ales"
        },
        "FirstOrderedOn": new Date(1996, 7, 12)
    },
    {
        "ProductID": 3,
        "ProductName": "Aniseed Syrup",
        "SupplierID": 1,
        "CategoryID": 2,
        "QuantityPerUnit": "12 - 550 ml bottles",
        "UnitPrice": 10,
        "UnitsInStock": 13,
        "UnitsOnOrder": 70,
        "ReorderLevel": 25,
        "Discontinued": false,
        "Category": {
            "CategoryID": 2,
            "CategoryName": "Condiments",
            "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
        },
        "FirstOrderedOn": new Date(1996, 8, 26)
    },
    {
        "ProductID": 4,
        "ProductName": "Chef Anton's Cajun Seasoning",
        "SupplierID": 2,
        "CategoryID": 2,
        "QuantityPerUnit": "48 - 6 oz jars",
        "UnitPrice": 22,
        "UnitsInStock": 53,
        "UnitsOnOrder": 0,
        "ReorderLevel": 0,
        "Discontinued": false,
        "Category": {
            "CategoryID": 2,
            "CategoryName": "Condiments",
            "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
        },
        "FirstOrderedOn": new Date(1996, 9, 19)
    },
    {
        "ProductID": 5,
        "ProductName": "Chef Anton's Gumbo Mix",
        "SupplierID": 2,
        "CategoryID": 2,
        "QuantityPerUnit": "36 boxes",
        "UnitPrice": 21.35,
        "UnitsInStock": 0,
        "UnitsOnOrder": 0,
        "ReorderLevel": 0,
        "Discontinued": true,
        "Category": {
            "CategoryID": 2,
            "CategoryName": "Condiments",
            "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
        },
        "FirstOrderedOn": new Date(1996, 7, 17)
    },
    {
        "ProductID": 6,
        "ProductName": "Grandma's Boysenberry Spread",
        "SupplierID": 3,
        "CategoryID": 2,
        "QuantityPerUnit": "12 - 8 oz jars",
        "UnitPrice": 25,
        "UnitsInStock": 120,
        "UnitsOnOrder": 0,
        "ReorderLevel": 25,
        "Discontinued": false,
        "Category": {
            "CategoryID": 2,
            "CategoryName": "Condiments",
            "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
        },
        "FirstOrderedOn": new Date(1996, 9, 19)
    },
    {
        "ProductID": 7,
        "ProductName": "Uncle Bob's Organic Dried Pears",
        "SupplierID": 3,
        "CategoryID": 7,
        "QuantityPerUnit": "12 - 1 lb pkgs.",
        "UnitPrice": 30,
        "UnitsInStock": 15,
        "UnitsOnOrder": 0,
        "ReorderLevel": 10,
        "Discontinued": false,
        "Category": {
            "CategoryID": 7,
            "CategoryName": "Produce",
            "Description": "Dried fruit and bean curd"
        },
        "FirstOrderedOn": new Date(1996, 7, 22)
    },
    {
        "ProductID": 8,
        "ProductName": "Northwoods Cranberry Sauce",
        "SupplierID": 3,
        "CategoryID": 2,
        "QuantityPerUnit": "12 - 12 oz jars",
        "UnitPrice": 40,
        "UnitsInStock": 6,
        "UnitsOnOrder": 0,
        "ReorderLevel": 0,
        "Discontinued": false,
        "Category": {
            "CategoryID": 2,
            "CategoryName": "Condiments",
            "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
        },
        "FirstOrderedOn": new Date(1996, 11, 1)
    },
    {
        "ProductID": 9,
        "ProductName": "Mishi Kobe Niku",
        "SupplierID": 4,
        "CategoryID": 6,
        "QuantityPerUnit": "18 - 500 g pkgs.",
        "UnitPrice": 97,
        "UnitsInStock": 29,
        "UnitsOnOrder": 0,
        "ReorderLevel": 0,
        "Discontinued": true,
        "Category": {
            "CategoryID": 6,
            "CategoryName": "Meat/Poultry",
            "Description": "Prepared meats"
        },
        "FirstOrderedOn": new Date(1997, 1, 21)
    },
    {
        "ProductID": 10,
        "ProductName": "Ikura",
        "SupplierID": 4,
        "CategoryID": 8,
        "QuantityPerUnit": "12 - 200 ml jars",
        "UnitPrice": 31,
        "UnitsInStock": 31,
        "UnitsOnOrder": 0,
        "ReorderLevel": 0,
        "Discontinued": false,
        "Category": {
            "CategoryID": 8,
            "CategoryName": "Seafood",
            "Description": "Seaweed and fish"
        },
        "FirstOrderedOn": new Date(1996, 8, 5)
    }
  ];



export async function loadWHData(market){
    console.log("loading wh data")
    const names = ["B1y","B1n","B2y","B2n","B3y","B3n","B4y","B4n","B5y","B5n","B6y","B6n","B7y","B7n","B8y","B8n","B9y","B9n"];
    
    var gridData = [];
    var arrLen = names.length;

    const prices = await loadWHPrices(market);
    const predictions = await loadWHPredicitons(market);
    const mp = prices.marketPrices;
    const pp = predictions.marketPrices;
    console.log(mp)
    for (var i = 0; i < arrLen; i++){
        var buy = "No";
        if((pp[names[i]] - mp[names[i]]) > 0)
        {
            var v =(pp[names[i]] - mp[names[i]])*100;
            buy = "";
            while(v > 0){
                buy = buy + ">"
                v = v - 1
            }
        }
        
        gridData.push({
           "name": names[i],
            "price": Math.round(mp[names[i]] * 100) / 100,
            "prediction":Math.round(pp[names[i]] * 100) / 100,
            "buy":buy,
            "spread":Math.round((pp[names[i]] - mp[names[i]])* 100) / 100,
        });
    }
    
    console.log( predictions.percentage)
    
    return [gridData, predictions.norm , predictions.kde, predictions.mean, predictions.std, predictions.count, predictions.percentage];
}


export async function loadVPData(market){
    console.log("loading vp data")
    const names = ["B1y","B1n","B2y","B2n","B3y","B3n","B4y","B4n","B5y","B5n","B6y","B6n","B7y","B7n","B8y","B8n","B9y","B9n"];
    
    var gridData = [];
    var arrLen = names.length;
    

    const prices = await loadVPPrices(market);
    const predictions = await loadVPPredicitons(market);
    const mp = prices.marketPrices;
    const pp = predictions.marketPrices;
    console.log(predictions)
    for (var i = 0; i < arrLen; i++){
        var buy = "No";
        if((pp[names[i]] - mp[names[i]]) > 0)
        {
            var v =(pp[names[i]] - mp[names[i]])*100;
            buy = "";
            while(v > 0){
                buy = buy + ">"
                v = v - 1
            }
        }
        gridData.push({
           "name": names[i],
            "price": Math.round(mp[names[i]] * 100) / 100,
            "prediction":Math.round(pp[names[i]] * 100) / 100,
            "buy":buy,
            "spread":Math.round((pp[names[i]] - mp[names[i]])* 100) / 100,
        });
    }
    
    console.log(gridData)
    
    return [gridData, predictions.norm , predictions.kde, predictions.mean, predictions.std, predictions.count, predictions.percentage];
}

export async function loadPOTUSData(market){
    console.log("loading potus data")
    const names = ["B1y","B1n","B2y","B2n","B3y","B3n","B4y","B4n","B5y","B5n","B6y","B6n","B7y","B7n","B8y","B8n","B9y","B9n"];
    
    var gridData = [];
    var arrLen = names.length;
    

    const prices = await loadPOTUSPrices(market);
    const predictions = await loadPOTUSPredicitons(market);
    const mp = prices.marketPrices;
    const pp = predictions.marketPrices;
    console.log(predictions)
    for (var i = 0; i < arrLen; i++){
        var buy = "No";
        if((pp[names[i]] - mp[names[i]]) > 0)
        {
            var v =(pp[names[i]] - mp[names[i]])*100;
            buy = "";
            while(v > 0){
                buy = buy + ">"
                v = v - 1
            }
        }
        gridData.push({
           "name": names[i],
            "price": Math.round(mp[names[i]] * 100) / 100,
            "prediction":Math.round(pp[names[i]] * 100) / 100,
            "buy":buy,
            "spread":Math.round((pp[names[i]] - mp[names[i]])* 100) / 100,
        });
    }
    
    console.log(gridData)
    
    return [gridData, predictions.norm , predictions.kde, predictions.mean, predictions.std, predictions.count, predictions.percentage];
}
