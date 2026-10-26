export const desireSteps=[22,0,8,9,3] as const;
export const profileSteps=[2,5,7] as const;
export const problemSteps=[10,17] as const;
export const solutionSteps=[19,13,15] as const;
// One answer per topic: desire, profile, obstacle, documents, then result.
export const quizFlow=[...desireSteps,...profileSteps,...problemSteps,...solutionSteps] as const;
export const FUNNEL_VERSION=6;
export function nextQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i<0?quizFlow[0]:quizFlow[i+1]??null}
export function previousQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i>0?quizFlow[i-1]:null}
export function quizIsComplete(answered:readonly number[],valid:(step:number)=>boolean){return quizFlow.every(step=>answered.includes(step)&&valid(step))}

// Keep relevant progress from the longer quiz without carrying removed questions forward.
export function restoreQuizProgress(version:number,step:number,answered:unknown){
 const compatible=version===4||version===5||version===FUNNEL_VERSION;
 const kept=compatible&&Array.isArray(answered)?Array.from(new Set(answered.filter((n):n is number=>typeof n==='number'&&quizFlow.includes(n as typeof quizFlow[number])))):[];
 const next=compatible&&quizFlow.includes(step as typeof quizFlow[number])&&(!kept.includes(step)||kept.length===quizFlow.length)?step:quizFlow.find(n=>!kept.includes(n))??quizFlow[quizFlow.length-1];
 return {step:next,answered:kept};
}
