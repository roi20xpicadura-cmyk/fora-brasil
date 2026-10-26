export const desireSteps=[22,0,8,9,3] as const;
export const profileSteps=[2,5,7] as const;
export const problemSteps=[10,11,16,17,18] as const;
export const solutionSteps=[12,19,13,20,21,14,15] as const;
// Reference phases plus three brief profile answers; one decision per screen.
export const quizFlow=[...desireSteps,...profileSteps,...problemSteps,...solutionSteps] as const;
export const FUNNEL_VERSION=4;
export function nextQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i<0?quizFlow[0]:quizFlow[i+1]??null}
export function previousQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i>0?quizFlow[i-1]:null}
export function quizIsComplete(answered:readonly number[],valid:(step:number)=>boolean){return quizFlow.every(step=>answered.includes(step)&&valid(step))}
