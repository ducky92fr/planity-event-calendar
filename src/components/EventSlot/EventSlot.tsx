import styled from "@emotion/styled";

type Position = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const EventContainer = styled.div<Position>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  height: ${({ height }) => `${height}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  background-color: lightblue;
  border: 1px solid blue;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EventProps {
  id: number;
  position: Position;
}

export const EventSlot = ({ id, position }: EventProps) => {
  const { top, left, height, width } = position;
  return (
    <EventContainer top={top} left={left} height={height} width={width}>
      {id}
    </EventContainer>
  );
};
