export enum Page {
  WORKSPACE = 'WORKSPACE',
  SMART_READER = 'SMART_READER',
  COST_PREDICTOR = 'COST_PREDICTOR',
  XAI_JUSTIFIER = 'XAI_JUSTIFIER',
  REPORTS = 'REPORTS',
}

export interface CdcAnalysisResult {
  synthesis: string;
  legalAudit: string;
  technicalBrief: string;
}

export interface BpuDqeItem {
  id: string;
  number: string;
  designation: string;
  unit: string;
  quantity: string | number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface XaiExplanation {
  explanation: string;
  positiveFactors: { feature: string; impact: number }[];
  negativeFactors: { feature: string; impact: number }[];
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  cdcAnalysis: CdcAnalysisResult | null;
  bpuDqeItems: BpuDqeItem[];
  pricedItems: BpuDqeItem[];
}
