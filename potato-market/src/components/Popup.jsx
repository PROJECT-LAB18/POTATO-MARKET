import styled from "styled-components";

import { primaryColor, gray4 } from "@/styles/global";

function Popup({ text, onClose }) {
  return (
    <PopWrapper>
      <div className="pop">
        <p>{text}</p>
        <button type="button" onClick={onClose}>
          확인
        </button>
      </div>
    </PopWrapper>
  );
}

export const PopWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
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
      border-top: 1px solid ${gray4};
      background-color: white;
      text-align: center;
      color: ${primaryColor};
      width: 100%;
      line-height: 30px;
      font-weight: 700;
      margin-bottom: 10px;
      padding-top: 10px;
    }
  }
`;

export default Popup;