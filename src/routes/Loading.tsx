import styled from "styled-components";

const Loader = styled.div`
  display: inline-block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #4b9c61; // loading bar color
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

function Loading() {
  return <Loader></Loader>;
}

export default Loading;
