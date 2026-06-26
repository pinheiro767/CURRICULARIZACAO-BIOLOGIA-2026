const weeks=[
{n:1,t:"Escolha dos temas",g:"Grupos escolhem o tema de saúde reprodutiva e o formato do jogo.",d:"Tema + tipo de game definidos"},
{n:2,t:"Imagens pelo Canva/IA",g:"Criar identidade visual, telas, fundos e personagens pensando no público idoso.",d:"Assets visuais iniciais"},
{n:3,t:"HTML por prompts + Google Sites",g:"Gerar o primeiro HTML com IA e publicar no Google Sites para testar o protótipo.",d:"Protótipo navegável"},
{n:4,t:"GitHub e funcionalidades",g:"Abrir conta, criar repositório e entender GitHub Pages.",d:"Projeto publicado"},
{n:5,t:"Criar assets finais",g:"Organizar imagens, ícones, vídeos de Libras, áudios e audiodescrições.",d:"Pasta assets pronta"},
{n:6,t:"Construção dos jogos",g:"Inserir quiz, bolhas, memória, cruzadas ou outro game escolhido.",d:"Game funcional"},
{n:7,t:"Acessibilidade",g:"Adicionar Libras, áudio, audiodescrição, alto contraste e botões grandes.",d:"Game inclusivo"},
{n:8,t:"Transformar em PWA",g:"Adicionar manifest, service worker e testar instalação no celular.",d:"PWA instalável"},
{n:9,t:"Entrega no MUDI",g:"Apresentar, instalar e testar com o público visitante.",d:"PWA aplicado no MUDI"}
];

const themes={
"🩺 Saúde Reprodutiva e Prevenção":["Métodos contraceptivos","Prevenção de IST","HPV e vacinação","Planejamento reprodutivo","Gravidez saudável","Saúde sexual na adolescência","Saúde sexual na vida adulta","Sexualidade e envelhecimento"],
"♀️ Saúde da Mulher":["Ciclo menstrual","Menopausa","Câncer de mama","Câncer de colo do útero","Autocuidado feminino","Saúde íntima feminina"],
"♂️ Saúde do Homem":["Saúde da próstata","Câncer de pênis","Saúde íntima masculina","Fertilidade masculina","Autocuidado masculino"],
"🧬 Anatomia e Fisiologia":["Sistema reprodutor feminino","Sistema reprodutor masculino","Hormônios e reprodução","Fecundação e desenvolvimento embrionário","Puberdade","Anatomia da gestação"],
"❤️ Hábitos Saudáveis":["Alimentação e fertilidade","Exercício físico e saúde reprodutiva","Sono e saúde hormonal","Saúde mental e bem-estar","Prevenção ao uso de álcool, tabaco e drogas"],
"👥 Relações e Sociedade":["Consentimento","Relacionamentos saudáveis","Comunicação entre parceiros","Direitos reprodutivos","Violência sexual e prevenção"]
};
const formats=["Quiz","Jogo da Memória","Caça-palavras","Palavras cruzadas","Escape room","Jogo de escolhas","Tabuleiro digital","Perguntas e respostas","Jogo de associação","Quebra-cabeça","Bubble/Bolhas"];
const steps=[
["Missão do dia","Hoje não é programação. Hoje é criar o visual do PWA Game e deixar os grupos menos perdidos com prompts."],
["Público idoso","Toda imagem deve ter leitura fácil, alto contraste, poucos elementos, botões grandes e visual acolhedor."],
["Identidade visual","Definir cores, estilo, nome do jogo, mascote e sensação visual do aplicativo."],
["Tela inicial","Criar uma imagem 16:9 com aparência de app e espaço para botão INICIAR."],
["Menu dos jogos","Criar uma tela com espaço para botões: Quiz, Bolhas, Memória, Cruzadas, Caça-palavras ou outro."],
["Fundos dos games","Criar fundos limpos para as fases. Eles não podem competir com perguntas, botões e letras."],
["Mascotes e robô tutor","Criar personagem guia do app. Ele pode explicar dicas, acessibilidade e missão da semana."],
["Libras e áudio","Planejar onde entrarão os vídeos dos intérpretes, narração e audiodescrição dentro do game."],
["Organização final","Salvar tudo com nomes simples: logo.png, tela-inicial.png, menu.png, quiz.png, libras-hpv.mp4."]
];

let done=JSON.parse(localStorage.getItem("done3d")||"[]");
let done2=JSON.parse(localStorage.getItem("doneWeek2_3d")||"[]");

function renderWeeks(){
 const el=document.getElementById("weekGrid");
 el.innerHTML=weeks.map(w=>`<article class="week-card ${done.includes(w.n)?"done":""}">
 <span class="tag">Semana ${w.n}</span><h3>${w.t}</h3><p>${w.g}</p><span class="deliver">📦 ${w.d}</span>
 <button class="check" onclick="toggleWeek(${w.n})">${done.includes(w.n)?"✅ Concluída":"Marcar missão"}</button></article>`).join("");
}
function renderThemes(){
 document.getElementById("themes").innerHTML=Object.entries(themes).map(([c,arr])=>`<div class="cat"><h4>${c}</h4>${arr.map(i=>`<span class="chip" onclick="pickTheme('${i.replaceAll("'","")}')">${i}</span>`).join("")}</div>`).join("");
 document.getElementById("formats").innerHTML=formats.map(f=>`<span class="chip" onclick="pickFormat('${f}')">${f}</span>`).join("");
}
function renderSteps(){
 document.getElementById("week2Steps").innerHTML=steps.map((s,i)=>`<article class="mission-step ${done2.includes(i+1)?"done":""}">
 <div class="num">${i+1}</div><div><h3>${s[0]}</h3><p>${s[1]}</p>${i==8?"<ul><li>logo.png</li><li>tela-inicial.png</li><li>menu.png</li><li>fundo-jogo.png</li><li>personagem-biobot.png</li><li>video-libras.mp4</li></ul>":""}</div>
 <button class="check" onclick="toggleStep(${i+1})">${done2.includes(i+1)?"✅":"Concluir"}</button></article>`).join("");
}
function toggleWeek(n){done=done.includes(n)?done.filter(x=>x!==n):[...done,n];localStorage.setItem("done3d",JSON.stringify(done));renderWeeks();progress()}
function toggleStep(n){done2=done2.includes(n)?done2.filter(x=>x!==n):[...done2,n];localStorage.setItem("doneWeek2_3d",JSON.stringify(done2));renderSteps();progress()}
function progress(){let p=Math.round((done.length+done2.length)/(weeks.length+steps.length)*100);document.getElementById("progressText").textContent=p+"%";document.getElementById("progressFill").style.width=p+"%"}
function pickTheme(t){document.getElementById("chosenTheme").value=t}
function pickFormat(f){document.getElementById("chosenFormat").value=f}
function savePlan(){let plan={g:groupName.value,t:chosenTheme.value,f:chosenFormat.value};localStorage.setItem("plan3d",JSON.stringify(plan));planSaved.textContent=`✅ Plano salvo: ${plan.g||"Grupo"} • ${plan.t||"tema"} • ${plan.f||"jogo"}`}
function loadPlan(){let p=JSON.parse(localStorage.getItem("plan3d")||"{}");groupName.value=p.g||"";chosenTheme.value=p.t||"";chosenFormat.value=p.f||""}
function generatePrompt(){
 const asset=document.getElementById("asset").value, st=document.getElementById("style").value, colors=document.getElementById("colors").value;
 const theme=chosenTheme.value||"saúde reprodutiva, prevenção e autocuidado"; const game=chosenFormat.value||"PWA game educativo";
 promptOutput.value=`Crie uma imagem em formato 16:9 para ${asset} de um ${game} sobre ${theme}, voltado para pessoas idosas visitantes do MUDI. Visual ${st}, cores ${colors}, interface imersiva, botões grandes e macios, alto contraste, poucos textos, leitura fácil, aparência de aplicativo PWA moderno, educativo e acolhedor. Não usar conteúdo explícito; representar saúde, biologia, autocuidado e inclusão de forma respeitosa.`;
}
async function copyPrompt(){if(!promptOutput.value)generatePrompt();await navigator.clipboard.writeText(promptOutput.value);botSay("copiado")}
function goTo(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function toggleBot(){document.getElementById("chatbot").classList.toggle("open")}
function botSay(kind){
 document.getElementById("chatbot").classList.add("open");
 const answers={
 hoje:"Hoje a turma deve criar as imagens do jogo no Canva ou em IA. O foco é: público idoso, botões grandes, alto contraste, visual limpo, personagens guias e fundos para os jogos.",
 prompt:"Um bom prompt precisa dizer: tipo de imagem, tema, público idoso, estilo visual, cores, alto contraste, poucos textos e que será usado em um PWA Game.",
 libras:"Os intérpretes podem gravar vídeos curtos. No PWA, cada fase pode ter o botão 🤟 Libras, que abre o vídeo real. O mascote em desenho apenas orienta o usuário.",
 diferencial:"O aluno que participa desse projeto aprende Anatomia aplicada, extensão universitária, divulgação científica, acessibilidade, criação de games, IA, HTML, GitHub e PWA. Isso diferencia sua formação em Biologia porque ele não apenas estuda conteúdo: ele transforma ciência em tecnologia social para o público.",
 copiado:"Prompt copiado. Agora cole no Canva, ChatGPT Imagens, Gemini ou outra ferramenta de imagem."
 };
 chatBody.innerHTML += `<p><b>BioBot:</b> ${answers[kind]||answers.hoje}</p>`;
 chatBody.scrollTop=chatBody.scrollHeight;
}
let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e});
installBtn.addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}else alert("No celular, toque no menu do navegador e escolha Adicionar à tela inicial.")});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js"));
renderWeeks();renderThemes();renderSteps();loadPlan();progress();generatePrompt();
