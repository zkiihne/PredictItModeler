//const endpointurl = 'http://localhost:5000/graphql';
const endpointurl = 'http://flashback-dev3.us-east-1.elasticbeanstalk.com/graphql';


const vpstart = 49;
var vpnorm = [];
const potusstart = 64;
var potusnorm = [];
const vpkde = [];
const whstart = 149;
var whnorm = [];

async function graphqlRequest(query){
    
    let postBody = JSON.stringify({query});
    console.log(postBody)

    const response = await fetch(endpointurl, {method: 'POST', headers: {'content-type':'application/json'},body: postBody});

    const responseBody = await response.json();
    console.log(responseBody.data);
    const r = responseBody.data;
    if(responseBody.errors){
        console.log("error")
        const message = responseBody.errors.map((error) => error.message).join("\n");
        throw new Error("Graphql call failed:" + message)
    }
    return r;




}


export async function loadVPPrices(market){
    var market1 = "VP"
    const query = `query {market(marketNum:"`+ market1 + `",five:true,start:`+ vpstart + `){B1y,B2y,B3y,B4y,B5y,B6y,B7y,B8y,B9y,B1n,B2n,B3n,B4n,B5n,B6n,B7n,B8n,B9n}}`
    const mp = await graphqlRequest(query);
    const marketPrices = mp.market[0];
    console.log(marketPrices)
    return {marketPrices};
}

export async function loadVPPredicitons(market){
    const query = `query {vp(endOfW:512,marketNum:`+ market + `,startAmount:`+ vpstart + `){B1y,B2y,B3y,B4y,B5y,B6y,B7y,B8y,B9y,B1n,B2n,B3n,B4n,B5n,B6n,B7n,B8n,B9n,norm,kde,mean,std,count,percentage}}`
    const mp = await graphqlRequest(query);
    const marketPrices = mp.vp[0];
    console.log(query);
    var norm = marketPrices["norm"];
    var kde = marketPrices["kde"];
    var count = marketPrices["count"];
    var mean = marketPrices["mean"];
    var std = marketPrices["std"];
    var percentage = marketPrices["percentage"];
    console.log(percentage);
    return {marketPrices,norm, kde, mean, std, count, percentage};
}

export async function loadPOTUSPrices(market){
    var market1 = "potus"
    const query = `query {market(marketNum:"`+ market1 + `",five:true,start:`+ potusstart + `){B1y,B2y,B3y,B4y,B5y,B6y,B7y,B8y,B9y,B1n,B2n,B3n,B4n,B5n,B6n,B7n,B8n,B9n}}`
    const mp = await graphqlRequest(query);
    const marketPrices = mp.market[0];
    console.log(marketPrices)
    return {marketPrices};
}

export async function loadPOTUSPredicitons(market){
    const query = `query {potus(endOfW:512,marketNum:`+ market + `,startAmount:`+ potusstart + `){B1y,B2y,B3y,B4y,B5y,B6y,B7y,B8y,B9y,B1n,B2n,B3n,B4n,B5n,B6n,B7n,B8n,B9n,norm,kde,mean,std,count,percentage}}`
    const mp = await graphqlRequest(query);
    const marketPrices = mp.potus[0];
    console.log(query);
    var norm = marketPrices["norm"];
    var count = marketPrices["count"];
    var mean = marketPrices["mean"];
    var std = marketPrices["std"];
    var kde = marketPrices["kde"];
    var percentage = marketPrices["percentage"];
    console.log(percentage);
    return {marketPrices,norm, kde, mean, std, count, percentage};
}


export async function loadWHPrices(market){
    var market1 = "whitehouse"
    
    const query = `query {market(marketNum:"`+ market1 + `",five:false,start:`+ whstart + `){B1y,B2y,B3y,B4y,B5y,B6y,B7y,B8y,B9y,B1n,B2n,B3n,B4n,B5n,B6n,B7n,B8n,B9n}}`
    console.log(query)
    const mp = await graphqlRequest(query);
    const marketPrices = mp.market[0];
    console.log(marketPrices)
    return {marketPrices};
}

export async function loadWHPredicitons(market){

    const query = `query {whitehouse(endOfW:412,marketNum:`+ market + `,startAmount:`+ whstart + `){B1y,B1n,B2y,B2n,B3y,B3n,B4y,B4n,B5y,B5n,B6y,B6n,B7y,B7n,B8y,B8n,B9y,B9n,norm,kde,mean,std,count,percentage}}`
    const mp = await graphqlRequest(query);
    const marketPrices = mp.whitehouse[0];
    console.log(query);
    var norm = marketPrices["norm"];
    var kde = marketPrices["kde"];
    var count = marketPrices["count"];
    var mean = marketPrices["mean"];
    var std = marketPrices["std"];
    var percentage = marketPrices["percentage"];
    console.log(percentage);
    return {marketPrices,norm, kde, mean, std, count, percentage};
}

export function loadVPGraph(){
    return vpnorm;
}