import{m as S}from"./chunk-4BMEZGHF-CO_IuI5z-CmMgoagF.js";import{p as l,c as I,u as E,w as F,v as R,a as z,s as P,a3 as B,B as D,J as y,K as w,L as G,i as j,a9 as V}from"./CMSPage-CTB6Ghc-.js";import{u as W}from"./radar-MK3ICKWK-DIRtu6OR-BaH4wCql.js";import"./index-DJv_dSTT.js";import"./_baseUniq-BBpOEK6D-DtIQcSIG.js";import"./_basePickBy-CTAde5C2-apHpenpV.js";import"./clone-Jx-iEPiG-OPIQSvBJ.js";var x={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},b={axes:[],curves:[],options:x},h=structuredClone(b),_=G.radar,q=l(()=>y({..._,...w().radar}),"getConfig"),C=l(()=>h.axes,"getAxes"),J=l(()=>h.curves,"getCurves"),K=l(()=>h.options,"getOptions"),X=l(a=>{h.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),Z=l(a=>{h.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:H(t.entries)}))},"setCurves"),H=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=C();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(i=>{var n;return((n=i.axis)==null?void 0:n.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),N=l(a=>{var t,e,r,i,n;const o=a.reduce((s,c)=>(s[c.name]=c,s),{});h.options={showLegend:((t=o.showLegend)==null?void 0:t.value)??x.showLegend,ticks:((e=o.ticks)==null?void 0:e.value)??x.ticks,max:((r=o.max)==null?void 0:r.value)??x.max,min:((i=o.min)==null?void 0:i.value)??x.min,graticule:((n=o.graticule)==null?void 0:n.value)??x.graticule}},"setOptions"),Q=l(()=>{D(),h=structuredClone(b)},"clear"),$={getAxes:C,getCurves:J,getOptions:K,setAxes:X,setCurves:Z,setOptions:N,getConfig:q,clear:Q,setAccTitle:P,getAccTitle:z,setDiagramTitle:R,getDiagramTitle:F,getAccDescription:E,setAccDescription:I},U=l(a=>{S(a,$);const{axes:t,curves:e,options:r}=a;$.setAxes(t),$.setCurves(e),$.setOptions(r)},"populate"),Y={parse:l(async a=>{const t=await W("radar",a);j.debug(t),U(t)},"parse")},tt=l((a,t,e,r)=>{const i=r.db,n=i.getAxes(),o=i.getCurves(),s=i.getOptions(),c=i.getConfig(),d=i.getDiagramTitle(),p=B(t),u=et(p,c),g=s.max??Math.max(...o.map(v=>Math.max(...v.entries))),m=s.min,f=Math.min(c.width,c.height)/2;at(u,n,f,s.ticks,s.graticule),rt(u,n,f,c),M(u,n,o,m,g,s.graticule,c),A(u,o,s.showLegend,c),u.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),at=l((a,t,e,r,i)=>{if(i==="circle")for(let n=0;n<r;n++){const o=e*(n+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(i==="polygon"){const n=t.length;for(let o=0;o<r;o++){const s=e*(o+1)/r,c=t.map((d,p)=>{const u=2*p*Math.PI/n-Math.PI/2,g=s*Math.cos(u),m=s*Math.sin(u);return`${g},${m}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),rt=l((a,t,e,r)=>{const i=t.length;for(let n=0;n<i;n++){const o=t[n].label,s=2*n*Math.PI/i-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(o).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function M(a,t,e,r,i,n,o){const s=t.length,c=Math.min(o.width,o.height)/2;e.forEach((d,p)=>{if(d.entries.length!==s)return;const u=d.entries.map((g,m)=>{const f=2*Math.PI*m/s-Math.PI/2,v=L(g,r,i,c),k=v*Math.cos(f),O=v*Math.sin(f);return{x:k,y:O}});n==="circle"?a.append("path").attr("d",T(u,o.curveTension)).attr("class",`radarCurve-${p}`):n==="polygon"&&a.append("polygon").attr("points",u.map(g=>`${g.x},${g.y}`).join(" ")).attr("class",`radarCurve-${p}`)})}l(M,"drawCurves");function L(a,t,e,r){const i=Math.min(Math.max(a,t),e);return r*(i-t)/(e-t)}l(L,"relativeRadius");function T(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let i=0;i<e;i++){const n=a[(i-1+e)%e],o=a[i],s=a[(i+1)%e],c=a[(i+2)%e],d={x:o.x+(s.x-n.x)*t,y:o.y+(s.y-n.y)*t},p={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${d.x},${d.y} ${p.x},${p.y} ${s.x},${s.y}`}return`${r} Z`}l(T,"closedRoundCurve");function A(a,t,e,r){if(!e)return;const i=(r.width/2+r.marginRight)*3/4,n=-(r.height/2+r.marginTop)*3/4,o=20;t.forEach((s,c)=>{const d=a.append("g").attr("transform",`translate(${i}, ${n+c*o})`);d.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),d.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(s.label)})}l(A,"drawLegend");var it={draw:tt},st=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const i=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return e},"genIndexStyles"),nt=l(a=>{const t=V(),e=w(),r=y(t,e.themeVariables),i=y(r.radar,a);return{themeVariables:r,radarOptions:i}},"buildRadarStyleOptions"),ot=l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=nt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${st(t,e)}
	`},"styles"),xt={parser:Y,db:$,renderer:it,styles:ot};export{xt as diagram};
