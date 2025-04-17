import{m as G}from"./chunk-4BMEZGHF-CO_IuI5z-CzyoxMnB.js";import{p as c,u as I,c as J,a as X,s as j,w as H,v as K,i as R,l as Q,J as U,a3 as Y,a5 as Z,o as tt,B as et,L as at,a6 as w,a7 as nt,a8 as z}from"./CMSPage-BX9ezz8L.js";import{u as rt}from"./radar-MK3ICKWK-DIRtu6OR-CdRT2Q2F.js";import{h as _}from"./arc-Bv2ADxQn-Bo68fFiA.js";import{h as it}from"./ordinal-C0oynhte-Pc8f3NoK.js";import"./index-lUyc09mm.js";import"./_baseUniq-BBpOEK6D-BVPV80T-.js";import"./_basePickBy-CTAde5C2-C-jXpQLg.js";import"./clone-Jx-iEPiG-aD7Hx_IP.js";import"./init-DjUOC4st-DHuO7-vr.js";function lt(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ot(t){return t}function st(){var t=ot,a=lt,l=null,h=w(0),f=w(z),S=w(0);function i(e){var n,s=(e=nt(e)).length,u,$,x=0,p=new Array(s),r=new Array(s),g=+h.apply(this,arguments),v=Math.min(z,Math.max(-z,f.apply(this,arguments)-g)),m,T=Math.min(Math.abs(v)/s,S.apply(this,arguments)),C=T*(v<0?-1:1),d;for(n=0;n<s;++n)(d=r[p[n]=n]=+t(e[n],n,e))>0&&(x+=d);for(a!=null?p.sort(function(y,A){return a(r[y],r[A])}):l!=null&&p.sort(function(y,A){return l(e[y],e[A])}),n=0,$=x?(v-s*C)/x:0;n<s;++n,g=m)u=p[n],d=r[u],m=g+(d>0?d*$:0)+C,r[u]={data:e[u],index:n,value:d,startAngle:g,endAngle:m,padAngle:T};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,l=null,i):a},i.sort=function(e){return arguments.length?(l=e,a=null,i):l},i.startAngle=function(e){return arguments.length?(h=typeof e=="function"?e:w(+e),i):h},i.endAngle=function(e){return arguments.length?(f=typeof e=="function"?e:w(+e),i):f},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var pt=at.pie,W={sections:new Map,showData:!1},M=W.sections,B=W.showData,ct=structuredClone(pt),ut=c(()=>structuredClone(ct),"getConfig"),dt=c(()=>{M=new Map,B=W.showData,et()},"clear"),ft=c(({label:t,value:a})=>{M.has(t)||(M.set(t,a),R.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),gt=c(()=>M,"getSections"),mt=c(t=>{B=t},"setShowData"),ht=c(()=>B,"getShowData"),E={getConfig:ut,clear:dt,setDiagramTitle:K,getDiagramTitle:H,setAccTitle:j,getAccTitle:X,setAccDescription:J,getAccDescription:I,addSection:ft,getSections:gt,setShowData:mt,getShowData:ht},xt=c((t,a)=>{G(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:c(async t=>{const a=await rt("pie",t);R.debug(a),xt(a,E)},"parse")},wt=c(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),St=wt,$t=c(t=>{const a=[...t.entries()].map(l=>({label:l[0],value:l[1]})).sort((l,h)=>h.value-l.value);return st().value(l=>l.value)(a)},"createPieArcs"),vt=c((t,a,l,h)=>{R.debug(`rendering pie chart
`+t);const f=h.db,S=Q(),i=U(f.getConfig(),S.pie),e=40,n=18,s=4,u=450,$=u,x=Y(a),p=x.append("g");p.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:r}=S;let[g]=Z(r.pieOuterStrokeWidth);g??(g=2);const v=i.textPosition,m=Math.min($,u)/2-e,T=_().innerRadius(0).outerRadius(m),C=_().innerRadius(m*v).outerRadius(m*v);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+g/2).attr("class","pieOuterCircle");const d=f.getSections(),y=$t(d),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],D=it(A);p.selectAll("mySlices").data(y).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let F=0;d.forEach(o=>{F+=o}),p.selectAll("mySlices").data(y).enter().append("text").text(o=>(o.data.value/F*100).toFixed(0)+"%").attr("transform",o=>"translate("+C.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(f.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=p.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,b)=>{const k=n+s,P=k*D.domain().length/2,V=12*n,q=b*k-P;return"translate("+V+","+q+")"});O.append("rect").attr("width",n).attr("height",n).style("fill",D).style("stroke",D),O.data(y).append("text").attr("x",n+s).attr("y",n-s).text(o=>{const{label:b,value:k}=o.data;return f.getShowData()?`${b} [${k}]`:b});const N=Math.max(...O.selectAll("text").nodes().map(o=>(o==null?void 0:o.getBoundingClientRect().width)??0)),L=$+e+n+s+N;x.attr("viewBox",`0 0 ${L} ${u}`),tt(x,u,L,i.useMaxWidth)},"draw"),At={draw:vt},Bt={parser:yt,db:E,renderer:At,styles:St};export{Bt as diagram};
