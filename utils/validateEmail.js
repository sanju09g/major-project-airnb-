const axios = require("axios")


const valdiateEmail = async(email)=>{
const api_key = "5accccf7c2f54c82896282bf8775f3ff";
const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${api_key}&email=${email}`;

try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (err) {
    req.flash("error",err);
    return null;
  }

}

module.exports = valdiateEmail;