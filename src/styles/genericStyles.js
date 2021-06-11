import React from "react";
import { Button, Card, Checkbox } from "@material-ui/core";
import styled from "styled-components";
import colors from "./colors";
import { withStyles } from "@material-ui/core/styles";

export const GreenCheckbox = withStyles({
  root: {
    color: colors.default,
    "&$checked": {
      color: colors.selected,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const StyledButton = styled(Button)`
  background: ${colors.default};
  color: white;

  &:hover {
    background: ${colors.selected};
  }
`;

export const Space = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    margin-right: 16px;
  }
`;

export const StyledCard = styled(Card)`
  background-color: ${(props) =>
    props.selected ? colors.selected : colors.default};

  &:hover {
    background-color: ${(props) =>
      props.selected ? colors.selected : colors.hover};
  }
`;
export const BackgroundImageDiv = styled.div`
  color: white;
  height: 100%;
  background-image: ${(props) => props.src};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ContainerDiv = styled.div`
  padding-top: 64px;
  height: 100%;
`;

export const BodyWithPadding = styled.div`
  padding: ${(props) => props.padding};
`;
