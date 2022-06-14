import { FunctionComponent, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { SocketContext } from '../../contexts/socket';

interface RoomListType {
	[key: string]: {
		userCount: number;
		inGame: boolean;
	};
}

interface HeaderProps {
	width: string;
}

const RoomTable = styled.table`
	table-layout: fixed;
	border-collapse: collapse;
	width: 100%;
	max-height: 100%;
`;

const TableBody = styled.tbody``;

const TableHeader = styled.thead`
	font-size: 1.5rem;
	background-color: #3a0000;
	height: 30px;
	color: #f0d3fd;
`;

const HeaderRow = styled.tr``;

const TableCategory = styled.th`
	width: ${(props: HeaderProps) => props.width};
	background-color: #3a0000;
	position: sticky;
	top: 0;
`;

const Rooms: FunctionComponent = () => {
	const [roomList, setRoomList] = useState<RoomListType>({});

	const { socket } = useContext(SocketContext)!;

	useEffect(() => {
		socket.emit('room-list');
	}, [socket]);

	socket.on('refresh-room-list', (list) => {
		setRoomList(list);
	});

	// const roomList: RoomListType = {
	// 	'Room 1': { userCount: 4, inGame: false },
	// 	'Room 2': { userCount: 3, inGame: true },
	// };

	return (
		<RoomTable>
			<TableHeader>
				<HeaderRow>
					<TableCategory width="60%">Room</TableCategory>
					<TableCategory width="20%">Capacity</TableCategory>
					<TableCategory width="20%">Status</TableCategory>
				</HeaderRow>
			</TableHeader>
			<TableBody>
				{Object.entries(roomList).map((roomData) => {
					return (
						<Room
							roomName={roomData[0]}
							userCount={roomData[1].userCount}
							inGame={roomData[1].inGame}
						/>
					);
				})}
			</TableBody>
		</RoomTable>
	);
};

export default Rooms;
