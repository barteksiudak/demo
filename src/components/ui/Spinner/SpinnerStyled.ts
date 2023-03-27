import styled from 'styled-components';

export default styled.div(
  ({
    theme: {
      color: { primary: color, contrast: circleColor },
    },
  }) => `
    border-radius: 50%;
    width: 10em;
    height: 10em;
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid ${circleColor};
    border-right: 1.1em solid ${circleColor};
    border-bottom: 1.1em solid ${circleColor};
    border-left: 1.1em solid ${color};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;

    :after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }
    
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `,
);
