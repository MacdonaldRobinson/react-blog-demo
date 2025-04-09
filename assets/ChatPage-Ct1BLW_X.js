import{r as p,C as m,d as s,j as e}from"./index-CK20W_Nv.js";const x=()=>p.useContext(m),C=s.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`,f=s.fieldset`
    padding: 10px;
    height: 50vh;
    overflow: auto;
`,j=s.legend``,v=s.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;s.div``;const w=s.div`
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    color: gray;
`,M=s.div`
    font-size: 1rem;
`,N=s.div`
    border: 1px outset;
    background-color: lightblue;
    border-radius: 20px 0 20px 20px;
    width: 50%;
    padding: 10px;
    white-space: pre-wrap;
    align-self: flex-end;

    &.me {
        align-self: flex-start;
        background-color: lightgreen;
        border-radius: 20px 20px 20px 0;
    }
`,b=s.div`
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
`,I=({userName:a,setUserName:o})=>{const{sendMessage:i}=x(),[t,l]=p.useState({id:"",message:"",userName:a,createdOn:new Date}),h=r=>{if(!r)return;const d=r.currentTarget.value,n={...t,userName:d};l(n),o(n.userName)},g=r=>{if(!r)return;const d=r.currentTarget.value,n={...t,message:d};l(n)},u=async()=>{await i(t)};return e.jsxs(b,{children:[e.jsxs(c,{children:[e.jsx("label",{htmlFor:"userName",children:"User Name"}),e.jsx("input",{name:"userName",id:"userName",value:t.userName,onInput:h,maxLength:100})]}),e.jsxs(c,{children:[e.jsx("label",{htmlFor:"message",children:"Message"}),e.jsx("textarea",{name:"message",id:"message",value:t.message,onInput:g,maxLength:100})]}),e.jsx(c,{children:e.jsx("button",{onClick:u,children:"Send"})})]})},W=()=>{const{userName:a,setUserName:o,chatMessages:i}=x();return e.jsxs(C,{children:[e.jsxs(f,{children:[e.jsx(j,{children:"Chat Messages"}),e.jsx(v,{children:i.map(t=>e.jsxs(N,{className:a.toLowerCase()==t.userName.toLowerCase()?"me":"no-me",children:[e.jsx(w,{children:t.userName}),e.jsx(M,{children:t.message})]},t.id))})]}),e.jsx(I,{userName:a,setUserName:o})]})},y=s.section``,S=()=>e.jsx(y,{children:e.jsx(W,{})});export{S as default};
