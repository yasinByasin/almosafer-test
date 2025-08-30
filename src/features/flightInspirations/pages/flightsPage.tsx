import React, { useEffect, useState } from 'react';
import { useFlights } from '../hooks/useFlights';
import { FlightsTable } from '../components/flightsTable';
import { Column, FlightData, GetFlightsParams } from '../types/flightsTypes';
import { DateCell } from '../components/dateCell';
import { FilterForm } from '../components/filterForm';
import { AnimationButton } from '../components/styledComponents';
export const FlightsPage: React.FC = () => {
  const {
    flightsData,
    isLoading,
    error,
    fetchFlights,
    saveChanges,
    updateCell,
    editedCells,
    setParams,
  } = useFlights();

  const [showFilterForm, setShowFilterForm] = useState(false);


  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);


  const inputField = (value: string, rowIndex: number, columnKey: string) => {
    return <input
      value={value}
      onChange={(e) =>
        updateCell(rowIndex, columnKey, e.target.value)
      }
      style={{
        border: "none",
        background: "transparent",
        width: "100%",
        padding: "10px 0px 10px 10px",
      }}
    />
  }

  const renderDateCell = (value: string, rowIndex: number, columnKey: string) => {
    return <DateCell
      value={value}
      onChange={(value) =>
        updateCell(rowIndex, columnKey, value)
      }
    />
  }

  const columns: Column[] = [
    {
      label: "Type",
      key: "type",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return inputField(row.type, rowIndex, columnKey)
      },
    },
    {
      label: "Origin",
      key: "origin",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return inputField(row.origin, rowIndex, columnKey)
      },
    },
    {
      label: "Destination ",
      key: "destination",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return inputField(row.destination, rowIndex, columnKey)
      },
    },
    {
      label: "Departure Date",
      key: "departureDate",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return renderDateCell(row.departureDate, rowIndex, columnKey)
      },
    },
    {
      label: "Return Date",
      key: "returnDate",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return renderDateCell(row.returnDate, rowIndex, columnKey)
      },
    },
    {
      label: "Price",
      key: "price",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return <div>
          {inputField(row.price.total, rowIndex, columnKey)}
        </div>
      },
    },
    {
      label: "Links",
      key: "links",
      render: (row: FlightData, rowIndex: number, columnKey: string) => {
        return <a href={row.links.flightOffers} target="_blank" rel="noopener noreferrer">Link</a>;
      },
    },

  ];

  const handleSearch = async (params: GetFlightsParams) => {
    await setParams(params);
    fetchFlights();
  }

  const renderHeader = () => {
    return <>
      <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
        <AnimationButton onClick={() => setShowFilterForm(!showFilterForm)}>{showFilterForm ? "Hide Filter Form" : "Show Filter Form"}</AnimationButton >
        <AnimationButton onClick={saveChanges}>Save</AnimationButton>
      </div>
      <FilterForm onSearch={handleSearch} isVisible={showFilterForm} />
    </>
  }
  const renderPage = () => {
    if (isLoading) {
      return <h1>Loading flights...</h1>
    }
    if (error) {
      return <h3 style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        width: "100%",
        color: "lightred"
      }}>Oh no! {error.message}</h3>
    }
    return <FlightsTable
      data={flightsData}
      columns={columns}
      saveChanges={saveChanges}
      updateCell={updateCell}
      editedCells={editedCells}
    />
  }
  return (
    <div>
      {flightsData && (
        <div style={{ marginTop: "20px" }}>
          {renderHeader()}
          {renderPage()}
        </div>
      )}
    </div>
  );
};
