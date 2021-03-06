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


 async function genateSession(assistant,assistantId){

    

    var response;
        await assistant.createSession({
            assistantId: assistantId
            //"63ff75ed-f153-4a8a-8fca-920172b725d7"
        }).then(res => {
            response = { "session": res.result.session_id }
   
        }).catch(err => {
            console.log(err)
        });
        
   

    return response.session
   
       

}



export default async (req,res) =>{

    await runMiddleware(req, res, cors)

if(req.method === 'POST'){

    const apikey = req.body.apikey;
    const service = req.body.serviceurl;
    const assistantid = req.body.assistantid;

    console.log(apikey)
    const assistant = new AssistantV2({
        authenticator: new IamAuthenticator({ apikey: apikey }),
        serviceUrl: service,
        version: '2018-02-16'
    });


   
    const respa = await genateSession(assistant,assistantid)
  
 if(respa !== undefined){

   res.status(200).json({
        "session":respa
    })


    
  }else{

console.log(respa.session)

   res.status(500).json({
        error: "SESSION IS UNDEFINED!"
    })  

  }

}else {


    res.status(200).json({"Error":"Utilize o Metodo Post"})
}




}


