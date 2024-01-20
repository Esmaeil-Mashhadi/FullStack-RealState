function validate (data){
    const {email ,password , confirm} = data
   const error = {}

   if(!email){
    error.email = "waiting to fill the email field !"

} else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
    error.email = "Waiting for valid email !"
} else{
    delete error.email
}
  
if(!password){
    error.password = "set a password"
} else if ( !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(data.password)) {
   error.password = "at least on upper case , one special character and 8 length"

} else{
    delete error.password
}


if(!confirm){
    error.confirm = "please confirm the password"
} else if (confirm !== password){
    error.confirm = "they are not the same yet"
}

return error

}

export {validate}