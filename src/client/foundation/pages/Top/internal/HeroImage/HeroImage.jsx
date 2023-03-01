import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  height: auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return (
    <Image
      alt=""
      height={734}
      src={url.replace(/(.+)\.jpg/, "$1.webp")}
      width={1024}
    />
  );
};
