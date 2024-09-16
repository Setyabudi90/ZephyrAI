import { Groq} from "groq-sdk"

const GROQ_API_KEY = import.meta.env.VITE_API_KEY

const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})


export async function requestToAI(question) {
  const reply = await groq.chat.completions.create({
    messages: [{
        role: "user",
        content: question
    }],
    model: "llama3-8b-8192",
  })
  return reply.choices[0].message.content
}
