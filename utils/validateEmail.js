const axios = require("axios")


const valdiateEmail = async(email)=>{
const api_key = "f494cba3c19447f9a463a5f24e99e763";
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