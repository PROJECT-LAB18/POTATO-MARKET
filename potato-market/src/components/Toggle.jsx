/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toggle } from '../stores/toggle';
import { userId } from '../stores/userAuth';

import toggleBox from "@/assets/header_toggle.svg";
import LogoutButton from '@/components/LogoutButton';

const navigate = useNavigate;

function Toggle(){

	const [login, setLogin] = useRecoilState(userId);
	const [toggle, setToggle] = useRecoilState(toggle);
  
	const handleLogout = () => {
		setToggle(true);
		navigate('/');
	}

	return (
		<Div>
			{ login === null ? 
				(
					<ul>
						<li><Link className="textLink" to={"/SignIn"}>로그인</Link></li>
						<li><Link className="textLink" to={"/SignUp"}>회원가입</Link></li>
					</ul>
				) 
				:
				(
					<ul>
						<li><LogoutButton onClick={handleLogout}/></li>
						<li><Link className="textLink" to={"/myPage"}>마이페이지</Link></li>
					</ul>
				)
			}
		</Div>
	)
};

const Div = styled.div`
  background-image: url(${toggleBox});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 213px;
	height: 135px;
	position: absolute;
	right: 468px;
	top: 53px;
	padding : 32px 40px;
	box-sizing: border-box;
	z-index: 100;
	
	ul {
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 2.2rem;
	}

	.textLink {
			text-decoration: none;
			color: #212325;

			&:focus, &:hover, &:visited, &:link, &:active {
				text-decoration: none;
			}
	}
	
`;

export default Toggle;
