// Desire → obstacles → solution. One decision per screen; name is the only text field.
export const quizFlow=[0,8,9,3,2,5,7,10,11,12,13,14,15] as const;
export function nextQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i<0?quizFlow[0]:quizFlow[i+1]??null}
export function previousQuizStep(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i>0?quizFlow[i-1]:null}
export function quizIsComplete(answered:readonly number[],valid:(step:number)=>boolean){return quizFlow.every(step=>answered.includes(step)&&valid(step))}
export function quizPhase(step:number){const i=quizFlow.indexOf(step as typeof quizFlow[number]);return i<4?0:i<9?1:2}
