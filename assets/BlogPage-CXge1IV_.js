import{d as e,r as p,j as t,R as w,B as v}from"./index-D3BtRqv7.js";import{c as j,a as b,W as y}from"./WrapWithBgImage-1jOBe1Wh.js";const B=e.div`
    padding: 10px;
`,C=e.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-bottom: 10px;
`,P=e.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 85vh;
    overflow: auto;
    padding: 20px;
`,m=e.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`,x=e.div``,g=e.div`
  transform: rotateY(180deg);
`,d=e.div``,h=e.div``,W=e.div`
  position: absolute;
  top: 0;
  width: 100%;
`,$=e.div`
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

  ${h}, ${g}, ${d}, ${x} {
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
  ${x} {
    padding: 10px;
  }

  ${x} {
    overflow: auto;
    scrollbar-width: thin;
    align-items: flex-start;
    padding: 20px;
    text-align: center;
  }

  &:hover {
    ${h}, ${g} {
      backdrop-filter: blur(10px);
    }

    transform: scale(110%);
    z-index: 10;
  }

  &.flip {
    ${h} {
      transform: rotateY(180deg);
    }

    ${g} {
      transform: rotateY(360deg);
    }
  }
`,k=({bgImageUrl:o,children:i,backFaceContent:s,frontFaceHeaderContent:r})=>{const[l,a]=p.useState(!1),[u,f]=p.useState(!1),c=()=>{f(!0)},n=()=>{s&&a(!l)};return t.jsxs($,{className:j({show:u,flip:l}),onClick:n,children:[t.jsxs(h,{children:[t.jsx(m,{src:o,onLoad:c,loading:"lazy"}),t.jsxs(d,{children:[r&&t.jsx(W,{children:r}),t.jsx("div",{children:i})]})]}),s&&t.jsxs(g,{children:[t.jsx(m,{src:o,onLoad:c,loading:"lazy"}),t.jsx(x,{children:t.jsx("div",{children:s})})]})]})},F=w.memo(({fullText:o,highlightText:i})=>{if(!o)return o;const s=new RegExp(`(${i})`,"gi");return o.split(s).map((l,a)=>l.toLowerCase()==i.toLowerCase()?t.jsx("mark",{children:l},a):l)}),I=e.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20vw;
  height: 20vw;
  position: relative;
`,M=e.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 0.8rem;
`,z=w.memo(({blogPost:o,filterText:i,popupBlogPost:s})=>t.jsx(I,{children:t.jsx(k,{bgImageUrl:`https://via.assets.so/game.png?id=${o.id}&q=95&w=360&h=360&fit=fill`,backFaceContent:i?t.jsx(F,{fullText:o.body,highlightText:i}):o.body,frontFaceHeaderContent:t.jsx(M,{onClick:()=>s(o),children:"Popup"}),children:o.title})})),L=e.div`
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
`,T=e.div`
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
`,S=e.div`
  font-size: 2rem;
`,Y=e.div``,E=e.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: red;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 5px;
`,R=({title:o,content:i,bgImageUrl:s,onPopupModelCloseCallback:r})=>t.jsx(L,{children:t.jsx(T,{children:t.jsxs(y,{bgImageUrl:s,children:[t.jsx(E,{onClick:r,children:"X Close"}),t.jsx(S,{children:o}),t.jsx(Y,{children:i})]})})}),H=()=>{const o=p.useContext(v),[i,s]=p.useState(""),[r,l]=p.useState(null),a=o.blogPosts.filter(n=>!!n.body.toLowerCase().includes(i.toLowerCase())),u=n=>{s((n==null?void 0:n.currentTarget.value)??"")},f=n=>{l(n)},c=()=>{l(null)};return t.jsxs(B,{children:[t.jsxs(C,{children:[t.jsx("label",{htmlFor:"BlogFilter",children:"Filter Blog Posts"}),t.jsx("input",{id:"BlogFilter",value:i,onInput:u})]}),t.jsxs("fieldset",{children:[t.jsxs("label",{children:["Blog Posts: ",a.length]}),t.jsx(P,{children:a.map(n=>t.jsx(z,{blogPost:n,filterText:i,popupBlogPost:f},n.id))})]}),r&&t.jsx(R,{bgImageUrl:`https://via.assets.so/album.png?id=${r.id}&q=95&w=360&h=360&fit=fill`,title:r.title,content:r.body,onPopupModelCloseCallback:c})]})};export{H as default};
