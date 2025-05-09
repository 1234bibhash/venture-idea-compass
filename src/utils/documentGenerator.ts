
/**
 * Utility functions for generating downloadable documents
 */

/**
 * Generate a business plan document as a text blob
 */
export const generateBusinessPlanDocument = (ideaData: any): Blob => {
  // Create content for the business plan
  const content = `
# BUSINESS PLAN: ${ideaData.title.toUpperCase()}

## Executive Summary
${ideaData.description}

Overall Potential Score: ${ideaData.score}/100

## Market Analysis
${ideaData.analysis.marketPotential.details}

Market Score: ${ideaData.analysis.marketPotential.score}/100

### Market Opportunities:
${ideaData.analysis.marketPotential.opportunities.map((item: string) => `- ${item}`).join('\n')}

### Market Challenges:
${ideaData.analysis.marketPotential.challenges.map((item: string) => `- ${item}`).join('\n')}

## Competition Analysis
${ideaData.analysis.competitionAnalysis.details}

Competition Score: ${ideaData.analysis.competitionAnalysis.score}/100

### Key Competitors:
${ideaData.analysis.competitionAnalysis.competitors
  .map((competitor: any) => `- ${competitor.name}
  * Strengths: ${competitor.strengths}
  * Weaknesses: ${competitor.weaknesses}`)
  .join('\n')}

### Your Differentiators:
${ideaData.analysis.competitionAnalysis.differentiators.map((item: string) => `- ${item}`).join('\n')}

## Implementation Strategy
${ideaData.analysis.executionComplexity.details}

Execution Score: ${ideaData.analysis.executionComplexity.score}/100

### Technical Challenges:
${ideaData.analysis.executionComplexity.technicalChallenges.map((item: string) => `- ${item}`).join('\n')}

### Operational Challenges:
${ideaData.analysis.executionComplexity.operationalChallenges.map((item: string) => `- ${item}`).join('\n')}

### Timeline:
${ideaData.analysis.executionComplexity.timeline}

## Recommendations
${ideaData.recommendations.map((item: string) => `- ${item}`).join('\n')}

## Financial Projections
3-Year Revenue Forecast (Estimated)

Year 1: Initial market entry and product refinement
Year 2: Market expansion and feature development
Year 3: Scaling operations and potential fundraising

## Next Steps
1. Validate core assumptions with potential customers
2. Develop a minimum viable product (MVP)
3. Gather initial user feedback
4. Iterate on product based on market response
5. Develop go-to-market strategy

---
Generated by VentureCompass on ${new Date().toLocaleDateString()}
`;

  // Create a blob from the content
  return new Blob([content], { type: 'text/plain' });
};

/**
 * Download a blob as a file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
