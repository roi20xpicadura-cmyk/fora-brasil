import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newPlan,restorePlan,taskProgress} from '../lib/planner';
import {initial,recommend} from '../lib/engine';
test('app sem quiz completo começa sem presumir destino',()=>{assert.equal(newPlan().country,'');assert.equal(taskProgress([]),0)});
test('app importa dados reais do quiz para tarefas e família',()=>{const a={...initial,name:'Ana',people:3,profession:'Comércio e vendas',priority:'documentos'};const p=newPlan(a);assert.equal(p.country,recommend(a).country);assert.equal(p.family.length,3);assert.match(p.tasks[0].title,/documentos/);assert.equal(p.name,'Ana')});
test('progresso mede tarefas concluídas, incluindo novas tarefas',()=>{const p=newPlan();p.tasks[0].done=true;assert.equal(taskProgress(p.tasks),25);p.tasks.push({id:'nova',title:'Nova tarefa',done:false});assert.equal(taskProgress(p.tasks),20)});
test('salvamento pode ser restaurado sem perder andamento e documentos',()=>{const p=newPlan();p.tasks[0].done=true;p.documents[0].status='pronto';p.family.push('Maria');assert.deepEqual(restorePlan(JSON.parse(JSON.stringify(p))),p)});
test('dados corrompidos são rejeitados antes de renderizar',()=>{assert.equal(restorePlan({version:1}),null);assert.equal(restorePlan({...newPlan(),tasks:[{id:'x',title:'t',done:'false'}]}),null);assert.equal(restorePlan({...newPlan(),documents:[{id:'x',title:'t',status:'aprovado'}]}),null)});
