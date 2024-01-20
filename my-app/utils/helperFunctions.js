const { verify } = require("jsonwebtoken");


const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));


  const sp = (number) => {
    const seperatedNumber = number
      .toString()
      .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    const joinedNumber = seperatedNumber.join(",");
    return joinedNumber
  };

function objectCopy(data){
  return JSON.parse(JSON.stringify(data))
}


function getMinAndMaxPrice(posters){
  let minPriceArray = []
  let minPrice
  posters.forEach(price => {
      minPriceArray.push(...Object.values(price))
      minPrice = Math.min(...minPriceArray)
  })

  let maxPriceArray = []
  let maxPrice
  posters.forEach(price => {
      maxPriceArray.push(Object.values(price))
      maxPrice = Math.max(...maxPriceArray)
  })
  return{
      minPrice , maxPrice
  }
}

const getClientCookies = async(cookies)=>{
 try {
  const token = cookies().get("authorization")?.value
  
  if(token){
    const data =  verify(token , process.env.SIGN_SECRET_KEY) 
    return {
      user : data, status :"authenticated"
    }
  }else{
    return null
  }
 } catch (error) {
    return null
 }

}



module.exports = { e2p, p2e, sp , objectCopy , getMinAndMaxPrice , getClientCookies };
