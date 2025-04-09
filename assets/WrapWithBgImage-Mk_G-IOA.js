import{d as i,r as d,j as e}from"./index-PoQ6caS2.js";const n=i.img`
  z-index: -1;
`,g=i.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`,f=i.div`
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
`;function p(a){var o,r,t="";if(typeof a=="string"||typeof a=="number")t+=a;else if(typeof a=="object")if(Array.isArray(a)){var s=a.length;for(o=0;o<s;o++)a[o]&&(r=p(a[o]))&&(t&&(t+=" "),t+=r)}else for(r in a)a[r]&&(t&&(t+=" "),t+=r);return t}function h(){for(var a,o,r=0,t="",s=arguments.length;r<s;r++)(a=arguments[r])&&(o=p(a))&&(t&&(t+=" "),t+=o);return t}const u=({altText:a,children:o,bgImageUrl:r,onImageLoaded:t})=>{const[s,c]=d.useState(!1),l=()=>{c(!0),t&&t()};return e.jsxs(f,{className:h({show:s}),children:[e.jsx(n,{src:r,loading:"lazy",onLoad:l,alt:a}),e.jsx(g,{children:o})]})};export{u as W,g as a,h as c};
