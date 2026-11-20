/* 零点引擎新手友好阅读版。纯前端交互，不发送数据，不调用 AI。 */
(function () {
'use strict';
const $ = (id) => document.getElementById(id);
const configs = {
 copy: {name:'写一条经营文案',title:'先把产品介绍清楚',hint:'准备好真实产品信息，就可以开始写。',steps:[['整理信息','写下产品、读者和卖点。'],['请 AI 起草','把下方指令放进你常用的 AI 工具。'],['核对再发布','确认价格、事实和语气。']],tip:'提示词，就是你交给 AI 的任务说明。下面可以直接填写。',request:'写一条经营文案',format:'请给我一个标题和一段正文，语气自然，表达具体。'},
 video: {name:'做一条短视频',title:'先准备一份可拍摄的脚本',hint:'写清主题，再挑选你有授权的照片与视频。',steps:[['准备素材','选择清楚、有授权的产品图片与视频。'],['整理脚本','写明每个镜头拍什么、说什么。'],['制作与审核','查看零小剪介绍，核验能力后再制作。']],tip:'先在下方整理视频脚本指令。具体制作可在“工具选择”中了解零小剪。',request:'拟一份产品介绍短视频脚本',format:'请按“镜头画面、讲解文案、需要的素材”分项写出脚本。镜头安排应适合个人拍摄，避免依赖尚未确认的工具功能。'},
 live: {name:'准备一次直播',title:'先把直播前的准备做充分',hint:'从产品介绍和一次试播开始，提前安排人工值守。',steps:[['确定主题','确认产品资料、讲解内容与人员。'],['安排试播','检查环境、设备、话术与操作流程。'],['审核与复盘','人工值守，记录问题并及时调整。']],tip:'先在下方整理直播准备指令。具体工具可在“工具选择”中了解零小播。',request:'拟一份直播准备清单与讲解提纲',format:'请按“准备事项、讲解流程、试播检查、人工值守、结束复盘”组织内容。提醒我核对适用的平台规则，不假设可以无人值守。'}
};
let selected = 'copy';
let toastTimer;
function toast(message){ $('toast').textContent=message; $('toast').hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>{$('toast').hidden=true;},3500); }
function value(id, fallback){ return $(id).value.trim() || fallback; }
function promptText(){const c=configs[selected];return `请帮我为${value('business','[待补充：产品或服务]')}${c.request}。\n读者：${value('audience','[待补充：目标读者]')}。\n真实信息：${value('sellingPoint','[待补充：真实卖点与必要信息]')}\n\n${c.format}\n只使用我提供的信息；缺少的价格、地址和营业时间请标为“待补充”。不要编造优惠、客户评价或效果承诺。\n最后列出发布前需要我确认的信息。`; }
function updatePrompt(){ $('promptText').textContent=promptText(); }
function updateBrief(){
 const type=$('briefType').value;
 const checks=type==='物理 AI'?'设备型号与注册用途、使用人员与场所资质、配置与费用、供货及售后责任':type==='融合解决方案'?'业务流程、软硬件能力与接口、数据权限、交付里程碑、预算及各方责任':'适用版本、费用与用量、素材授权、人工审核、交付范围和支持方式';
 $('briefOutput').textContent=`我的需求清单

业务或机构：${value('briefBusiness','[请填写你的业务或机构]')}
关注业务：${type}
希望完成：${value('briefGoal','[请填写具体需求]')}
已有准备：${value('briefResources','[请填写现有工具、设备或待确认问题]')}

希望先确认：${checks}。

此清单仅在本页整理，尚未发送给任何联系人。`;
}
function chooseTask(key){if(!configs[key])return;selected=key;const c=configs[key];$('routeTitle').textContent=c.title;$('routeHint').textContent=c.hint;$('routeTip').textContent=c.tip;$('selectedTask').textContent=c.name;const list=$('routeSteps');list.replaceChildren();c.steps.forEach(([title,desc])=>{const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=title;li.append(strong,document.createTextNode(desc));list.append(li);});updatePrompt();}
document.querySelectorAll('input[name="task"]').forEach(el=>el.addEventListener('change',()=>chooseTask(el.value)));
$('promptForm').addEventListener('submit',e=>{e.preventDefault();updatePrompt();toast('指令已整理好，可以复制到 AI 工具中使用。');});
['business','audience','sellingPoint'].forEach(id=>$(id).addEventListener('input',()=>{updatePrompt();updateBrief();}));
$('resetExample').addEventListener('click',()=>{$('business').value='一家社区咖啡店';$('audience').value='附近工作、想在午休时喝杯咖啡的人';$('sellingPoint').value='介绍店里的现磨咖啡与安静座位。营业时间、地址和价格稍后由我补充。';updatePrompt();updateBrief();toast('已恢复咖啡店示例，保留当前任务选择。');});
let returnFocus=null;const backdropNodes=[document.querySelector('.topbar'),$('main'),document.querySelector('.footer')];
function manualCopy(text){returnFocus=document.activeElement;$('fallbackText').value=text;$('copyFallback').hidden=false;backdropNodes.forEach(el=>{el.inert=true;});$('fallbackText').focus();$('fallbackText').select();}
function closeCopy(){ $('copyFallback').hidden=true;backdropNodes.forEach(el=>{el.inert=false;});if(returnFocus) returnFocus.focus(); }
$('closeFallback').addEventListener('click',closeCopy);
$('copyFallback').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeCopy();}if(e.key==='Tab'){const first=$('fallbackText'),last=$('closeFallback');if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
async function copy(text){try{if(!navigator.clipboard||!window.isSecureContext)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(text);toast('已复制。粘贴前请再检查是否包含敏感信息。');}catch(_){const old=document.activeElement;const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;top:-9999px;left:-9999px';document.body.append(t);t.select();let done=false;try{done=document.execCommand('copy');}catch(_){}t.remove();if(old)old.focus();if(done)toast('已复制。可以粘贴到你要使用的工具中。');else manualCopy(text);}}
$('copyPrompt').addEventListener('click',()=>{updatePrompt();copy($('promptText').textContent);});
['briefBusiness','briefType','briefGoal','briefResources'].forEach(id=>$(id).addEventListener('input',updateBrief));
$('openBrief').addEventListener('click',()=>{$('briefDetails').open=true;updateBrief();$('briefBusiness').focus({preventScroll:true});});
document.querySelectorAll('[data-brief-type]').forEach(a=>a.addEventListener('click',()=>{$('briefDetails').open=true;$('briefType').value=a.dataset.briefType;updateBrief();}));
$('copyBrief').addEventListener('click',()=>{updateBrief();copy($('briefOutput').textContent);});
$('downloadBrief').addEventListener('click',()=>{updateBrief();const blob=new Blob(['\uFEFF'+$('briefOutput').textContent],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='我的AI应用需求清单.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('已发起文本下载，请查看浏览器下载列表。');});
const menu=$('navigation'),toggle=$('menuToggle');
function closeMenu(focus=false){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开导航菜单');if(focus)toggle.focus();}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.topbar'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();});
const tabs=Array.from(document.querySelectorAll('.story-tabs [role="tab"]'));
function setTab(tab,focus=false){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;$(t.getAttribute('aria-controls')).hidden=!active;});if(focus)tab.focus();}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>setTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();setTab(tabs[next],true);}});});
setTab($('tab-copy'));updatePrompt();updateBrief();
const navLinks=Array.from(menu.querySelectorAll('a'));
const categoryLinks=Array.from($('categoryNav').querySelectorAll('a'));
const header=document.querySelector('.topbar');
function syncHeader(){document.documentElement.style.setProperty('--header-offset',(header.getBoundingClientRect().height+16)+'px');}
syncHeader();if('ResizeObserver' in window)new ResizeObserver(syncHeader).observe(header);else window.addEventListener('resize',syncHeader);
function revealTarget(hash){let id;try{id=decodeURIComponent(hash.slice(1));}catch(_){return null;}const target=$(id);if(!target)return null;if(target.matches('details'))target.open=true;let parent=target.parentElement;while(parent){if(parent.matches('details'))parent.open=true;parent=parent.parentElement;}return target;}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>revealTarget(a.hash)));
function followHash(){const target=revealTarget(location.hash);if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));}
window.addEventListener('hashchange',()=>revealTarget(location.hash));if(location.hash)followHash();
let scheduled=false;
function updateScroll(){scheduled=false;const distance=document.documentElement.scrollHeight-window.innerHeight;$('readingProgress').style.width=(distance>0?Math.min(100,Math.max(0,window.scrollY/distance*100)):0)+'%';let current=null;for(const a of navLinks){const el=$(a.hash.slice(1));if(el&&el.getBoundingClientRect().top<=header.getBoundingClientRect().height+28)current=a;}navLinks.forEach(a=>{if(a===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});const marker=header.getBoundingClientRect().height+28;let active=null;categoryLinks.forEach(a=>{const target=$(a.hash.slice(1));if(!target)return;const rect=target.getBoundingClientRect();if(rect.top<=marker&&rect.bottom>marker)active=a;});categoryLinks.forEach(a=>{if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
/* Keep the static page usable if any earlier initialization fails. */
document.documentElement.classList.remove('no-js');
})();

// Image explanations are local only. Native dialog provides focus containment and Escape support.
(()=>{
 const viewer=document.getElementById('visualViewer');
 if(!viewer||typeof viewer.showModal!=='function')return;
 const host=document.getElementById('visualImageHost');let opener=null;
 document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  const source=button.querySelector('img');if(!source)return;
  opener=button;document.getElementById('visualTitle').textContent=source.alt;
  document.getElementById('visualCaption').textContent=button.closest('figure').querySelector('figcaption')?.textContent||'';
  const image=new Image();image.alt=source.alt;image.src=source.currentSrc||source.src;host.replaceChildren(image);
  viewer.showModal();document.getElementById('closeVisual').focus();
 }));
 document.getElementById('closeVisual').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('click',event=>{if(event.target!==viewer)return;const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();});
 viewer.addEventListener('close',()=>{host.replaceChildren();opener?.focus({preventScroll:true});});
})();

// 固定悬浮快捷按钮组：分享 / 返回顶部 / 客服帮助。纯前端，不发送数据。
(()=>{
 const dock=document.getElementById('floatDock');
 const shareBtn=document.getElementById('floatShare');
 const topBtn=document.getElementById('floatTop');
 const sheet=document.getElementById('shareSheet');
 const systemOpt=document.getElementById('shareSystem');
 if(!dock||!shareBtn||!topBtn||!sheet)return;

 // 复用页面现有 toast；缺失时退化为临时节点，保证交互有反馈
 let toastTimer;
 function notify(message){
   const box=document.getElementById('toast');
   if(box){box.textContent=message;box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{box.hidden=true;},3500);}
 }
 function copyText(text){
   if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(text);}
   return new Promise((resolve,reject)=>{
     const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');
     t.style.cssText='position:fixed;top:-9999px;left:-9999px';document.body.append(t);t.select();
     let ok=false;try{ok=document.execCommand('copy');}catch(_){}
     t.remove();ok?resolve():reject();
   });
 }

 // 面板开合 + 焦点管理
 function openSheet(){sheet.hidden=false;shareBtn.setAttribute('aria-expanded','true');const first=sheet.querySelector('.share-opt:not([hidden])');if(first)first.focus();}
 function closeSheet(returnFocus){if(sheet.hidden)return;sheet.hidden=true;shareBtn.setAttribute('aria-expanded','false');if(returnFocus)shareBtn.focus();}
 shareBtn.addEventListener('click',()=>{sheet.hidden?openSheet():closeSheet(true);});
 document.addEventListener('click',e=>{if(!dock.contains(e.target))closeSheet(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!sheet.hidden){e.preventDefault();closeSheet(true);}});
 // 面板内 Tab 循环
 sheet.addEventListener('keydown',e=>{
   if(e.key!=='Tab')return;
   const opts=Array.from(sheet.querySelectorAll('.share-opt:not([hidden])'));
   if(!opts.length)return;
   const first=opts[0],last=opts[opts.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 });

 // Web Share API 可用时显示“系统分享”，否则由复制链接兜底
 const canShare=typeof navigator.share==='function';
 if(canShare)systemOpt.hidden=false;

 const pageUrl=()=>location.href.split('#')[0];
 async function handleShare(kind){
   const url=pageUrl();
   closeSheet(true); // 点击任一方式后立即收起面板，避免异步等待期间面板滞留
   if(kind==='copy'){
     try{await copyText(url);notify('页面链接已复制。粘贴前请再检查是否包含敏感信息。');}
     catch(_){notify('自动复制未成功，请从地址栏手动复制页面链接。');}
   }else if(kind==='wechat'){
     // 微信无公开网页分享 URL，静态站也无法接入需后端签名的微信 JS-SDK。
     // 可行路径：复制链接 + 按环境引导用户完成分享。
     const inWechat=/MicroMessenger/i.test(navigator.userAgent);
     try{
       await copyText(url);
       notify(inWechat
         ?'链接已复制。点右上角「···」→「发送给朋友」即可分享给微信好友。'
         :'链接已复制。打开微信，粘贴给好友或分享到朋友圈即可。');
     }catch(_){
       notify(inWechat
         ?'请点右上角「···」→「发送给朋友」分享本页。'
         :'请从地址栏复制页面链接，再粘贴到微信发送给好友。');
     }
   }else if(kind==='system'&&canShare){
     try{await navigator.share({title:document.title,url});}
     catch(err){if(err&&err.name!=='AbortError')notify('系统分享未成功，可改用复制链接。');}
   }
 }
 sheet.querySelectorAll('.share-opt').forEach(btn=>btn.addEventListener('click',()=>handleShare(btn.dataset.share)));

 // 返回顶部：平滑滚动（尊重减少动态效果）
 topBtn.addEventListener('click',()=>{
   const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   try{window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});}
   catch(_){window.scrollTo(0,0);}
 });
})();
