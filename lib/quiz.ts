export const quizFlow=[3,0,2,5,7,8,9] as const;
export function nextQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return quizFlow[i+1]??null}
export function previousQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i>0?quizFlow[i-1]:null}
export function quizIsComplete(answered:readonly number[], valid:(step:number)=>boolean){return quizFlow.every(step=>answered.includes(step)&&valid(step))}
