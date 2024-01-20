const getTimePassed = (todayDate , posterDate)=>{
    const day = todayDate.getDate()
    const month = todayDate.getMonth() + 1

    const posterDay = posterDate.split("/")[1]
    const posterMonth = posterDate.split("/")[0]
     let diff
    if(month > posterMonth){
         diff = month - posterMonth
        return `${diff} month ago`
    }else if(day > posterDay){
        diff = day - posterDay
        return `${diff} days ago`        
    }else if(day == posterDay){
        return `today`
    }else {
        return null
    }


}





module.exports = {
    getTimePassed
}