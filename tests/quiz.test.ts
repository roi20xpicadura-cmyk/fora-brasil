import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quizFlow,nextQuizStep,previousQuizStep,quizIsComplete} from '../lib/quiz';
test('fluxo tem 7 decisões sem situação profissional duplicada',()=>{assert.equal(quizFlow.length,7);assert.equal(new Set(quizFlow).size,7);assert.equal(quizFlow.includes(4 as never),false);assert.equal(nextQuizStep(2),5);assert.equal(previousQuizStep(5),2)});
test('navegação para frente e para trás respeita a mesma sequência',()=>{quizFlow.forEach((step,i)=>{assert.equal(nextQuizStep(step),quizFlow[i+1]??null);assert.equal(previousQuizStep(step),quizFlow[i-1]??null)})});

test('pergunta financeira é única, sem perguntar reserva atual',()=>{assert.equal(quizFlow.includes(6 as never),false);assert.equal(nextQuizStep(5),7);assert.equal(previousQuizStep(7),5)});

test('cidadania foi retirada e objetivo segue direto para área profissional',()=>{assert.equal(quizFlow.includes(1 as never),false);assert.equal(nextQuizStep(0),2);assert.equal(previousQuizStep(2),0)});

test('valores padrão não revelam país antes da última resposta',()=>{assert.equal(quizIsComplete([3,0,2],()=>true),false);assert.equal(quizIsComplete(quizFlow.slice(0,-1),()=>true),false);assert.equal(quizIsComplete(quizFlow,()=>true),true);assert.equal(quizIsComplete(quizFlow,step=>step!==9),false)});
