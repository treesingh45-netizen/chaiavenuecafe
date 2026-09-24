import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI Server-Side
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const MENU_CONTEXT = `
You are the Master Chai Sommelier & Culinary Concierge at "Chai Avenue", an upscale Pakistani café in Plaza #15, Sector L, DHA Phase 1, Lahore, Pakistan.
Brand Tagline: "It only tastes expensive."
Visual Identity: Deep charcoal & warm golden yellow, rich tea culture meets modern luxury café.

Full Chai Avenue Menu:
CHAI:
- Karak Chai (Regular Rs 140, Large Rs 190): Strong, deeply boiled traditional black tea with milk and balanced sweetness.
- Masala Chai (Regular Rs 160, Large Rs 210): Infused with freshly crushed cardamom, cinnamon, cloves, and ginger.
- Zafrani Chai (Regular Rs 200, Large Rs 250): Royal saffron-infused rich milk tea garnished with pure saffron strands and pistachio.
- Chocolate Chai (Regular Rs 180, Large Rs 230): Rich Dutch cocoa blended into spiced velvety chai.
- Special Doodh Patti (Regular Rs 200, Large Rs 250): 100% whole milk slow-simmered tea, thick, creamy, pure comfort.

COFFEE:
- Hot: Caffe Latte (Rs 280), Cappuccino (Rs 280), Caffe Mocha (Rs 280), Hot Chocolate (Rs 300)
- Cold: Iced Chocolate (Rs 300), Hazelnut Iced (Rs 300), Caramel Iced (Rs 300), Vanilla Iced (Rs 300)

SHAKES:
- Oreo Vanilla (Rs 280), Oreo Chocolate (Rs 280), French Vanilla (Rs 280), Nutellcious (Rs 280)

SMOOTHIES:
- Strawberry Banana Smoothie (Rs 300), Berry Passion Smoothie (Rs 300), Nutellcious Smoothie (Rs 300)

PASTRY LAB BY CHAI AVENUE:
- Triple Chocolate (Rs 330), Butter Scotch (Rs 280), Strawberry Coconut Cream Cake (Rs 300), Lemon Grass Fortune Cheese Cake (Rs 300), New York Cheese Cake (Rs 650), Chocolate Lava Cake (Rs 450), Special Chocolate Dome (Rs 550), Great Wall of Chocolate (Rs 500)

SIGNATURE DRINKS:
- Asian Pear Mojito (Rs 350), Barry's Citrus (Rs 430)

SAVORY & STARTERS:
- Tex Mex Fries (Rs 250), Chicken Tenders (Rs 250), Hail Caeser (Rs 250)
- Peri Peri Twister Wrap (Rs 300), Signature Filler Wrap (Rs 400)
- Pizzas: Fajita Classic (8" Rs 400, 11" Rs 750, 13" Rs 1000), Chicken Tikka (8" Rs 400, 11" Rs 760, 13" Rs 1040), The Stretch Factor (8" Rs 400, 11" Rs 780, 13" Rs 1080), Chai Avenue Special (11" Rs 850, 13" Rs 1250), Calzone (8" Rs 450, 11" Rs 800)
`;

// AI Sommelier Endpoint
app.post("/api/sommelier", async (req, res) => {
  try {
    const { query, mood, selectedItem } = req.body;

    if (!aiClient) {
      return res.json({
        recommendation: "Our signature Zafrani Chai paired with the warm Chocolate Lava Cake is the quintessential Chai Avenue indulgence.",
        pairings: [
          { name: "Zafrani Chai", category: "Chai", price: "Rs 200", reason: "The delicate warmth of royal saffron cuts through the rich bittersweet chocolate." },
          { name: "Chocolate Lava Cake", category: "Pastry Lab", price: "Rs 450", reason: "Molten dark center that melts harmoniously with creamy doodh patti." }
        ],
        sommelierTip: "Order your chai 'Dum' style with low sugar if you're enjoying our Pastry Lab chocolate creations."
      });
    }

    const userPrompt = `
User question or mood: "${query || mood || 'Recommend the ultimate Chai Avenue experience'}".
Currently looking at: "${selectedItem || 'General Menu'}".

Please provide an expert culinary recommendation from Chai Avenue. Format as JSON with:
{
  "recommendation": "A warm, evocative 2-3 sentence recommendation explaining the flavor balance and why this fits their moment.",
  "pairings": [
    {"name": "Exact Menu Item Name", "category": "Category", "price": "Price in Rs", "reason": "Why it pairs or suits the order"}
  ],
  "sommelierTip": "A 1-sentence insider tip on ordering, temperature, or flavor note."
}
`;

    // Try high thinking model first as instructed
    let responseText = "";
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: userPrompt,
        config: {
          systemInstruction: MENU_CONTEXT,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: "application/json",
        },
      });
      responseText = response.text || "";
    } catch {
      // Fallback to gemini-3.8-flash
      const fallbackResponse = await aiClient.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userPrompt,
        config: {
          systemInstruction: MENU_CONTEXT,
          responseMimeType: "application/json",
        },
      });
      responseText = fallbackResponse.text || "";
    }

    if (responseText) {
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    }

    throw new Error("Empty response");
  } catch (err: any) {
    console.error("Sommelier error:", err);
    return res.json({
      recommendation: "For an unforgettable visit to DHA Phase 1, you can never go wrong with our Special Doodh Patti and freshly baked Chocolate Lava Cake.",
      pairings: [
        { name: "Special Doodh Patti", category: "Chai", price: "Rs 200", reason: "Pure whole milk simmered to velvety perfection." },
        { name: "Chocolate Lava Cake", category: "Pastry Lab", price: "Rs 450", reason: "Warm molten Belgian chocolate center." }
      ],
      sommelierTip: "Ask for an extra hot cup on breezy Lahore evenings."
    });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chai Avenue server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
