
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth'
 
async function messagem(assistant,assistantId, question,session){
var response
    await assistant.message({
        input: { text: question},
        assistantId: assistantId,
        sessionId: session,
    }).then(res => {
        response = res.result.output.generic
    }).catch(err => {
        console.log(err);
    });

    console.log(response)
return response
}



export default async (req,res) =>{


if(req.method === 'POST'){

    const apikey = req.body.apikey;
    const service = req.body.serviceurl;
    const assistantid = req.body.assistantid;
   const session_id = req.body.session;
const text = req.body.text;

    const assistant = new AssistantV2({
        authenticator: new IamAuthenticator({ apikey: apikey }),
        serviceUrl: service,
        version: '2018-02-16'
    });


  const respa = await messagem(assistant,assistantid,text,session_id)
   res.status(200).json(respa[0])

  
}else {


    res.status(200).json({"Error":"Utilize o Metodo Post"})
}




}


