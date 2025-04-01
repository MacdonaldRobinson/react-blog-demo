import{d as e,R as i,j as t,r as l,B as c}from"./index-B6Smc-K9.js";import{W as d}from"./WrapWithBgImage-NviqoRAP.js";const m=e.section`
  height: 90vh;
`,p=e.div`
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
`,n=e.h3`
  font-size: 2rem;
`,a=e.div``,g=e.div`
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

  ${n}, ${a} {
    opacity: 0;
    animation: slideInDown 1s 0.5s forwards;
  }
`,h=i.memo(({blogPost:o,bgImageUrl:s})=>t.jsx(d,{bgImageUrl:s,children:t.jsxs(g,{children:[t.jsx(n,{children:o.title}),t.jsx(a,{children:o.body})]})})),y=()=>{const s=l.useContext(c).blogPosts;return t.jsx(m,{children:t.jsx(p,{children:s.map(r=>t.jsx(h,{blogPost:r,bgImageUrl:`https://via.assets.so/game.png?id=${r.id}&q=95&w=360&h=360&fit=fill`},r.id))})})};export{y as default};
