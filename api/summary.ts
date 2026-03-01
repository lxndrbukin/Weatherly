import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function summary(req: VercelRequest, res: VercelResponse) {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY });
  const { data } = req.body;
  const prompt = `
  Given the following weather data for ${data.city}:
  Current: ${data.current.temp}°C, feels like ${data.current.feels_like}°C, 
  ${data.current.description}, wind ${data.current.wind_speed}m/s, humidity ${data.current.humidity}%
  
  Upcoming forecast: ${JSON.stringify(data.forecast)}
  
  Write a friendly, conversational 2-3 sentence weather summary a person would actually find useful.
`;

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [ { role: 'user', content: prompt } ]
  });
  const text = response.choices[ 0 ].message.content;
  res.status(200).json({ summary: text });
}