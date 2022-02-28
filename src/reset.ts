import { css, createGlobalStyle } from "styled-components";

export const reset = css`
  // dissable bounce effect in ios
  html {
    height: 100%;
    width: 100%;
  }
  body {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  html,
  body,
  main,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  ol,
  ul {
    list-style: none;
  }

  input[type="text"],
  input[type="password"],
  textarea,
  select {
    outline: none;
  }
  *:focus {
    outline: none;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
`;

export const Reset = createGlobalStyle`${reset}`;
