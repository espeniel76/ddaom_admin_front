import React, { useRef, useContext } from "react";
import { UserContext } from "../store/users";
import { Card, Col, Row } from "reactstrap";
import logo200Image from "assets/img/logo/logo_200.png";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { Ajax } from "../utils/ajax";
import { HttpMethod } from "../models/consts";
import { useHistory } from "react-router-dom";
import define from "../define/define";
import jwtDecode from "jwt-decode";

const AuthPage = () => {
	const refUserId = useRef(null);
	const refPassword = useRef(null);
	const ctx = useContext(UserContext);

	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		const UserId = refUserId.current;
		const Password = refPassword.current;

		if (UserId.value.length < 2) {
			alert("아이디를 입력 하세요.");
			UserId.focus();
			return false;
		}

		if (Password.value.length < 2) {
			alert("비밀번호를 입력 하세요.");
			Password.focus();
			return false;
		}

		let result = await Ajax.run({
			url: "auth/login",
			method: HttpMethod.POST,
			data: {
				UserId: UserId.value,
				Password: Password.value,
			},
		});

		if (result.ResultCode === define.OK) {
			try {
				ctx.tokenInfos = result.Data;
				ctx.tokenParse = jwtDecode(result.Data.AccessToken);
				sessionStorage.setItem("AccessToken", result.Data.AccessToken);
				sessionStorage.setItem("RefershToken", result.Data.RefershToken);
				sessionStorage.setItem("tokenParse", JSON.stringify(ctx.tokenParse));

				history.push("/");
			} catch (e) {
				alert("할당된 토큰 파싱에 실패 하였습니다.");
				return false;
			}
		} else {
			alert("존재하지 않는 계정 입니다.");
			return false;
		}
	}

	return (
		<Row
			style={{
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Col md={6} lg={4}>
				<Card body>
					<Form onSubmit={handleSubmit}>
						<div className="text-center pb-4">
							<img
								src={logo200Image}
								className="rounded"
								style={{ width: 60, height: 60, cursor: "pointer" }}
								alt="logo"
							/>
						</div>
						<FormGroup>
							<Label>User ID</Label>
							<input type="text" className="form-control" placeholder="Input Your ID" ref={refUserId}></input>
						</FormGroup>
						<FormGroup>
							<Label>Password</Label>
							<input
								type="password"
								className="form-control"
								placeholder="Input Your Password"
								ref={refPassword}
							></input>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<input type="checkbox" className="form-check-input" />
								Remember me
							</Label>
						</FormGroup>
						<hr />
						<Button size="lg" className="bg-gradient-theme-left border-0" block>
							Login
						</Button>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

export default AuthPage;
