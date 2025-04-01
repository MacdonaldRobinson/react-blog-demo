import{d as o,r as p,j as t,R as w,B as v}from"./index-DlopEd3Q.js";import{c as j,a as b,W as y}from"./WrapWithBgImage-CLqfwmSc.js";const P=o.div`
    padding: 10px;
`,B=o.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-bottom: 10px;
`,C=o.div`
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
`,g=o.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all 1s;
    opacity: 0;
    filter: blur(5px);
`,h=o.div``,u=o.div`
    transform: rotateY(180deg);
`,c=o.div`
    opacity: 0;
`,W=o.div`
    color: black;
`,f=o.div``,$=o.div`
    position: absolute;
    top: 0;
    width: 100%;
`,F=o.div`
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 1;
    perspective: 1000px;
    transition: all 1s;
    cursor: pointer;
    color: white;

    &.show {
        ${g} {
            opacity: 1;
        }

        ${c} {
            opacity: 1;

            & > div {
                transition: all 1s;
                animation: slideInDown 1s 0s forwards;
            }
        }

        ${c} {
            & > div {
                transition: all 1s;
                animation: slideInDown 1s 0s forwards;
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

    ${f}, ${u}, ${c}, ${h} {
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
        overflow: hidden;
        border-radius: 10%;
        color: white;
        backdrop-filter: blur(0px);

        ${g} {
            border-radius: 10%;
        }
    }

    ${c} {
        text-align: center;
    }

    ${c},
    ${h} {
        padding: 10px;
    }

    ${h} {
        overflow: auto;
        scrollbar-width: thin;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 20px;
        text-align: center;
    }

    &:hover {
        ${f}, ${u} {
            ${g} {
                transform: scale(150%);
                filter: blur(10px);
            }
        }

        z-index: 10;
    }

    &.flip {
        ${f} {
            transform: rotateY(180deg);
        }

        ${u} {
            transform: rotateY(360deg);
        }
    }
`,k=({bgImageUrl:e,children:i,backFaceContent:r,frontFaceHeaderContent:a})=>{const[n,l]=p.useState(!1),[d,m]=p.useState(!1),x=()=>{m(!0)},s=()=>{r&&l(!n)};return t.jsxs(F,{className:j({show:d,flip:n}),onClick:s,children:[t.jsxs(f,{children:[!d&&t.jsx(W,{children:"Loading..."}),t.jsx(g,{src:e,onLoad:x,loading:"lazy"}),t.jsxs(c,{children:[a&&t.jsx($,{children:a}),t.jsx("div",{children:i})]})]}),r&&t.jsxs(u,{children:[t.jsx(g,{src:e,onLoad:x,loading:"lazy"}),t.jsx(h,{children:t.jsx("div",{children:r})})]})]})},L=w.memo(({fullText:e,highlightText:i})=>{if(!e)return e;const r=new RegExp(`(${i})`,"gi");return e.split(r).map((n,l)=>n.toLowerCase()==i.toLowerCase()?t.jsx("mark",{children:n},l):n)}),I=o.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20vw;
  height: 20vw;
  position: relative;
`,S=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 0.8rem;
`,M=w.memo(({blogPost:e,filterText:i,popupBlogPost:r})=>t.jsx(I,{children:t.jsx(k,{bgImageUrl:`https://via.assets.so/game.png?id=${e.id}&q=95&w=360&h=360&fit=fill`,backFaceContent:i?t.jsx(L,{fullText:e.body,highlightText:i}):e.body,frontFaceHeaderContent:t.jsx(S,{onClick:()=>r(e),children:"Popup"}),children:e.title})})),z=o.div`
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
    color: white;
`,E=o.div`
    width: 80vw;
    height: 20vh;
    transform: scale(0);
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
    transition: all 1s;

    @keyframes PopShow {
        to {
            transform: scale(100%);
        }
    }

    &.show {
        animation: PopShow 1s forwards;
    }

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
`,Y=o.div``,D=o.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding: 5px;
`,R=({title:e,content:i,bgImageUrl:r,onPopupModelCloseCallback:a})=>{const[n,l]=p.useState(),d=()=>{l(!0)};return t.jsxs(z,{children:[!n&&t.jsx(t.Fragment,{children:"Loading..."}),t.jsx(E,{className:j({show:n}),children:t.jsxs(y,{bgImageUrl:r,onImageLoaded:d,children:[t.jsx(D,{onClick:a,children:"X Close"}),t.jsx(T,{children:e}),t.jsx(Y,{children:i})]})})]})},H=()=>{const e=p.useContext(v),[i,r]=p.useState(""),[a,n]=p.useState(null),l=e.blogPosts.filter(s=>!!s.body.toLowerCase().includes(i.toLowerCase())),d=s=>{r((s==null?void 0:s.currentTarget.value)??"")},m=s=>{n(s)},x=()=>{n(null)};return t.jsxs(P,{children:[t.jsxs(B,{children:[t.jsx("label",{htmlFor:"BlogFilter",children:"Filter Blog Posts"}),t.jsx("input",{id:"BlogFilter",value:i,onInput:d})]}),t.jsxs("fieldset",{children:[t.jsxs("label",{children:["Blog Posts: ",l.length]}),t.jsxs(C,{children:[e.isLoading&&t.jsx(t.Fragment,{children:"Loading ..."}),e.isError&&t.jsx(t.Fragment,{children:"Error Loading"}),!e.isLoading&&l.length==0&&t.jsx(t.Fragment,{children:"No blog posts found"}),l.map(s=>t.jsx(M,{blogPost:s,filterText:i,popupBlogPost:m},s.id))]})]}),a&&t.jsx(R,{bgImageUrl:`https://via.assets.so/album.png?id=${a.id}&q=95&w=360&h=360&fit=fill`,title:a.title,content:a.body,onPopupModelCloseCallback:x})]})};export{H as default};
