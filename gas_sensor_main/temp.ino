await axios.get("https://middlecors.herokuapp.com/https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/?rcn=4",{
    headers : {
            "X-M2M-Origin": "fRZvzNA7Bp:i43Yn0WPem",
        }
})
.then(function (res) {
    // console.log(res.data);
    let rows = []
    xml2js.parseString(res.data, (err, result) => {
        if(err) {
            throw err;
        }
        const json = JSON.stringify(result, null, 4);
        const obj = JSON.parse(json);
        var json_data = [] , temp_data = []
        temp_data = obj['m2m:cnt']['m2m:cin']
        for(var i=0;i<temp_data.length;i++)
        {
            json_data.push(temp_data[i]['con'])
        }
        var c = 0
        for(var i=0;i<json_data.length;i++)
        {
            var str = json_data[i][0]
            var f = 0
            for(var j=0;j<str.length;j++)
            {
                if(str[j]==',')
                {
                    f=1
                    break
                }
            }
            if(f==1)
            {
                c+=1
                f = 0
                var time="",reading=""
                if(str[1]==="1" && str[2]==="0"){   // data channel 6 for old encryption 8 for encryption testing
                    for(var j=5;j<str.length-1;j++)
                    {
                        if(str[j]==',')
                        {
                            f=1
                            continue
                        }
                        if(f==0)
                        {
                            time += str[j]
                        }
                        else
                        {
                            reading += str[j]
                        }
                    }
                    let value=reading
                    // removing whitespaces from front and back
                    value = value.trim()

                    // decryption
                    var aesEcb = require('aes-ecb');
                    var encrypt = Buffer.from(value, 'hex').toString('base64')
                    var decrypt = aesEcb.decrypt(hash_key, encrypt);

                    var true_reading = ''
                    for(let i=0;i<7;i++)
                    {
                        true_reading+=decrypt[i]
                    }

                    if(true_reading>'3000')
                    rows.push({ id: c, index: c, timestamp: time, reading: true_reading, status: "☠️"})
                }
            }
        }
    });

    roww = rows.reverse()
    return rows
})
.catch(function (error) {
    console.log(error);
    return -1
});
