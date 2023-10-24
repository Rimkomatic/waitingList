const emailModel = require('../model/email.model')

async function httpAddNewEmail(req,res)
{
    // req.body.email

    // console.log(req)

    const email = req.body.email

    // console.log(email)

    await emailModel.addNewEmail(email)
    res.status(200).redirect('shadov-inc.vercel.app');
 
}

function httpDefaultResponse(req,res)
{
    res.send( 200 , "Wellcome to the app")
}

async function httpDeleteAll(req,res)
{
    const ans = await emailModel.deleteAll()
    res.status(200).json({msg: "deleted"})
}

async function httpGetEmailList(req,res)
{
    const emailList = await emailModel.getAllEmail()
    res.status(200).send(emailList)
}


module.exports={
    httpAddNewEmail,
    httpDefaultResponse,
    httpDeleteAll,
    httpGetEmailList
}