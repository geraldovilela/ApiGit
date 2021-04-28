const express = require('express');
const axios = require('axios').default;


const app = express();

app.get('/get-repos', async (request, response)=>{
    const resp = await axios.get('https://api.github.com/orgs/takenet/repos?sort=created&direction=asc')
    const data = resp.data;
    const dataFilter = data.filter((repo)=>{
        return repo.language == "C#";
    });
    dataFilter.sort(dynamicSort("created_at"))
    const sliceData = dataFilter.slice(0,5);
    return response.status(200).json(sliceData)
})

function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports= app;