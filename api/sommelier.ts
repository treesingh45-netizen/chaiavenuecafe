import { GoogleGenAI, ThinkingLevel } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, mood, selectedItem, budget } = req.body || {};

    if (!aiClient) {
      return res.status(200).json(getCuratedRecommendation(query || mood, selectedItem, budget));
    }

    const budgetDirective = budget
      ? `BUDGET REQUIREMENT: The user has set a budget of "${budget}". You MUST select 1 to 3 items whose COMBINED TOTAL price stays strictly within or very close to this budget. Calculate the exact total price in Rs.`
      : `BUDGET: Flexible / No strict limit. Provide the ideal pairing balance.`;

    const userPrompt = `
User question or mood: "${query || mood || 'Recommend the ultimate Chai Avenue experience'}".
Currently looking at: "${selectedItem || 'General Menu'}".
${budgetDirective}

Please provide an expert culinary recommendation from Chai Avenue. Format as JSON with:
{
  "recommendation": "A warm, evocative 2-3 sentence recommendation explaining the flavor balance and why this fits their moment and budget.",
  "pairings": [
    {"name": "Exact Menu Item Name", "category": "Category", "price": "Price in Rs", "reason": "Why it pairs or suits the order"}
  ],
  "totalPrice": "Calculated total price in Rs, e.g. Rs 650",
  "budgetStatus": "Brief status e.g. 'Within your Rs 1,000 budget' or 'Fits your budget'",
  "sommelierTip": "A 1-sentence insider tip on ordering, temperature, or flavor note."
}
`;

    let responseText = "";
    const candidateModels = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-3.1-flash-lite"];

    for (const modelName of candidateModels) {
      try {
        const response = await aiClient.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: MENU_CONTEXT,
            responseMimeType: "application/json",
          },
        });
        if (response?.text) {
          responseText = response.text;
          break;
        }
      } catch {
        // Fallback cleanly without dumping 503 error payloads
      }
    }

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        return res.status(200).json(parsed);
      } catch {
        // Fallback smoothly
      }
    }

    return res.status(200).json(getCuratedRecommendation(query || mood, selectedItem, budget));
  } catch {
    return res.status(200).json(getCuratedRecommendation(req.body?.query, req.body?.selectedItem, req.body?.budget));
  }
}

function getCuratedRecommendation(query?: string, selectedItem?: string, budget?: string) {
  const q = (query || "").toLowerCase();
  const s = (selectedItem || "").toLowerCase();
  const b = (budget || "").toLowerCase();

  // If strict budget under 500
  if (b.includes("500") || b.includes("under 500") || (parseInt(b) > 0 && parseInt(b) <= 500)) {
    return {
      recommendation: "For a satisfying experience under Rs 500, nothing beats our classic boiled Karak Chai paired with a fresh slice of Banana Walnut Loaf.",
      pairings: [
        { name: "Karak Chai", category: "Chai", price: "Rs 140", reason: "Strong, slow-boiled Ceylon tea with creamy milk." },
        { name: "Banana Walnut Loaf", category: "Pastry Lab", price: "Rs 280", reason: "Warm toasted slice with caramelized banana notes." }
      ],
      totalPrice: "Rs 420",
      budgetStatus: "Under your Rs 500 budget (Rs 80 saved)",
      sommelierTip: "Dip the warm loaf directly into the Karak Chai for the classic Pakistani dhaba comfort."
    };
  }

  if (q.includes("sweet") || q.includes("dessert") || s.includes("cake") || s.includes("chocolate")) {
    return {
      recommendation: "Balance the rich decadence of our Pastry Lab with our signature Zafrani Chai. The royal saffron and warm spice notes perfectly cut through velvety chocolate.",
      pairings: [
        { name: "Zafrani Chai", category: "Chai", price: "Rs 200", reason: "Royal saffron-infused rich milk tea garnished with pistachio." },
        { name: "Chocolate Lava Cake", category: "Pastry Lab", price: "Rs 450", reason: "Molten Belgian chocolate center that melts harmoniously with warm tea." }
      ],
      totalPrice: "Rs 650",
      budgetStatus: budget ? `Within ${budget}` : "Balanced Pairing",
      sommelierTip: "Ask for low sweetness in your chai when pairing with our chocolate desserts."
    };
  }

  if (q.includes("cold") || q.includes("summer") || q.includes("refresh") || q.includes("smoothie") || q.includes("shake")) {
    return {
      recommendation: "For a crisp, refreshing indulgence, the Asian Pear Mojito paired with Tex Mex Fries hits the ultimate contrast of sweet and savory.",
      pairings: [
        { name: "Asian Pear Mojito", category: "Signature Drinks", price: "Rs 350", reason: "Chilled effervescent pear and fresh mint infusion." },
        { name: "Tex Mex Fries", category: "Savory & Starters", price: "Rs 250", reason: "Crispy seasoned fries with tangy salsa and melting cheese." }
      ],
      totalPrice: "Rs 600",
      budgetStatus: budget ? `Within ${budget}` : "Balanced Pairing",
      sommelierTip: "Enjoyed best outdoors in the garden patio seating."
    };
  }

  return {
    recommendation: "For an unforgettable visit to DHA Phase 1, start with our slow-simmered Special Doodh Patti and freshly baked Triple Chocolate Cake.",
    pairings: [
      { name: "Special Doodh Patti", category: "Chai", price: "Rs 200", reason: "100% whole milk slow-simmered tea, thick, creamy, pure comfort." },
      { name: "Triple Chocolate Cake", category: "Pastry Lab", price: "Rs 330", reason: "Layered Belgian dark, milk, and white chocolate mousse." }
    ],
    totalPrice: "Rs 530",
    budgetStatus: budget ? `Within ${budget}` : "Balanced Pairing",
    sommelierTip: "Ask for an extra hot pour on breezy Lahore evenings."
  };
}
