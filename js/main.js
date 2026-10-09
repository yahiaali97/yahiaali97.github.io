(function(){var m=null;try{m=localStorage.getItem('yahia-theme')}catch(e){}document.documentElement.setAttribute('data-theme',m==='dark'?'dark':'light')})();
/* theme toggle (light by default) */
(function(){
  var root=document.documentElement,b=document.getElementById('theme'),saved=null;
  try{saved=localStorage.getItem('yahia-theme')}catch(e){}
  function apply(m){root.setAttribute('data-theme',m);b.setAttribute('aria-label',m==='light'?'Switch to dark mode':'Switch to light mode')}
  apply(saved==='dark'?'dark':'light');
  b.addEventListener('click',function(){
    var m=root.getAttribute('data-theme')==='light'?'dark':'light';apply(m);
    try{localStorage.setItem('yahia-theme',m)}catch(e){}
  });
})();
/* copy buttons */
(function(){
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-copy'),t=b.previousElementSibling;
      function sel(){try{var r=document.createRange();r.selectNodeContents(t);var s=window.getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected'}catch(e){}}
      try{navigator.clipboard.writeText(v).then(function(){b.textContent='Copied'},sel)}catch(e){sel()}
      setTimeout(function(){b.textContent='Copy'},2000);
    });
  });
})();
/* projects with show more */
(function(){
  var I={web:'<path d="M3 5h18v12H3zM8 21h8M12 17v4"/>',mobile:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',both:'<rect x="2" y="5" width="13" height="10" rx="1"/><rect x="16" y="8" width="6" height="12" rx="1.5"/><path d="M6 19h6"/>',desktop:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'};
  var P=[
    ["Transaction Hub","Order management platform that reads orders from a mailbox, extracts data with OCR, applies customer-specific business rules and integrates with SAP.",["Web","Order management","OCR","SAP"],"web","--blue"],
    ["SDS Supplier","",["AI","OCR","Web API"],"web","--orange"],
    ["Kaizr","Food delivery ecosystem with separate customer, merchant and driver apps.",["Mobile","Food delivery","3 apps"],"mobile","--orange"],
    ["CFM-HR","HR attendance platform.",["Web","Mobile","HR attendance"],"both","--green"],
    ["Customer Portal","E-commerce platform.",["Web","E-commerce"],"web","--pink"],
    ["Sodic","Facility maintenance management system.",["Web","Mobile","Facility maintenance"],"both","--teal"],
    ["Leeds","Facility maintenance management system.",["Web","Mobile","Facility maintenance"],"both","--teal"],
    ["RED","Real estate brokerage platform.",["Web","Real estate"],"web","--yellow"],
    ["Wealth Karma","Financial advisory and consulting app.",["Mobile","Finance"],"mobile","--green"],
    ["Saytra","Inventory and stock control management app.",["Mobile","Inventory"],"mobile","--blue"],
    ["EPlus Pharmacy","Pharmaceutical inventory management platform.",["Desktop","Pharmacy","Inventory"],"desktop","--pink"]
  ];
  var SHOW=3,list=document.getElementById('proj-list'),btn=document.getElementById('proj-more'),open=false;
  function render(){
    list.textContent='';
    P.forEach(function(p,i){
      if(!open&&i>=SHOW)return;
      var d=document.createElement('div');d.className='proj'+(i>=SHOW?' extra':'');
      d.innerHTML='<div class="pic"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true" style="stroke:var('+p[4]+')">'+I[p[3]]+'</svg></div>';
      var body=document.createElement('div'),h=document.createElement('h3'),t=document.createElement('p'),tg=document.createElement('div');
      h.textContent=p[0];t.textContent=p[1];if(!p[1])t.hidden=true;tg.className='tags';
      p[2].forEach(function(x){var s=document.createElement('span');s.textContent=x;tg.appendChild(s)});
      body.appendChild(h);body.appendChild(t);body.appendChild(tg);d.appendChild(body);list.appendChild(d);
    });
    btn.setAttribute('aria-expanded',String(open));
    btn.innerHTML=open?'Show less <span aria-hidden="true">↑</span>':'Show more ('+(P.length-SHOW)+') <span aria-hidden="true">↓</span>';
  }
  btn.addEventListener('click',function(){open=!open;render();if(!open)document.getElementById('projects').scrollIntoView({block:'nearest'})});
  render();
})();
/* scroll effects: progress bar, reveals, counters, marquee, statement, process line, nav */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar=document.getElementById('progress');
  /* statement words */
  var wp=document.getElementById('words'),words=[];
  (function split(node){
    Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType===3){
        var f=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function(w){
          if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}
          var sp=document.createElement('span');sp.className='w'+(node.tagName==='EM'?' hl':'');sp.textContent=w;f.appendChild(sp);words.push(sp);
        });
        node.replaceChild(f,n);
      }else split(n);
    });
  })(wp);
  wp.querySelectorAll('em').forEach(function(e){e.style.fontStyle='normal'});
  var steps=document.getElementById('steps'),stepLis=steps.querySelectorAll('li');
  var heroText=document.querySelector('.hero>div');
  function prog(el,startFrac,endFrac){var r=el.getBoundingClientRect(),vh=window.innerHeight;return Math.max(0,Math.min(1,(vh*startFrac-r.top)/(r.height+vh*(startFrac-endFrac))))}
  function onScroll(){
    var y=window.pageYOffset,max=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.transform='scaleX('+(max>0?y/max:0)+')';
    if(reduce){words.forEach(function(w){w.classList.add('on')});stepLis.forEach(function(l){l.classList.add('on')});steps.style.setProperty('--fill',1);return}
    if(heroText)heroText.style.transform='translateY('+Math.min(y*0.12,120)+'px)';
    var p=prog(wp,0.85,0.35),n=Math.round(p*words.length);
    words.forEach(function(w,k){w.classList.toggle('on',k<n)});
    var ps=prog(steps,0.75,0.45);steps.style.setProperty('--fill',ps.toFixed(3));
    stepLis.forEach(function(l,k){l.classList.toggle('on',ps>=k/(stepLis.length-1)-0.02)});
  }
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);onScroll();

  /* counters */
  function count(b){
    var to=+b.getAttribute('data-count'),suf=b.getAttribute('data-suffix')||'';
    if(reduce){b.textContent=to+suf;return}
    var t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1200);b.textContent=Math.round(to*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)})(t0);
  }
  /* reveals: only items below the first screen start hidden */
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){
      if(!e.isIntersecting)return;e.target.classList.remove('pre');io.unobserve(e.target);
      e.target.querySelectorAll&&e.target.querySelectorAll('[data-count]').forEach(count);
    })},{threshold:0.12});
    document.querySelectorAll('.rv').forEach(function(el){
      if(el.getBoundingClientRect().top>window.innerHeight*0.95){el.classList.add('pre');io.observe(el)}
      else el.querySelectorAll('[data-count]').forEach(count);
    });
    setTimeout(function(){document.querySelectorAll('.rv.pre').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0)el.classList.remove('pre')})},4000);
  }
  /* nav highlight */
  var links=document.querySelectorAll('.nav a');
  if('IntersectionObserver' in window){
    var nio=new IntersectionObserver(function(en){en.forEach(function(e){
      if(!e.isIntersecting)return;var id=e.target.getAttribute('data-nav')||e.target.id;
      links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+id)});
    })},{rootMargin:'-45% 0px -50% 0px'});
    var hero=document.querySelector('.hero');if(hero){hero.setAttribute('data-nav','home');nio.observe(hero)}
    ['about','skills','process','experience','projects','contact'].forEach(function(id){var el=document.getElementById(id);if(el)nio.observe(el)});
  }
})();
/* certificates with see more */
(function(){
  var C=[
    /* [name, issuer, credential ID, verify URL, issued] — paste each "Show credential" link into the 4th slot */
    ["Certified Mobile Application Tester (CTFL-MAT)","ISTQB® – International Software Testing Qualifications Board","240214037","","Issued Feb 2024"],
    ["Certified Tester Foundation Level (CTFL)","ISTQB® – International Software Testing Qualifications Board","230222039","","Issued Mar 2023"],
    ["Selenium WebDriver","QAcart","","",""],
    ["Azure DevOps Server / TFS","Udemy","","",""],
    ["Certificate of completion SQL","QAcart","","",""],
    ["SQL Fundamentals","Sololearn","CT-U7E7JZD7","",""],
    ["Software Testing Bootcamp","Udemy","","",""],
    ["Testing Foundations Track","egFWD","KQSDX4PD","",""],
    ["Effective Test Case and Bug Report Writing Techniques","MaharaTech – ITIMooca","","",""]
  ];
  var SHOW=3,list=document.getElementById('cert-list'),btn=document.getElementById('cert-more'),open=false;
  var ICON='<div class="pic"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true" style="stroke:var(--yellow)"><circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 8 5-3 5 3-1.5-8"/></svg></div>';
  function render(){
    list.textContent='';
    C.forEach(function(c,i){
      if(!open&&i>=SHOW)return;
      var d=document.createElement('div');d.className='note'+(i>=SHOW?' extra':'');d.innerHTML=ICON;
      var b=document.createElement('div');b.className='cert';
      var h=document.createElement('h3');h.textContent=c[0];b.appendChild(h);
      var p=document.createElement('p');p.textContent=c[1]+(c[4]?' · '+c[4]:'');b.appendChild(p);
      if(c[2]){var sm=document.createElement('small');sm.textContent='Credential ID '+c[2];b.appendChild(sm)}
      if(c[3]){var a=document.createElement('a');a.className='verify';a.href=c[3];a.target='_blank';a.rel='noopener';a.textContent='Verify ↗';b.appendChild(a)}
      d.appendChild(b);list.appendChild(d);
    });
    btn.hidden=C.length<=SHOW;
    btn.setAttribute('aria-expanded',String(open));
    btn.innerHTML=open?'See less <span aria-hidden="true">↑</span>':'See more ('+(C.length-SHOW)+') <span aria-hidden="true">↓</span>';
  }
  btn.addEventListener('click',function(){open=!open;render()});
  render();
})();
/* skills list */
(function(){
  var SKILLS=[["Selenium · TestNG",5,"blue"],["SQL / SQL Server",5,"blue"],
    ["Playwright (UI + API)",5,"blue"],["Swagger & Postman",5,"blue"],["JIRA & Azure DevOps",5,"blue"],["Test case writing",5,"blue"],["Bug reporting",5,"blue"],
    ["REST Assured",3,"green"],["JMeter",3,"green"],["Git & GitHub",3,"green"]];
  var sl=document.getElementById('skill-list');
  SKILLS.forEach(function(s){
    var li=document.createElement('li'),n=document.createElement('span'),p=document.createElement('span');
    n.textContent=s[0];p.className='pips k-'+s[2];p.setAttribute('role','img');p.setAttribute('aria-label',s[1]+' out of 5');
    for(var i=0;i<5;i++){var b=document.createElement('i');if(i<s[1])b.className='f';p.appendChild(b)}
    li.appendChild(n);li.appendChild(p);sl.appendChild(li);
  });
})();

/* hero: 3D bugs that follow the mouse */
(function(){
  if(!window.THREE)return;
  var cvs=document.getElementById('bugs'),hero=cvs.parentNode,renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:cvs,antialias:true,alpha:true})}catch(e){return}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setClearColor(0x000000,0);
  var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,2,0.1,100);camera.position.set(0,0,16);
  scene.add(new THREE.HemisphereLight(0xFFF8EA,0x2a2118,0.9));
  var kl=new THREE.DirectionalLight(0xffffff,0.9);kl.position.set(-4,6,8);scene.add(kl);

  var DARK=new THREE.MeshStandardMaterial({color:0x2E2822,roughness:.45,metalness:.1});
  var EYE=new THREE.MeshBasicMaterial({color:0xFFF8EA});
  function makeBug(color){
    var bug=new THREE.Group(),shell=new THREE.MeshStandardMaterial({color:color,roughness:.28,metalness:.05});
    var body=new THREE.Mesh(new THREE.SphereGeometry(0.62,28,20),shell);body.scale.set(0.82,0.55,1);bug.add(body);
    var seam=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.03,1.1),DARK);seam.position.set(0,0.34,-0.05);bug.add(seam);
    [[0.24,0.27,0.08],[-0.24,0.27,0.08],[0.2,0.26,-0.32],[-0.2,0.26,-0.32]].forEach(function(p){
      var s=new THREE.Mesh(new THREE.SphereGeometry(0.1,12,8),DARK);s.scale.set(1,0.35,1);s.position.set(p[0],p[1],p[2]);bug.add(s);
    });
    var head=new THREE.Mesh(new THREE.SphereGeometry(0.3,20,14),DARK);head.position.set(0,0.05,0.62);bug.add(head);
    [-0.12,0.12].forEach(function(x){
      var e=new THREE.Mesh(new THREE.SphereGeometry(0.065,10,8),EYE);e.position.set(x,0.16,0.84);bug.add(e);
      var a=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,0.5,6),DARK);a.position.set(x*1.6,0.36,0.86);a.rotation.set(0.7,0,x*-3);bug.add(a);
      var tip=new THREE.Mesh(new THREE.SphereGeometry(0.05,8,6),shell);tip.position.set(x*2.6,0.55,1.02);bug.add(tip);
    });
    var legs=[];
    [-0.3,0,0.3].forEach(function(z){[-1,1].forEach(function(side){
      var pivot=new THREE.Group();pivot.position.set(side*0.4,-0.08,z);
      var leg=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,0.55,6),DARK);leg.position.set(side*0.22,-0.1,0);leg.rotation.z=side*1.05;
      pivot.add(leg);bug.add(pivot);legs.push({p:pivot,side:side});
    })});
    bug.userData.legs=legs;return bug;
  }
  /* positions in normalized screen space, kept around the edges so text stays readable */
  var SPOTS=[[-0.92,0.78,-1],[-0.42,0.9,-3],[0.12,0.86,-2],[0.95,0.6,0],[-0.95,-0.1,-2],[0.55,-0.88,-1],[-0.6,-0.86,0],[0.18,-0.92,-4],[0.98,-0.35,-3]];
  var COLORS=[0xFF6A2C,0x4C93FF,0xFFB81C,0x3CCB5A,0xFF4D94,0x25C7BA,0xFF6A2C,0xFFB81C,0x4C93FF];
  var bugs=[];
  SPOTS.forEach(function(s,i){
    var b=makeBug(COLORS[i]);var sc=0.85+((i*37)%10)/22;b.userData.base=sc;b.scale.setScalar(sc);
    b.userData.spot=s;b.userData.seed=i*1.7;b.userData.yaw=(i*1.3)%6.28;
    scene.add(b);bugs.push(b);
  });
    function layout(){
    var w=hero.clientWidth,h=hero.clientHeight+10;if(!w||!h)return;
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    var narrow=w<760,MOB={3:[0.9,0.46,0],8:[0.88,-0.05,-2],5:[0.82,-0.6,-1],4:[-0.88,-0.5,-2]};
    bugs.forEach(function(b,i){
      var s=narrow?MOB[i]:b.userData.spot;
      b.visible=!!s;if(!s)return;
      var z=s[2],d=camera.position.z-z,hh=Math.tan(camera.fov*Math.PI/360)*d,hw=hh*camera.aspect;
      b.userData.home=new THREE.Vector3(s[0]*hw*0.94,s[1]*hh*0.9,z);b.position.copy(b.userData.home);
      b.scale.setScalar(b.userData.base*(narrow?Math.max(0.42,w/900):1));
    });
  }
  layout();
  if(window.ResizeObserver){new ResizeObserver(layout).observe(hero)}else{window.addEventListener('resize',layout)}
  var mx=0,my=0,tx=0,ty=0;
  window.addEventListener('pointermove',function(e){tx=(e.clientX/window.innerWidth-.5)*2;ty=(e.clientY/window.innerHeight-.5)*2},{passive:true});
  var visible=true;
  if(window.IntersectionObserver){new IntersectionObserver(function(en){visible=en[0].isIntersecting}).observe(hero)}
  var clock=new THREE.Clock(),time=0;
  function frame(){
    requestAnimationFrame(frame);var dt=Math.min(clock.getDelta(),0.05);
    if(!visible)return;
    if(!reduce)time+=dt;
    mx+=(tx-mx)*0.04;my+=(ty-my)*0.04;
    bugs.forEach(function(b,i){
      var u=b.userData,h=u.home;if(!h||!b.visible)return;
      var depth=1+(-h.z)*0.25;
      b.position.x=h.x+mx*0.55*depth+Math.sin(time*0.6+u.seed)*0.25;
      b.position.y=h.y-my*0.4*depth+Math.sin(time*0.9+u.seed)*0.2+window.pageYOffset*0.006*depth;
      b.rotation.y=u.yaw+Math.sin(time*0.4+u.seed)*0.5+mx*0.6;
      b.rotation.x=0.9+my*0.35+Math.sin(time*0.7+u.seed)*0.12;
      b.rotation.z=Math.sin(time*0.5+u.seed)*0.25;
      u.legs.forEach(function(l,k){l.p.rotation.x=Math.sin(time*9+k*1.6+u.seed)*0.35});
    });
    renderer.render(scene,camera);
  }
  requestAnimationFrame(frame);
})();

/* experience: 3D journey with stations */
(function(){
  /* ---------- journey data (edit here) ---------- */
  var ST=[
    {id:"helwan",year:"2016",range:"Sep 2016 – Jan 2021",name:"Helwan University",role:"B.Sc. Computers & AI",color:"#25C7BA",
     lines:["Faculty of Computers and Artificial Intelligence","Major: Information Systems","Graduation project: Job Portal Board (grade A+)"]},
    {id:"bconnect",year:"2023",range:"Jun 2023 – Oct 2024",name:"B-Connect",role:"Software Tester",color:"#FF4D94",
     lines:["Analyze and review software requirements","Develop and execute manual test cases for desktop and mobile apps","Report and follow up on defects using Azure DevOps","API testing using Postman"]},
    {id:"bit68",year:"2024",range:"Nov 2024 – Feb 2026",name:"Bit68",role:"Software Quality Control Engineer",color:"#FF6A2C",
     lines:["Review and understand the business documents","Review user stories against business objectives and functional requirements","Define inputs, outputs and acceptance criteria","Create detailed test cases using Excel sheets and BrowserStack","Execute the test cases","Verify against UI/UX designs (Figma), browser compatibility and responsiveness","Test APIs using Swagger and Postman","Report bugs clearly and specifically in JIRA","Functional and UI testing on web and mobile apps (Android & iOS)","Continuous regression testing","Work with project managers and developers to refine acceptance criteria","Test automation using Selenium, TestNG and Allure Report"]},
    {id:"siegwerk",year:"2026",range:"Mar 2026 – Present",name:"Siegwerk",role:"QA & Test Automation Engineer",color:"#4C93FF",
     lines:["Create comprehensive test cases in Azure DevOps","Manual and automated testing: functional, regression and integration","Identify, document and track defects, and work with developers to resolve them","Validate data using SQL Server to ensure data integrity","Testing Transaction Hub and MasterHub"],link:true}
  ];
  var LAST=ST.length-1,M=ST.length+2;
  function $(id){return document.getElementById(id)}
  function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function smooth(x){return x*x*(3-2*x)}
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  var jny=$('jny'),jcv=$('jcv'),rail=$('jrail'),panel=$('jpanel'),slider=$('jr'),ticks=$('jticks');
  var scroller=$('jscroll'),sticky=$('jsticky');
  var hudN=$('jn'),hudR=$('jrange'),prevB=$('jprev'),nextB=$('jnext'),hint=$('jhint');
  var gl=true,pTarget=0,pCur=0,active=-1,sliderDown=false;

  /* ---------- scroll drives the journey; each station holds for a moment ---------- */
  function range(){
    var r=scroller.getBoundingClientRect();
    return {top:r.top+window.pageYOffset,rectTop:r.top,total:Math.max(1,scroller.offsetHeight-sticky.offsetHeight)};
  }
  function pFromScroll(){
    var s=range(),f=clamp(-s.rectTop/s.total,0,1);
    var u=clamp(f*(LAST+0.5)-0.25,0,LAST),i=Math.floor(u),fr=u-i;
    if(i>=LAST)return LAST;
    return i+(fr<0.25?0:fr>0.75?1:smooth((fr-0.25)/0.5));
  }
  function scrollToP(p,instant){
    var s=range(),f=(clamp(p,0,LAST)+0.25)/(LAST+0.5);
    window.scrollTo({top:Math.round(s.top+f*s.total),behavior:(instant||reduce)?'auto':'smooth'});
  }

  /* ---------- UI that works with or without WebGL ---------- */
  var railBtns=[],tickBtns=[];
  ST.forEach(function(s,i){
    var li=el('li');li.style.setProperty('--sc',s.color);
    var b=el('button');b.type='button';b.setAttribute('aria-label',s.year+' – '+s.name);
    b.appendChild(el('span','yr',s.year));b.appendChild(el('i','dot'));
    b.addEventListener('click',function(){go(i)});li.appendChild(b);rail.appendChild(li);railBtns.push(b);
    var t=el('button',null,s.year);t.type='button';t.style.left=(i/LAST*100)+'%';
    t.addEventListener('click',function(){go(i)});ticks.appendChild(t);tickBtns.push(t);
  });
  function renderPanel(s){
    panel.textContent='';
    panel.appendChild(el('div','pm',s.range));
    panel.appendChild(el('h3',null,s.name));
    panel.appendChild(el('div','pr',s.role));
    var ul=el('ul');s.lines.forEach(function(l){ul.appendChild(el('li',null,l))});panel.appendChild(ul);
    if(s.link){var a=el('a','btn yellow','Get in touch ↗');a.href='#contact';panel.appendChild(a)}
  }
  function setActive(i){
    active=i;var s=ST[i];
    railBtns.forEach(function(b,k){b.setAttribute('aria-current',k===i?'true':'false')});
    tickBtns.forEach(function(b,k){b.setAttribute('aria-current',k===i?'true':'false')});
    hudN.textContent=String(i+1);hudR.textContent=s.range;
    jny.style.setProperty('--sc',s.color);
    prevB.disabled=(i===0);nextB.disabled=(i===LAST);
    renderPanel(s);
  }
  function refresh(){
    var ai=Math.round(pCur);if(ai!==active)setActive(ai);
    var f=pCur/LAST;
    rail.style.setProperty('--prog',f.toFixed(4));
    slider.style.setProperty('--fill',(f*100).toFixed(2)+'%');
    if(!sliderDown)slider.value=String(pCur);
  }
  function go(i){scrollToP(clamp(i,0,LAST))}
  function next(){var i=Math.round(pTarget);go(i>=LAST?0:i+1)}
  prevB.addEventListener('click',function(){go(Math.round(pTarget)-1)});
  nextB.addEventListener('click',function(){go(Math.round(pTarget)+1)});
  window.addEventListener('scroll',function(){
    pTarget=pFromScroll();if(!gl||reduce)pCur=pTarget;refresh();
    if(pTarget>0.05)hint.style.opacity='0';
  },{passive:true});
  slider.addEventListener('pointerdown',function(){sliderDown=true});
  slider.addEventListener('input',function(){scrollToP(parseFloat(slider.value)||0,true)});
  slider.addEventListener('change',function(){sliderDown=false;go(Math.round(parseFloat(slider.value)||0))});
  slider.addEventListener('blur',function(){sliderDown=false});
  jcv.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='Enter'||e.key===' '){next();e.preventDefault()}
    if(e.key==='ArrowLeft'){go(Math.round(pTarget)-1);e.preventDefault()}
  });
  pTarget=pCur=pFromScroll();setActive(Math.round(pCur));refresh();

  /* ---------- three.js journey ---------- */
  function noGL(){gl=false;$('nogl').style.display='block';hint.style.display='none'}
  if(!window.THREE){noGL();return}
  var renderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true})}catch(e){noGL();return}
  var BG=0x12100D,CREAM=0xFFF8EA;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setClearColor(BG,1);
  var cv=renderer.domElement;jcv.insertBefore(cv,jcv.firstChild);

  var scene=new THREE.Scene();
  scene.fog=new THREE.Fog(BG,14,88);
  var BASE_FOV=52,camera=new THREE.PerspectiveCamera(BASE_FOV,1.6,0.1,220);

  var V=function(x,y,z){return new THREE.Vector3(x,y,z)};
  var curve=new THREE.CatmullRomCurve3([V(2.4,1,19),V(0,0,0),V(-9,2.2,-17),V(7.5,-1.6,-35),V(-5,2.6,-54),V(0,.5,-70)],false,'catmullrom',0.5);
  function tOf(i){return (i+1)/(M-1)}
  var LAG=0.13;

  /* stars (grow while flying) */
  var NS=1500,sp=new Float32Array(NS*3);
  for(var i=0;i<NS;i++){sp[i*3]=(Math.random()-.5)*96;sp[i*3+1]=(Math.random()-.5)*54;sp[i*3+2]=22-Math.random()*118}
  var sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
  var starMat=new THREE.PointsMaterial({color:CREAM,size:0.16,sizeAttenuation:true,transparent:true,opacity:.8});
  var stars=new THREE.Points(sg,starMat);scene.add(stars);

  /* path: dim line + lit line that fills as you travel */
  var SEG=400;
  var pathPts=curve.getPoints(SEG);
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPts),new THREE.LineBasicMaterial({color:CREAM,transparent:true,opacity:.28})));
  var litGeo=new THREE.BufferGeometry().setFromPoints(pathPts),litPerSeg=1;
  var litMat=new THREE.LineBasicMaterial({color:0xFF6A2C});
  scene.add(new THREE.Line(litGeo,litMat));
  /* beads along the track */
  var beadPts=curve.getPoints(160);
  scene.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(beadPts),new THREE.PointsMaterial({color:CREAM,size:0.09,transparent:true,opacity:.5})));

  /* soft glow texture */
  var glowTex=(function(){var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d');
    var gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.35,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();

  /* stations: a ring portal you fly through */
  var stations=[],hitTargets=[];
  ST.forEach(function(s,i){
    var t=tOf(i),P=curve.getPoint(t),tan=curve.getTangent(t).normalize(),col=new THREE.Color(s.color);
    var g=new THREE.Group();g.position.copy(P);g.lookAt(P.clone().add(tan));scene.add(g);
    var ring=new THREE.Mesh(new THREE.TorusGeometry(1.9,0.17,14,64),new THREE.MeshBasicMaterial({color:col}));g.add(ring);
    var ring2=new THREE.Mesh(new THREE.TorusGeometry(2.8,0.045,8,90),new THREE.MeshBasicMaterial({color:CREAM,transparent:true,opacity:.55}));g.add(ring2);
    var core=new THREE.Mesh(new THREE.SphereGeometry(0.5,24,16),new THREE.MeshBasicMaterial({color:CREAM}));g.add(core);
    var hit=new THREE.Mesh(new THREE.CircleGeometry(2.2,24),new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide}));hit.userData.i=i;g.add(hit);hitTargets.push(hit);
    var glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:col,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false}));
    glow.scale.set(9,9,1);glow.position.copy(P);scene.add(glow);
    var right=new THREE.Vector3().crossVectors(tan,V(0,1,0)).normalize();
    var camAt=curve.getPoint(Math.max(0,t-LAG));camAt.y+=2.6;
    stations.push({ring:ring,ring2:ring2,core:core,glow:glow,P:P,tan:tan,right:right,camAt:camAt,card:null,base:new THREE.Vector3()});
  });

  /* ---------- station cards: year + a framed picture ---------- */
  function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
  function txt(g,s,x,y,font,color,align){g.font=font;g.fillStyle=color;g.textAlign=align||'left';g.fillText(s,x,y)}
  var MONO='"DM Mono",Menlo,monospace',SANS='"DM Sans",system-ui,sans-serif';
  function chrome(g,W,title,dark){
    g.fillStyle=dark?'#211C17':'#E6DFD3';g.fillRect(0,0,W,44);
    ['#FF5F57','#FEBC2E','#28C840'].forEach(function(c,k){g.fillStyle=c;g.beginPath();g.arc(26+k*24,22,7,0,7);g.fill()});
    txt(g,title,W/2,29,'500 18px '+MONO,dark?'#B9AE98':'#5E5547','center');
  }
  function chip(g,x,y,label,bg,fg){g.font='700 16px '+SANS;var w=g.measureText(label).width+24;g.fillStyle=bg;rr(g,x,y,w,28,14);g.fill();txt(g,label,x+12,y+19,'700 16px '+SANS,fg);return w}
  var SHOTS={
    helwan:function(g,W,H,c){
      g.fillStyle='#F7F3EC';g.fillRect(0,0,W,H);chrome(g,W,'job-portal-board / schema.erd');
      g.fillStyle='#EFE8DC';g.fillRect(0,44,190,H-44);
      ['schema.erd','users.sql','jobs.sql','applications.sql','README.md'].forEach(function(f,k){
        if(k===0){g.fillStyle='rgba(37,199,186,.18)';g.fillRect(0,62,190,36)}
        txt(g,f,22,86+k*40,'500 17px '+MONO,'#3A332B')});
      function ent(x,y,name,fields){
        g.fillStyle='#fff';rr(g,x,y,230,40+fields.length*30,14);g.fill();g.strokeStyle='#2E2822';g.lineWidth=2;g.stroke();
        g.fillStyle=c;rr(g,x,y,230,40,14);g.fill();g.fillRect(x,y+26,230,14);
        txt(g,name,x+16,y+28,'700 19px '+SANS,'#17130F');
        fields.forEach(function(f,k){txt(g,f,x+16,y+66+k*30,'500 16px '+MONO,'#3A332B')});
      }
      g.strokeStyle='#2E2822';g.lineWidth=2.5;g.setLineDash([8,6]);
      g.beginPath();g.moveTo(450,150);g.lineTo(580,150);g.moveTo(340,250);g.lineTo(480,330);g.moveTo(690,250);g.lineTo(600,330);g.stroke();g.setLineDash([]);
      ent(220,80,'Users',['id  PK','name','email']);
      ent(580,80,'Jobs',['id  PK','title','company']);
      ent(400,300,'Applications',['user_id  FK','job_id  FK']);
      g.fillStyle=c;g.beginPath();g.arc(806,400,52,0,7);g.fill();g.strokeStyle='#17130F';g.lineWidth=4;g.stroke();
      txt(g,'A+',806,416,'44px "Bowlby One","Arial Black",sans-serif','#17130F','center');
    },
    bconnect:function(g,W,H,c){
      g.fillStyle='#F7F3EC';g.fillRect(0,0,W,H);chrome(g,W,'Test Cases · Release 3.2');
      var cols=[24,140,470,740];
      g.fillStyle='#E9E1D4';g.fillRect(0,58,W,40);
      ['ID','Scenario','Expected result','Status'].forEach(function(h,k){txt(g,h,cols[k],84,'700 17px '+SANS,'#3A332B')});
      var rows=[['TC-101','Login with a valid user','Dashboard opens','PASS'],['TC-102','Login with wrong password','Error message shown','PASS'],
        ['TC-103','Export report to PDF','File downloads','FAIL'],['TC-104','Sync offline orders','Orders appear','PASS'],['TC-105','Switch app language','UI text changes','BLOCKED']];
      rows.forEach(function(r,k){
        var y=98+k*50;if(k%2){g.fillStyle='#F0EADF';g.fillRect(0,y,W,50)}
        txt(g,r[0],cols[0],y+32,'500 16px '+MONO,'#5E5547');txt(g,r[1],cols[1],y+32,'500 17px '+SANS,'#17130F');txt(g,r[2],cols[2],y+32,'500 17px '+SANS,'#3A332B');
        var st={PASS:['#D7F5DE','#1E7D35'],FAIL:['#FFD9DE','#C2183A'],BLOCKED:['#FFF0C7','#8A6100']}[r[3]];chip(g,cols[3],y+11,r[3],st[0],st[1]);
      });
      g.fillStyle='#1D1914';rr(g,24,372,W-48,84,16);g.fill();
      chip(g,44,400,'GET',c,'#17130F');
      txt(g,'/api/v1/orders?status=pending',112,420,'500 18px '+MONO,'#FFF8EA');
      txt(g,'200 OK · 184 ms',W-48,420,'500 18px '+MONO,'#3CCB5A','right');
    },
    bit68:function(g,W,H,c){
      g.fillStyle='#F7F3EC';g.fillRect(0,0,W,H);chrome(g,W,'Sprint 14 · Mobile QA');
      function phone(x,label){
        g.fillStyle='#1D1914';rr(g,x,64,200,400,30);g.fill();
        g.fillStyle='#FFFFFF';rr(g,x+10,74,180,380,22);g.fill();
        g.fillStyle=c;rr(g,x+10,74,180,56,22);g.fill();g.fillRect(x+10,110,180,20);
        txt(g,label,x+100,108,'700 16px '+SANS,'#17130F','center');
        for(var k=0;k<3;k++){g.fillStyle='#EFE8DC';rr(g,x+24,146+k*76,152,62,12);g.fill();g.fillStyle='#D8CFBF';rr(g,x+34,158+k*76,46,38,8);g.fill();g.fillRect(x+90,164+k*76,72,8);g.fillRect(x+90,180+k*76,50,8)}
        g.fillStyle=c;rr(g,x+24,384,152,46,14);g.fill();txt(g,'Checkout',x+100,413,'700 16px '+SANS,'#17130F','center');
      }
      phone(40,'Android');phone(280,'iOS');
      g.strokeStyle='#E5153A';g.lineWidth=5;g.beginPath();g.ellipse(380,407,98,40,0,0,7);g.stroke();
      chip(g,412,342,'BUG','#E5153A','#FFFFFF');
      g.fillStyle='#FFFFFF';rr(g,530,74,350,300,18);g.fill();g.strokeStyle='#2E2822';g.lineWidth=2;g.stroke();
      txt(g,'BUG-142',552,112,'500 17px '+MONO,'#5E5547');
      txt(g,'Checkout button cut off',552,150,'700 22px '+SANS,'#17130F');
      txt(g,'on iOS small screens',552,180,'700 22px '+SANS,'#17130F');
      var x=552;x+=chip(g,x,204,'High','#FFD9DE','#C2183A')+8;x+=chip(g,x,204,'iOS','#E9E1D4','#3A332B')+8;chip(g,x,204,'UI','#E9E1D4','#3A332B');
      [['Figma match','✓','#1E7D35'],['Android','✓','#1E7D35'],['iOS','✗','#C2183A']].forEach(function(r,k){
        txt(g,r[0],552,276+k*32,'500 18px '+SANS,'#3A332B');txt(g,r[1],856,276+k*32,'700 20px '+SANS,r[2],'right')});
      txt(g,'Selenium · TestNG · Allure',705,420,'500 18px '+MONO,'#5E5547','center');
    },
    siegwerk:function(g,W,H,c){
      g.fillStyle='#15120F';g.fillRect(0,0,W,H);chrome(g,W,'transaction-hub-tests',true);
      var L=[['$ npx playwright test','#FFF8EA'],['Running 24 tests using 4 workers','#B9AE98'],['✓ mailbox › picks up new order email','#3CCB5A'],
        ['✓ ocr › extracts PO number and lines','#3CCB5A'],['✓ rules › applies customer rules','#3CCB5A'],['✓ sap › creates sales order','#3CCB5A'],['24 passed (41.8s)','#3CCB5A']];
      L.forEach(function(l,k){txt(g,l[0],24,90+k*36,'500 18px '+MONO,l[1])});
      g.fillStyle='#F7F3EC';rr(g,520,62,366,250,16);g.fill();
      txt(g,'SQL Server',540,94,'700 17px '+SANS,'#5E5547');
      [['SELECT','PoNumber, Status'],['FROM','Orders'],['WHERE','Status = \'Posted\'']].forEach(function(r,k){
        txt(g,r[0],540,130+k*30,'500 17px '+MONO,'#1768D9');txt(g,r[1],r[0].length*11+552,130+k*30,'500 17px '+MONO,'#17130F')});
      g.fillStyle='#E9E1D4';g.fillRect(540,222,326,30);txt(g,'PoNumber      Status',552,243,'700 15px '+MONO,'#3A332B');
      txt(g,'4500018231    Posted  ✓',552,276,'500 15px '+MONO,'#1E7D35');txt(g,'4500018232    Posted  ✓',552,300,'500 15px '+MONO,'#1E7D35');
      g.fillStyle='#211C17';rr(g,24,350,W-48,100,16);g.fill();
      txt(g,'Azure Pipelines · run #482',48,384,'700 18px '+SANS,'#FFF8EA');
      ['Build','Test','Report'].forEach(function(s,k){
        var x=48+k*200;g.fillStyle='#3CCB5A';g.beginPath();g.arc(x+10,420,10,0,7);g.fill();
        txt(g,s,x+30,426,'500 18px '+SANS,'#FFF8EA');if(k<2){g.fillStyle='#5E5547';g.fillRect(x+110,418,70,4)}});
      txt(g,'Succeeded',W-48,426,'700 18px '+SANS,'#3CCB5A','right');
    }
  };
  var CW=1024,CH=800,SX=58,SY=246,SW=908,SH=484;
  function drawCard(st,s,img){
    var c=st.canvas||(st.canvas=document.createElement('canvas'));c.width=CW;c.height=CH;var g=c.getContext('2d');
    g.clearRect(0,0,CW,CH);g.textBaseline='alphabetic';
    g.save();g.translate(44,176);g.rotate(-0.04);txt(g,s.year,0,0,'160px "Bowlby One","Arial Black",sans-serif',s.color);g.restore();
    g.fillStyle='rgba(255,248,234,.92)';rr(g,44,232,964,540,46);g.fill();
    g.fillStyle=s.color;rr(g,30,218,964,540,46);g.fill();
    g.save();rr(g,SX,SY,SW,SH,28);g.clip();g.translate(SX,SY);
    if(img){var k=Math.max(SW/img.width,SH/img.height),w=img.width*k,h=img.height*k;g.drawImage(img,(SW-w)/2,(SH-h)/2,w,h)}
    else SHOTS[s.id](g,SW,SH,s.color);
    g.restore();
    if(st.tex)st.tex.needsUpdate=true;
    return c;
  }
  var cards=[],viewF=1,aimUp=0,cardW=6.4,cardH=6.4*CH/CW;
  function placeCards(){
    stations.forEach(function(st){
      if(!st.card)return;
      var sc=0.62+0.22*viewF,lat=-(0.2+3.7*viewF),up=1.0*viewF+(1-viewF)*(2.5+sc*cardH/2);
      st.base.copy(st.P).addScaledVector(st.right,lat).addScaledVector(V(0,1,0),up).addScaledVector(st.tan,-0.6);
      st.card.position.copy(st.base);st.card.userData.sc=sc;
      st.card.lookAt(st.camAt);st.card.rotateY(0.32*viewF);st.card.rotateZ(-0.05);
    });
  }
  function buildCards(){
    ST.forEach(function(s,i){
      var st=stations[i];drawCard(st,s,null);
      st.tex=new THREE.CanvasTexture(st.canvas);st.tex.anisotropy=4;
      var m=new THREE.Mesh(new THREE.PlaneGeometry(cardW,cardH),new THREE.MeshBasicMaterial({map:st.tex,transparent:true,side:THREE.DoubleSide,depthWrite:false}));
      m.userData.i=i;scene.add(m);st.card=m;cards.push(m);hitTargets.push(m);
      if(window.STATION_IMG_DIR){var im=new Image();im.onload=function(){drawCard(st,s,im)};im.src=window.STATION_IMG_DIR+s.id+'.jpg'}
    });
    placeCards();
  }
  var fr=(document.fonts&&document.fonts.load)?Promise.race([
    Promise.all([document.fonts.load('160px "Bowlby One"'),document.fonts.load('700 22px "DM Sans"'),document.fonts.load('500 18px "DM Mono"')]),
    new Promise(function(r){setTimeout(r,2500)})]):Promise.resolve();
  fr.then(buildCards,buildCards);

  /* size */
  function size(){
    var w=jcv.clientWidth,h=jcv.clientHeight;if(!w||!h)return;
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    viewF=clamp((camera.aspect-1)/0.6,0,1);aimUp=2.8*(1-viewF);placeCards();
  }
  size();
  if(window.ResizeObserver){new ResizeObserver(size).observe(jcv)}else{window.addEventListener('resize',size)}

  /* click a station (ring or card) to fly into the next one */
  var down=null,tmx=0,tmy=0,mx=0,my=0,ray=new THREE.Raycaster(),mp=new THREE.Vector2(),hover=false;
  function pick(e){
    var r=cv.getBoundingClientRect();mp.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
    ray.setFromCamera(mp,camera);return ray.intersectObjects(hitTargets,false)[0];
  }
  cv.addEventListener('pointerdown',function(e){down={x:e.clientX,y:e.clientY}});
  cv.addEventListener('pointermove',function(e){
    var r=cv.getBoundingClientRect();tmx=((e.clientX-r.left)/r.width-.5)*2;tmy=((e.clientY-r.top)/r.height-.5)*2;
    var h=!!pick(e);if(h!==hover){hover=h;cv.style.cursor=h?'pointer':''}
  });
  cv.addEventListener('pointerup',function(e){
    if(!down)return;var moved=Math.abs(e.clientX-down.x)+Math.abs(e.clientY-down.y)>6;down=null;
    if(!moved&&pick(e))next();
  });

  /* loop */
  var visible=true;
  if(window.IntersectionObserver){new IntersectionObserver(function(en){visible=en[0].isIntersecting}).observe(jcv)}
  var clock=new THREE.Clock(),time=0,aim=new THREE.Vector3(),tmpC=new THREE.Color();
  function frame(){
    requestAnimationFrame(frame);
    var dt=Math.min(clock.getDelta(),0.05);
    if(!visible)return;
    time+=dt;
    var prev=pCur;
    if(reduce){pCur=pTarget}else{pCur+=(pTarget-pCur)*(1-Math.exp(-dt*5));if(Math.abs(pTarget-pCur)<0.0004)pCur=pTarget}
    refresh();
    var speed=Math.min(1,Math.abs(pCur-prev)/Math.max(dt,0.001)/1.6);
    mx+=(tmx-mx)*0.05;my+=(tmy-my)*0.05;

    /* fly-through: dip through the ring centre halfway between stations, widen the lens while moving */
    var i0=Math.floor(pCur),frac=pCur-i0,dip=reduce?1:(frac<0.65?Math.cos(Math.PI/2*frac/0.65):Math.sin(Math.PI/2*(frac-0.65)/0.35));
    var tt=(pCur+1)/(M-1),cp=curve.getPoint(clamp(tt-LAG,0,1));
    camera.position.set(cp.x+(reduce?0:mx*0.9),cp.y+0.7+1.9*dip-(reduce?0:my*0.5),cp.z);
    aim.copy(curve.getPoint(clamp(tt,0,1)));aim.y+=(aimUp+0.6)*dip;camera.lookAt(aim);
    var fov=BASE_FOV+(reduce?0:16*(1-dip)+6*speed);
    if(Math.abs(camera.fov-fov)>0.05){camera.fov=fov;camera.updateProjectionMatrix()}
    starMat.size=0.16+(reduce?0:0.25*speed);

    litGeo.setDrawRange(0,Math.floor(clamp(tt,0,1)*SEG)+1);
    tmpC.set(ST[Math.round(pCur)].color);litMat.color.lerp(tmpC,0.08);

    stations.forEach(function(st,i){
      var w=clamp(1-Math.abs(pCur-i),0,1);
      if(!reduce){
        st.ring.rotation.z=time*0.35*(i%2?1:-1);st.ring2.rotation.z=-time*0.5;
        st.core.scale.setScalar((1+0.12*Math.sin(time*3+i))*(0.6+0.4*dip));
      }
      st.ring.scale.setScalar(1+0.14*w+(hover&&i===Math.round(pCur)?0.06:0));
      st.glow.material.opacity=0.12+0.38*w;
      if(st.card){
        st.card.scale.setScalar(st.card.userData.sc*(0.9+0.1*w));
        st.card.material.opacity=0.25+0.75*w;
        st.card.position.copy(st.base);
        if(!reduce)st.card.position.y+=Math.sin(time*1.1+i)*0.09;
      }
    });
    if(!reduce)stars.rotation.z=time*0.004;
    renderer.render(scene,camera);
  }
  requestAnimationFrame(frame);
})();
