import styled from 'styled-components';

import { primaryColor } from '../styles/Global';

export const CustomButton = styled.button`
  cursor: pointer;
  width: auto;
  min-width: 99px;
  height: 40px;
  color : ${props => props.filled ? '#FFFFFF' : '#212124'};
  background: ${props => props.filled ? primaryColor : '#FFFFFF'};
  border: 1px solid ${props => props.filled ? '' : '#D1D3D8'};
  border-radius: 4px;
  line-height: 39px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  &:hover{
    background: ${props => props.filled ? '#A7845B' : '#D1D3D8'};
    transition: .5s;
  }
  .BoardDeleteButton {
    border: 1px solid #FFFFFF;
  }
`;