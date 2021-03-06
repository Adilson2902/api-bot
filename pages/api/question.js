
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth'
 
import Cors from 'cors' 

const cors = Cors({
    methods: ['GET', 'HEAD'],
  })

  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }


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

    await runMiddleware(req, res, cors)

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
   res.status(200).json(respa)

  
}else {


    res.status(200).json({"Error":"Utilize o Metodo Post"})
}




}


