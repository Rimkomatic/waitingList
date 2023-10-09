const emailDB = require('../database/email.mongo')

DEFAULT_ID = 1 


async function addNewEmail(email)  // adds new email to existing one
{
    const newId = getLastId() + 1
    
    await emailDB.findOneAndUpdate({
        id:email.id 
    } , email , {
        upsert :true
    })
}


async function getLastId()   // to get the latest ID 
{
    const lastId = await emailDB
    .findOne()
    .sort("-id")

    if(!lastId)
    {
        return DEFAULT_ID
    }

    return lastId.id
}

module.exports = {addNewEmail}