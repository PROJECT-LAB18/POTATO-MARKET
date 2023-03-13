
import styled from 'styled-components'



import hambuger_menu from '@/assets/hambuger_menu.svg'
import { gray1, gray5, gray6, gray8 } from '../../styles/Global'

const FadeAnimationMenu = styled.button`
border: none;
background-color: transparent;
display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 0 10px;
    width: 24px;
    height: 24px;
  &:hover:active{
    background-color: ${gray5};
    background-size: 100%;
    transition: background-color 1s ease-out;
  } 
`


const ToggleItem = styled.ul`
    position: absolute;
    right: 0;
    top: 58px;
    border: 1px solid ${gray6};
    border-radius: 8px;
    padding: 10px;
    font-size: .875rem;
    background-color:${gray1};
    color: ${gray8};
    will-change: opacity;
    animation: 0.3s ease-in 0s 1 normal none running fadeIn;
    z-index: 999;
    li{
      padding: 6px;
    }
`


export default function HambugerMenu({isToggleOpen,setIsToggleOpen}) {
  const handleClick=()=>{
    setIsToggleOpen(!isToggleOpen)
  }
  return (
    <>
  <FadeAnimationMenu type='button' onClick={handleClick}>
    <img src={hambuger_menu} alt="더보기" />
    </FadeAnimationMenu>
 
  {
    isToggleOpen && <ToggleItem>
      <li>알림음 끄기</li>
      <li>대화상대 차단하기</li>
      <li>채팅방 나가기</li>
    </ToggleItem>
    }
  
  </>
  )
}

