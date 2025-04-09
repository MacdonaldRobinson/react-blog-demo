import{r as d,C as g,d as s,j as e}from"./index-D2OHxJhT.js";const l=()=>d.useContext(g),u=s.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`,m=s.fieldset`
    padding: 10px;
    height: 50vh;
    overflow: auto;
`,C=s.legend``,j=s.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;s.div``;const f=s.div`
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    color: gray;
`,v=s.div`
    font-size: 1rem;
`,M=s.div`
    border: 1px outset black;
    background-color: lightgray;
    border-radius: 10px;
    padding: 10px;
    white-space: pre-wrap;
`,w=s.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 35vw;
`,c=s.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    textarea {
        height: 10vh;
        white-space: pre-wrap;
    }
`,N=()=>{const{sendMessage:n}=l(),[t,i]=d.useState({id:"",message:"",userName:"",createdOn:new Date}),p=a=>{if(!a)return;const r=a.currentTarget.value,o={...t,userName:r};i(o)},h=a=>{if(!a)return;const r=a.currentTarget.value,o={...t,message:r};i(o)},x=async()=>{await n(t)};return e.jsxs(w,{children:[e.jsxs(c,{children:[e.jsx("label",{htmlFor:"userName",children:"User Name"}),e.jsx("input",{name:"userName",id:"userName",value:t.userName,onInput:p,maxLength:100})]}),e.jsxs(c,{children:[e.jsx("label",{htmlFor:"message",children:"Message"}),e.jsx("textarea",{name:"message",id:"message",value:t.message,onInput:h,maxLength:100})]}),e.jsx(c,{children:e.jsx("button",{onClick:x,children:"Send"})})]})},I=()=>{const{chatMessages:n}=l();return e.jsxs(u,{children:[e.jsxs(m,{children:[e.jsx(C,{children:"Chat Messages:"}),e.jsx(j,{children:n.map(t=>e.jsxs(M,{children:[e.jsx(f,{children:t.userName}),e.jsx(v,{children:t.message})]},t.id))})]}),e.jsx(N,{})]})},b=s.section``,y=()=>e.jsx(b,{children:e.jsx(I,{})});export{y as default};
