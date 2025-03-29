import{d as o,r as c,j as t,R as w,B as v}from"./index-BOG_CWlT.js";import{c as j,a as b,W as y}from"./WrapWithBgImage-M9q9tV72.js";const C=o.div``,P=o.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 90vh;
  overflow: auto;
`,m=o.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`,g=o.div``,x=o.div`
  transform: rotateY(180deg);
`,d=o.div``,h=o.div``,B=o.div`
  position: absolute;
  top: 0;
  width: 100%;
`,$=o.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  perspective: 1000px;
  transition: all 1s;
  cursor: pointer;

  ${d} {
    & > div {
      opacity: 0;
    }
  }

  &.show {
    opacity: 1;

    ${d} {
      & > div {
        transition: all 1s;
        animation: slideInDown 1s 1s forwards;
      }
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  ${h}, ${x}, ${d}, ${g} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 10%;
    color: white;
    backdrop-filter: blur(5px);

    ${m} {
      border-radius: 10%;
    }
  }

  ${d} {
    text-align: center;
  }

  ${d},
  ${g} {
    padding: 10px;
  }

  ${g} {
    overflow: auto;
    scrollbar-width: thin;
    align-items: flex-start;
    padding: 20px;
    text-align: center;
  }

  &:hover {
    ${h}, ${x} {
      backdrop-filter: blur(10px);
    }

    transform: scale(110%);
    z-index: 10;
  }

  &.flip {
    ${h} {
      transform: rotateY(180deg);
    }

    ${x} {
      transform: rotateY(360deg);
    }
  }
`,W=({bgImageUrl:e,children:i,backFaceContent:s,frontFaceHeaderContent:r})=>{const[a,l]=c.useState(!1),[u,f]=c.useState(!1),p=()=>{f(!0)},n=()=>{s&&l(!a)};return t.jsxs($,{className:j({show:u,flip:a}),onClick:n,children:[t.jsxs(h,{children:[t.jsx(m,{src:e,onLoad:p,loading:"lazy"}),t.jsxs(d,{children:[r&&t.jsx(B,{children:r}),t.jsx("div",{children:i})]})]}),s&&t.jsxs(x,{children:[t.jsx(m,{src:e,onLoad:p,loading:"lazy"}),t.jsx(g,{children:t.jsx("div",{children:s})})]})]})},k=w.memo(({fullText:e,highlightText:i})=>{if(!e)return e;const s=new RegExp(`(${i})`,"gi");return e.split(s).map((a,l)=>a.toLowerCase()==i.toLowerCase()?t.jsx("mark",{children:a},l):a)}),F=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30vw;
  height: 30vw;
  position: relative;
`,I=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 0.8rem;
`,M=w.memo(({blogPost:e,filterText:i,popupBlogPost:s})=>t.jsx(F,{children:t.jsx(W,{bgImageUrl:`https://via.assets.so/game.png?id=${e.id}&q=95&w=360&h=360&fit=fill`,backFaceContent:i?t.jsx(k,{fullText:e.body,highlightText:i}):e.body,frontFaceHeaderContent:t.jsx(I,{onClick:()=>s(e),children:"Popup"}),children:e.title})})),z=o.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`,L=o.div`
  width: 80vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;

  ${b} {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`,T=o.div`
  font-size: 2rem;
`,S=o.div``,Y=o.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: red;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 5px;
`,E=({title:e,content:i,bgImageUrl:s,onPopupModelCloseCallback:r})=>t.jsx(z,{children:t.jsx(L,{children:t.jsxs(y,{bgImageUrl:s,children:[t.jsx(Y,{onClick:r,children:"X Close"}),t.jsx(T,{children:e}),t.jsx(S,{children:i})]})})}),q=()=>{const e=c.useContext(v),[i,s]=c.useState(""),[r,a]=c.useState(null),l=e.blogPosts.filter(n=>!!n.body.toLowerCase().includes(i.toLowerCase())),u=n=>{s((n==null?void 0:n.currentTarget.value)??"")},f=n=>{a(n)},p=()=>{a(null)};return t.jsxs(C,{children:["Blog Page",t.jsxs("fieldset",{children:[t.jsx("input",{value:i,onInput:u}),t.jsxs("label",{children:["Blog Posts: ",l.length]}),t.jsx(P,{children:l.map(n=>t.jsx(M,{blogPost:n,filterText:i,popupBlogPost:f},n.id))})]}),r&&t.jsx(E,{bgImageUrl:`https://via.assets.so/album.png?id=${r.id}&q=95&w=360&h=360&fit=fill`,title:r.title,content:r.body,onPopupModelCloseCallback:p})]})};export{q as default};
