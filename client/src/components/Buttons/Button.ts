import styled from 'styled-components';

interface ButtonProps {
	height?: string;
	width?: string;
}

export const Button = styled.button`
	width: ${(props: ButtonProps) => props.width};
`;
