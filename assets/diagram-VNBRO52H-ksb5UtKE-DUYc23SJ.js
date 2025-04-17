import{m as B}from"./chunk-4BMEZGHF-LhWqWwi0-DnwbjPpC.js";import{p as s,c as P,u as S,w as W,v as z,a as F,s as v,J as x,a3 as T,o as D,B as A,K as E,L,i as w}from"./CMSPage-Zgn2p5vV.js";import{u as R}from"./radar-MK3ICKWK-Cfd_S7Nz-CDOMJDNW.js";import"./index-Z9c20k9d.js";import"./_baseUniq-D_QrcMpX-BeeDZe7m.js";import"./_basePickBy-BjWsDH0D-BfuN-dn-.js";import"./clone-hvjmxfXm-Cn5aHhAj.js";var $={packet:[]},m=structuredClone($),Y=L.packet,H=s(()=>{const t=x({...Y,...E().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),X=s(()=>m.packet,"getPacket"),q=s(t=>{t.length>0&&m.packet.push(t)},"pushWord"),I=s(()=>{A(),m=structuredClone($)},"clear"),u={pushWord:q,getPacket:X,getConfig:H,clear:I,setAccTitle:v,getAccTitle:F,setDiagramTitle:z,getDiagramTitle:W,getAccDescription:S,setAccDescription:P},J=1e4,K=s(t=>{B(t,u);let e=-1,o=[],i=1;const{bitsPerRow:n}=u.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,w.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=n+1&&u.getPacket().length<J;){const[f,c]=M({start:a,end:r,label:p},i,n);if(o.push(f),f.end+1===i*n&&(u.pushWord(o),o=[],i++),!c)break;({start:a,end:r,label:p}=c)}}u.pushWord(o)},"populate"),M=s((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),_={parse:s(async t=>{const e=await R("packet",t);w.debug(e),K(e)},"parse")},j=s((t,e,o,i)=>{const n=i.db,a=n.getConfig(),{rowHeight:r,paddingY:p,bitWidth:f,bitsPerRow:c}=a,h=n.getPacket(),l=n.getDiagramTitle(),k=r+p,d=k*(h.length+1)-(l?0:r),b=f*c+2,g=T(e);g.attr("viewbox",`0 0 ${b} ${d}`),D(g,d,b,a.useMaxWidth);for(const[y,C]of h.entries())G(g,C,y,a);g.append("text").text(l).attr("x",b/2).attr("y",d-k/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),G=s((t,e,o,{rowHeight:i,paddingX:n,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:f})=>{const c=t.append("g"),h=o*(i+a)+a;for(const l of e){const k=l.start%p*r+1,d=(l.end-l.start+1)*r-n;if(c.append("rect").attr("x",k).attr("y",h).attr("width",d).attr("height",i).attr("class","packetBlock"),c.append("text").attr("x",k+d/2).attr("y",h+i/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!f)continue;const b=l.end===l.start,g=h-2;c.append("text").attr("x",k+(b?d/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",b?"middle":"start").text(l.start),b||c.append("text").attr("x",k+d).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),N={draw:j},O={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},U=s(({packet:t}={})=>{const e=x(O,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),ot={parser:_,db:u,renderer:N,styles:U};export{ot as diagram};
