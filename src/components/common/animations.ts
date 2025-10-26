import { keyframes } from "@emotion/react";

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-40px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(40px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
