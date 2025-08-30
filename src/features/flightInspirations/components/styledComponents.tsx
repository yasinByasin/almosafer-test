import styled from '@emotion/styled';

export const TableContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
`;

export const TableHeader = styled.th`
  background: #f5f5f5;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

export const TableCell = styled.td<{ isEdited?: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background: ${({ isEdited }) => (isEdited ? '#fff9c48f' : 'inherit')};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background: #1565c0;
  }
`;

export const ResetColumnOrderButton = styled.button`
  padding: 10px 20px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background: #e9e9e9;
  }
`;

// Filter Form Components
export const FilterFormContainer = styled.div`
  margin-top: 10px;
  // background: linear-gradient(135deg, #667eea 0%,rgb(33, 43, 51) 100%);
  background: #dedede;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
`;

export const FilterFormTitle = styled.h2`
  margin: 0 0 20px 0;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const FilterFormFields = styled.div`
  display: flex;
  gap: 20px;
  align-items: end;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterFormField = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const FilterFormLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const FilterFormInput = styled.input<{ isOrigin?: boolean }>`
  padding: 8px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  font-weight: 500;
  
  ${({ isOrigin }) => isOrigin && `
    text-transform: uppercase;
    letter-spacing: 1px;
  `}
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const AnimationButton = styled.button`
  padding: 12px ;
  background: linear-gradient(135deg,#0359aa 0%, #0558ae 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg,rgb(22, 78, 121) 0%,#214f80 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
