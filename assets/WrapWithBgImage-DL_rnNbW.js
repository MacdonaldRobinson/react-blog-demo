import{d as i,r as l,j as e}from"./index-Bh7HLRCV.js";const n=i.img`
  z-index: -1;
`,g=i.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`,d=i.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  transition: all 1s;

  &.show {
    opacity: 1;
  }

  ${n}, ${g} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;function p(t){var o,r,a="";if(typeof t=="string"||typeof t=="number")a+=t;else if(typeof t=="object")if(Array.isArray(t)){var s=t.length;for(o=0;o<s;o++)t[o]&&(r=p(t[o]))&&(a&&(a+=" "),a+=r)}else for(r in t)t[r]&&(a&&(a+=" "),a+=r);return a}function f(){for(var t,o,r=0,a="",s=arguments.length;r<s;r++)(t=arguments[r])&&(o=p(t))&&(a&&(a+=" "),a+=o);return a}const m=({children:t,bgImageUrl:o,onImageLoaded:r})=>{const[a,s]=l.useState(!1),c=()=>{s(!0),r&&r()};return e.jsxs(d,{className:f({show:a}),children:[e.jsx(n,{src:o,loading:"lazy",onLoad:c}),e.jsx(g,{children:t})]})};export{m as W,g as a,f as c};
