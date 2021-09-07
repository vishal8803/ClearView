var ServerURL = "http://localhost:5000"
var axios = require('axios')
const getData = async(url)=>{
    try
    {
        // `${ServerURL}/${url}` This technique is known as template literals
        const response = await fetch(`${ServerURL}/${url}`)
        const result = await response.json()
        return result 

    }catch(e)
    {
        console.log("Error:",e)
        return null 
    }
}

const postData=async(url,body)=>{
    try{
        const response = await fetch(`${ServerURL}/${url}`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
          });
          const result = await response.json();
        //   alert(result)
          return result;
    }catch(e)
    {
        console.log("Error:",e)
        return null 
    }
}

const postDataAndImage = async(url,formdata,config)=>{
    try
    {
        const response = await axios.post(`${ServerURL}/${url}`,formdata,config)
        const result = await response.data
        return result 

    }catch(e)
    {
        console.log("Error:",e)
        return null 
    }
}

export {ServerURL,getData,postDataAndImage,postData}