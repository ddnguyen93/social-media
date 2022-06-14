import { FunctionComponent } from 'react';
import styled from 'styled-components';
import CreateRoomBtn from '../Buttons/CreateRoomBtn';
import JoinRoomBtn from '../Buttons/JoinRoomBtn';
import SignOutBtn from '../Buttons/SignOutBtn';

const Container = styled.div`
	/* background-color: blue; */
	margin-top: 10px;
	flex-grow: 1;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const ActionBar: FunctionComponent = () => {
	return (
		<Container>
			<JoinRoomBtn /> <CreateRoomBtn /> <SignOutBtn />
		</Container>
	);
};

export default ActionBar;
