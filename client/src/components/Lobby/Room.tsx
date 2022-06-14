import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { LobbyContext } from '../../contexts/LobbyContext';

interface RoomProps {
	roomName: string;
	userCount: number;
	inGame: boolean;
}

interface RowProps {
	bgColor: string | null;
}

const Row = styled.tr`
	height: 20px;
	&:nth-child(2n) {
		background-color: #aa7fa3;
	}

	&:nth-child(2n + 1) {
		background-color: #ce81a5;
	}

	&:hover {
		background-color: #974b75;
	}

	background-color: ${(props: RowProps) => props.bgColor} !important;
	color: white;
`;

interface CellProps {
	fontColor?: string;
	outline: boolean;
}

const Cell = styled.td`
	text-align: center;
	color: ${(props: CellProps) => props.fontColor};
	border: 1px solid #ff9797;

	text-shadow: ${(props: CellProps) =>
		props.outline
			? '-1px -1px 0 #3b3b3b, 1px -1px 0 #3b3b3b, -1px 1px 0 #3b3b3b, 1px 1px 0 #3b3b3b'
			: '-1px -1px 0 #000000b3, 1px -1px 0 #000000b3, -1px 1px 0 #000000b3, 1px 1px 0 #000000b3'};
`;

const Room: FunctionComponent<RoomProps> = ({
	roomName,
	userCount,
	inGame,
}) => {
	const { roomClicked, setRoomClicked } = useContext(LobbyContext)!;

	return (
		<Row
			onClick={() => setRoomClicked(roomName)}
			bgColor={roomClicked === roomName ? '#473333' : null}
		>
			<Cell outline={true}>{roomName}</Cell>
			<Cell outline={true}>{`${userCount}/4`}</Cell>
			<Cell outline={false} fontColor={inGame ? '#ff0000' : '#00ff00'}>
				{inGame ? 'In Game' : 'Waiting'}
			</Cell>
		</Row>
	);
};

export default Room;
