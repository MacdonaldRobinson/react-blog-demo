import{d as e,R as i,j as t,a as l,B as c,T as d,M as m}from"./index-lUyc09mm.js";import{W as p}from"./WrapWithBgImage-tX9VWtpC.js";const g=e.section`
  height: 90vh;
`,h=e.div`
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
`,n=e.h3`
  font-size: 2rem;
`,r=e.div``,x=e.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  gap: 20px;
  padding: 20px;
  scroll-snap-align: center;

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

  @keyframes slideOutUp {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  ${n}, ${r} {
    opacity: 0;
    animation: slideInDown 1s 0.5s forwards;
  }
`,f=i.memo(({blogPost:o,bgImageUrl:s})=>t.jsx(p,{bgImageUrl:s,altText:o.title,children:t.jsxs(x,{children:[t.jsx(n,{children:o.title}),t.jsx(r,{children:o.body})]})})),u=()=>{const s=l.useContext(c).blogPosts;return t.jsxs(g,{children:[t.jsx(d,{children:"Home Page Title"}),t.jsx(m,{name:"description",content:"Home Page"}),t.jsx(h,{children:s.map(a=>t.jsx(f,{blogPost:a,bgImageUrl:`https://via.assets.so/game.png?id=${a.id}&q=95&w=360&h=360&fit=fill`},a.id))})]})};export{u as default};
