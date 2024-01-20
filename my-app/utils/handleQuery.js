

export const handleQuery = (category , searchParams)=>{
    let query = `category=${category}`
    const {min ,max} = searchParams || {min:"" , max:""}

    if(min && max && category == "all"){
        query = `min=${min}&max=${max}`
    }else if(category == "all"){
        query = null
    }else if(min && max){
        query = `min=${min}&max=${max}&category=${category}`
    }
    return query
}