import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
 
export const runtime = 'edge';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export default async function handler(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt, numberOfPosts, charLimit, language } = await req.json();
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an activist, and your task is to raise awareness about human rights violations.`
      },
      {
        role: 'user',
        content: `Given the following article, generate ${numberOfPosts > 0 ? numberOfPosts : numberOfPosts < 40 ? numberOfPosts : 'one'} ${language} posts for Twitter. The post shouldn't include any hashtags, and shouldn't exceed ${charLimit > 0 ? charLimit : charLimit <= 150 ? charLimit : 200 } characters.
Respond with a JSON array of posts ["post1", "post2" , ...]. Only respond with an array. Article:
${prompt}`,
      },
    ],
    temperature: 0, // absolute certainty
    // max_tokens: 200,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}

// sample news article
// Tutuklu hasta Ramazan Taşkıran, yürüyemez hale geldi ancak tahliye edilmiyor! Yüzde 93 engelli, ağır böbrek hastası tutuklu Ramazan Taşkıran’ın artık yürüyemez hale geldiği öğrenildi. Kızı Meryem Taşkıran, konuyla ilgili son sosyal medya mesajında, “Babam, ‘İyi değilim, bir şeyler yapın’ diyeli neredeyse 20 gün oldu. Bugün görüşe iki jandarmanın kollarında gelmiş. Merdivenlerde kucaklarına alıyorlarmış. Bunları anlatmak çok zor; sesimiz ulaşması gereken yerlere ulaşıyor mu bilmiyoruz. Ümitsizliğe düşüyoruz artık. Babamın eve geldiği haberini duymak istiyoruz. Babamı tahliye edin artık. Ev hapsi verin, kelepçeyle evine gönderin.” ifadelerini kullandı. Ramazan Taşkıran, bir derneğe üye olduğu gerekçesiyle yapılan yargılamalar sonrası 9 yıl hapis cezasına çarptırılmıştı. Günde 15 saat diyalize girmek zorunda olan Ramazan Taşkıran için ‘reviri olan bir cezaevinde kalabilir’ raporu verilmişti.