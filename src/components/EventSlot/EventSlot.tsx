import styled from "@emotion/styled";

type Styling = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const EventContainer = styled.div<Styling>`
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
  styling: Styling;
}
export const EventSlot = ({ id, styling }: EventProps) => {
  const { top, left, height, width } = styling;
  return (
    <EventContainer top={top} left={left} height={height} width={width}>
      {id}
    </EventContainer>
  );
};
