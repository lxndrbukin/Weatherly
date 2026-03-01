import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function summary(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { data } = body;
    const prompt = `
    Given the following weather data for ${data.city}:
    Current: ${data.current.temp}°C, feels like ${data.current.feels_like}°C, 
    ${data.current.description}, wind ${data.current.wind_speed}m/s, humidity ${data.current.humidity}%
    
    Upcoming forecast: ${JSON.stringify(data.forecast)}
    
    Write a friendly, conversational 2-3 sentence weather summary a person would actually find useful.
  `;
    const client = new OpenAI({ apiKey: OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [ { role: 'user', content: prompt } ]
    });
    const text = response.choices[ 0 ].message.content;
    res.status(200).json({ summary: text });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}