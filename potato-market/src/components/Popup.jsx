import styled from 'styled-components';

import { gray2 } from '../styles/Global';

import { primaryColor } from '@/styles/global';

function Popup({ text, showPopup, setShowPopup }) {
  const onClose = () => {
    setShowPopup(!showPopup);
  }
  return (
    <PopWrapper>
      <div className="pop">
        <p>{text}</p>
        <button type="button" onClick={onClose}>확인</button>
      </div>
    </PopWrapper>
  )
};

const PopWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.4);
  .pop {
    width: 320px;
    min-height: 80px;
    background-color: white;
    border-radius: 10px;
    p {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 30px;
      padding: 20px 0;
    }
    button {
      display: block;
      border: none;
      border-top: 1px solid ${gray2};
      background-color: white;
      text-align: center;
      color: ${primaryColor};
      width: 100%;
      line-height: 30px;
      font-weight: 700;
      margin: 10px 0;
    }
  }
`


export default Popup;