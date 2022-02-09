import styled from "styled-components";

export const Grid = styled.div<{
  xs?: number;
  sm?: number;
  container?: boolean;
  alignItems?: string;
  justify?: string;
}>`
  width: 100%;
  ${(props) => props.container && `display: flex;`}
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: ${(props) => props.alignItems || "flex-start"};
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  flex-grow: 0;
  max-width: ${(props) => (100 / 12) * (props.xs || 12)}%;
  flex-basis: ${(props) => (100 / 12) * (props.xs || 12)}%;
  ${(props) => props.sm && `max-width: ${(100 / 12) * (props.sm || 12)}%;`}
  ${(props) => props.sm && `flex-basis: ${(100 / 12) * (props.sm || 12)}%;`}
`;
