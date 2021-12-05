const axios = require('axios');
async function aaa(){
    await axios.get("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
        headers : {
                "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem"
            }
        
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}
aaa();