import React, { useState, useRef } from "react";
import { Pagination, TableContainer } from "@mui/material";
import { AnimationButton, SaveButton, SearchInput, StyledTable, TableCell, TableHeader } from "./styledComponents";
import { Column, FlightData } from "../types/flightsTypes";

export interface flightsProps {
  data: FlightData[];
  columns: Column[];
  saveChanges: () => void;
  updateCell: (rowIndex: number, column: string, value: string) => void;
  editedCells: Set<string>;
}

export const FlightsTable = ({
  data,
  columns,
  saveChanges,
  editedCells,
}: flightsProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [columnOrder, setColumnOrder] = useState<Column[]>(() => {
    const savedOrder = localStorage.getItem('flightsTable-columnOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder) as Column[];
        const columnKeys = new Set(columns.map(col => col.key));
        if (parsedOrder.length === columns.length &&
          parsedOrder.every(col => columnKeys.has(col.key))) {
          return parsedOrder;
        }
      } catch (error) {
        console.warn('Failed to parse saved column order:', error);
      }
    }
    return columns;
  });

  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Column | null>(null);
  const draggedIndex = useRef<number | null>(null);

  React.useEffect(() => {
    localStorage.setItem('flightsTable-columnOrder', JSON.stringify(columnOrder));
  }, [columnOrder]);

  React.useEffect(() => {
    setColumnOrder(prevOrder => {
      const newColumns = columns.filter(col =>
        !prevOrder.some(prevCol => prevCol.key === col.key)
      );
      const existingColumns = prevOrder.filter(prevCol =>
        columns.some(col => col.key === prevCol.key)
      );
      return [...existingColumns, ...newColumns];
    });
  }, [columns]);

  const handleDragStart = (e: React.DragEvent, column: Column, index: number) => {
    setDraggedColumn(column);
    draggedIndex.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', column.key);

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragOver = (e: React.DragEvent, column: Column) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(column);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumn: Column, targetIndex: number) => {
    e.preventDefault();

    if (!draggedColumn || draggedIndex.current === null) return;

    const newColumnOrder = [...columnOrder];
    const draggedIdx = draggedIndex.current;

    newColumnOrder.splice(draggedIdx, 1);

    newColumnOrder.splice(targetIndex, 0, draggedColumn);
    setColumnOrder(newColumnOrder);
    setDraggedColumn(null);
    setDragOverColumn(null);
    draggedIndex.current = null;
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
    draggedIndex.current = null;
  };

  const resetColumnOrder = () => {
    setColumnOrder(columns);
    localStorage.removeItem('flightsTable-columnOrder');
  };

  const renderCell = (rowIndex: number, row: FlightData, column: Column) => {

    const col = columns.find(col => col.key === column.key);
    if (!col) return;
    return col.render?.(row, rowIndex, column.key);
  };
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columnOrder.map((column, index) => (
              <TableHeader
                key={column.key}
                draggable
                onDragStart={(e) => handleDragStart(e, column, index)}
                onDragOver={(e) => handleDragOver(e, column)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column, index)}
                onDragEnd={handleDragEnd}
                style={{
                  cursor: 'grab',
                  backgroundColor: dragOverColumn?.key === column.key ? '#214f80' : 'white',
                  transition: 'background-color 0.2s ease',
                  color: dragOverColumn?.key === column.key ? 'white' : 'black',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '12px', opacity: 0.6 }}>⋮⋮</span>
                  <span>{column.label}</span>
                </div>
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice((page - 1) * pageSize, page * pageSize).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnOrder.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column.key}`}
                  isEdited={editedCells.has(`${rowIndex}-${column.key}`)}
                >

                  {renderCell(rowIndex, row, column)}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination
        count={Math.ceil(data.length / pageSize)} page={page} onChange={(e, page) => { setPage(page) }}
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '20px',
        }}
      />
    </TableContainer>
  );
};