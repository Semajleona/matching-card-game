/*fetch(`/api?choice1=${playerFirstCardSelected}&choice2=${playerSecondCardSelected}`)
 .then(response => response.json())
 .then((data) => {
   console.log(data);
   

})*/

if (page == '/api') {
    if ('choice1' in params) {
        if (params['choice1'] == params['choice2']) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const objToJson = {
                matchMessage: 'Its a Match'
            }
            res.end(JSON.stringify(objToJson));
        }
    }
}

else if (params['choice1'] != params['choice2']) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const objToJson = {
        dontMatchMessage: 'No match,Try Again'
    }

    res.end(JSON.stringify(objToJson));
}