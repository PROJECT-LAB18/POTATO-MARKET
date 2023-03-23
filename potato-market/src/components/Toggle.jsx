import { Link } from 'react-router-dom';

import styled from "styled-components";

import toggleBox from "@/assets/header_toggle.svg";

function Toggle(){
  return (
		<Div>
			<ul>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<li><Link className="textLink" to={"/SignIn"}>로그인</Link></li>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<li><Link className="textLink" to={"/SignUp"}>회원가입</Link></li>
			</ul>
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
	right: 555px;
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