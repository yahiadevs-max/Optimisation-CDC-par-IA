import { GoogleGenAI } from "@google/genai";
import { BpuDqeItem, XaiExplanation, CdcAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generationConfig = {
  temperature: 0.2,
  topK: 40,
  topP: 0.95,
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  const model = 'gemini-2.5-flash';

  const filePart = {
    inlineData: {
      data: await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
      }),
      mimeType: file.type,
    },
  };

  const prompt = `Le fichier fourni est un document (${file.type}). Agis comme un système OCR avancé. Extrais l'intégralité du texte contenu dans ce document.
- Préserve la structure du texte, y compris les paragraphes, les listes et la disposition des tableaux.
- Ne fournis aucune explication, aucun commentaire, ni aucune balise (comme \`\`\`text).
- Retourne uniquement le texte brut et structuré que tu as extrait.`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [ {text: prompt}, filePart ] },
      config: { temperature: 0.1 } // Low temperature for factual extraction
    });
    
    return response.text;
  } catch (error) {
    console.error(`Error extracting text from ${file.name}:`, error);
    throw new Error(`Failed to perform OCR on the file with Gemini API.`);
  }
};


export const analyzeCdcDocument = async (documentText: string): Promise<CdcAnalysisResult> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `Tu es un expert en marchés publics algériens et en analyse technique de cahiers des charges (CDC). Le texte ci-dessous est le contenu intégral du CDC, supposément extrait d'un fichier PDF par OCR et nettoyé.
"""
${documentText}
"""

Procède à une analyse approfondie en suivant ces instructions et structure la sortie en un objet JSON unique.

**Tâches d'analyse:**

1.  **Analyse Synthétique:**
    *   Identifie et résume toutes les exigences techniques, les volumes, et les spécifications des produits/services.
    *   Extrait les délais cruciaux (date limite de soumission, délais de livraison, période de garantie).
    *   Liste précisément les critères d'évaluation et de notation technique.
    *   Évalue les principaux risques (techniques, logistiques, contractuels) et donne une estimation des chances de succès.

2.  **Analyse Juridique et Administrative:**
    *   Identifie les clauses juridiques sensibles, les pénalités, et les conditions contractuelles importantes.
    *   Évalue la conformité générale avec le Code des Marchés Publics Algérien.
    *   Liste de manière exhaustive tous les documents requis pour composer le dossier administratif de candidature.

3.  **Préparation du Mémoire Technique:**
    *   Génère la structure complète et un plan détaillé pour un mémoire technique de réponse, en intégrant les délais et les informations techniques extraites précédemment.

**Format de Sortie:**

La sortie DOIT être un objet JSON valide avec la structure suivante:
{
  "synthesis": "Rédige ici le contenu de l'analyse synthétique, incluant exigences, délais, critères d'évaluation, risques et chances de succès. Utilise le format Markdown.",
  "legalAudit": "Rédige ici l'analyse juridique et administrative, incluant les clauses sensibles, la conformité, et la liste complète du dossier administratif. Utilise le format Markdown.",
  "technicalBrief": "Rédige ici la structure et le plan détaillé du mémoire technique. Utilise le format Markdown."
}
`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { ...generationConfig, responseMimeType: 'application/json' }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as CdcAnalysisResult;
  } catch (error) {
    console.error("Error analyzing CDC document:", error);
    throw new Error("Failed to analyze document with Gemini API.");
  }
};

export const extractBpuDqeData = async (documentText: string, docType: 'bpu' | 'dqe'): Promise<BpuDqeItem[]> => {
  const model = 'gemini-2.5-flash';

  const columnsToExtract = docType === 'dqe'
    ? "'Numéro ordre', 'Désignation', 'Unité de mesure', et 'Quantité'"
    : "'Numéro ordre', 'Désignation', et 'Unité de mesure'";

  const jsonStructureExample = docType === 'dqe'
    ? `{"number": "1.1", "designation": "Fourniture et pose de...", "unit": "m²", "quantity": "150"}`
    : `{"number": "1", "designation": "Produit A", "unit": "U"}`;


  const prompt = `Agis comme un outil OCR et NLP spécialisé dans l'extraction de données tabulaires à partir de documents de marchés publics.
Le document suivant est un ${docType.toUpperCase()}.
"""
${documentText}
"""

Ta tâche est de:
1. Reconnaître et extraire le tableau principal des articles.
2. Pour chaque ligne du tableau, extraire les colonnes suivantes: ${columnsToExtract}.
3. Ignorer les en-têtes, les titres, les lignes vides ou les totaux. Nettoie les données.
4. Si la colonne 'Quantité' n'est pas présente pour un BPU, ne l'inclut pas. La quantité peut être une chaîne de caractères.
5. Retourne le résultat sous la forme d'un tableau d'objets JSON. Chaque objet représente une ligne du tableau.

La sortie DOIT être un tableau JSON valide. Voici un exemple de la structure d'un objet dans le tableau:
${jsonStructureExample}
`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { ...generationConfig, responseMimeType: 'application/json' }
    });
    
    const jsonString = response.text.trim();
    // Assuming the API returns an array of objects matching Omit<BpuDqeItem, 'id'>
    const items = JSON.parse(jsonString) as Omit<BpuDqeItem, 'id'>[];

    // Add a unique ID to each item for React keys
    return items.map((item, index) => ({
      ...item,
      id: `item-${index}-${new Date().getTime()}`,
      quantity: item.quantity ?? '1' // Ensure quantity has a default value for BPU
    }));

  } catch (error) {
    console.error(`Error extracting ${docType.toUpperCase()} data:`, error);
    throw new Error(`Failed to extract data from ${docType.toUpperCase()} with Gemini API.`);
  }
};


export const generateXaiExplanation = async (item: BpuDqeItem): Promise<XaiExplanation> => {
  const model = 'gemini-2.5-flash';

  const prompt = `Agis comme un expert en estimation de coûts pour les marchés publics. Pour l'article de BPU/DQE suivant:
- Désignation: "${item.designation}"
- Quantité: ${item.quantity}
- Prix Unitaire Prédit: ${item.unitPrice?.toFixed(2)} DA

Génère une justification plausible pour ce prix en utilisant les concepts de l'IA explicable (XAI) et des valeurs SHAP.
Explique les facteurs qui ont eu un impact positif (augmentant le prix) et négatif (diminuant le prix).
Invente des facteurs pertinents comme 'Indice du coût des matériaux', 'Complexité de la tâche', 'Localisation du projet', 'Volume de la commande', 'Concurrence estimée'.

La réponse DOIT être un objet JSON valide avec la structure suivante:
{
  "explanation": "Une explication textuelle détaillée.",
  "positiveFactors": [{"feature": "Nom du facteur", "impact": valeur_numerique_positive}],
  "negativeFactors": [{"feature": "Nom du facteur", "impact": valeur_numerique_negative}]
}
`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { ...generationConfig, responseMimeType: 'application/json' }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as XaiExplanation;
  } catch (error) {
    console.error("Error generating XAI explanation:", error);
    // Fallback in case of JSON parsing error
    return {
      explanation: "Une erreur est survenue lors de la génération de l'explication. Le modèle a peut-être renvoyé un format inattendu.",
      positiveFactors: [],
      negativeFactors: [],
    };
  }
};