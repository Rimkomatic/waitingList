const emailDB = require('../database/email.mongo')

DEFAULT_ID = 1 


async function addNewEmail(email)  // adds new email to existing one
{
    try{
        const newId = await getLastId()
        let newEmail={
            id: newId ,
            email: email
        }
        
        await emailDB.findOneAndUpdate({
            id:newId 
        } , newEmail, {
            upsert :true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

async function deleteAll()
{
    try{
        await emailDB.deleteMany({})
    }
    catch(err)
    {
        console.log(err)
    }
}

async function getLastId()   // to get the latest ID 
{
    const lastEmail = await emailDB.findOne().sort("-id");

    if(!lastEmail)
    {
        return DEFAULT_ID
    }

    return lastEmail.id + 1
}

async function getAllEmail()
{
    let emailList = []
    try {  
        const emails = await emailDB.find({}, 'email')
        emailList = emails.map((entry) => entry.email).join(', ')

      } catch (error) {
        console.error(error);
    }
    return emailList
}

module.exports = {
    addNewEmail,
    deleteAll,
    getAllEmail
}