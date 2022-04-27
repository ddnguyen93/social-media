import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 600px;
	width: 1000px;
	border: solid 2px;
`;

const Lobby: FunctionComponent = () => {
	return <Container>Lobby</Container>;
};

export default Lobby;
