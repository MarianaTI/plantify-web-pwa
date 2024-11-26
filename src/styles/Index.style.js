import styled from "@emotion/styled";

export const DescriptionStyled = styled.p`
  min-height: 80px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationContainer = styled.div`
  background-color: var(--secondary-400);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: var(--neutral);
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;