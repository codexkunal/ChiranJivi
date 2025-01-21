import axios from 'axios'

const ChatbotLLM = async(req,res)=>{
    
    const {message} = req.body
    const apiUrl = `${process.env.BASE_API_URL2}/lf/${process.env.LANGFLOW_ID2}/api/v1/run/${process.env.ENDPOINT2}`;
    const payload = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
    };
    const headers = {
      Authorization: `Bearer ${process.env.APPLICATION_TOKEN}`,
      "Content-Type": "application/json",
    };
    
    try {
      console.log("langflow flow started");
        const response2 = await axios.post(apiUrl, payload, { headers });
        console.log(response2.data.outputs[0].outputs[0].results.message.text);
        return res.status(200).json(response2.data.outputs[0].outputs[0].results.message.text)
     
      } catch (error) {
        console.error("Error calling API:", error.message);
        throw error;
      }
    }

    export {ChatbotLLM};