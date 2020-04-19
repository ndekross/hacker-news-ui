import { css } from "emotion"
import { vr, ms } from "./fonts"

export const textStyles = {
  largeTitle: css`
    font-size: ${ms(1)}rem;
    line-height: 1.25;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(3)}rem;
      line-height: 1.05;
    }
  `,
  caption: css`
    font-size: ${ms(-1)}rem;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(-0.5)}rem;
    }
  `,
  body: css`
    font-size: ${ms(0)}rem;
    line-height: 1.41;
    p {
      margin-top: ${vr(0.5)}rem;
    }
    @media screen and (min-width: 40rem) {
      max-width: 42ch;
      line-height: 1.35;
      font-size: ${ms(1)}rem;
    }
  `,
  comment: css`
    font-size: ${ms(-0.5)}rem;
    line-height: 1.41;
    p {
      &:not(:first-of-type) {
        margin-top: ${vr(0.5)}rem;
      }
      max-width: 42ch;
    }
    @media screen and (min-width: 40rem) {
      font-size: ${ms(0.5)}rem;
      line-height: 1.35;
    }
  `,
  link: css`
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  `
}

export const whitespace = {
  padding: css`
    padding: ${vr(0.5)}rem 2.5%;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(-0.5)}rem;
    }
  `
}
