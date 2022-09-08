import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { DarkTheme, WhiteTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none; // 링크들 밑줄 없애~
  color:inherit;
}
`;

const Btndiv = styled.div`
  text-align: center;
`;

const Btn = styled.button`
  color: #c6c6c6;
  background-color: ${(props) => props.theme.coinBgColor};
  border: 1px solid;
  margin-top: 15px;
  border-radius: 10px;
  margin-left: 300px;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  /* width: 30px; */
  /* height: 30px; */
`;

function App() {
  const [themeMode, setThemeMode] = useState<boolean>(true); // 테마 모드 세팅

  return (
    <>
      <ThemeProvider theme={themeMode ? DarkTheme : WhiteTheme}>
        <GlobalStyle />
        <Btndiv>
          <Btn onClick={() => setThemeMode(!themeMode)}>
            {themeMode ? "☀" : "☽"}
          </Btn>
        </Btndiv>
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
