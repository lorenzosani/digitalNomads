import React from "react";
import { Heading, Box, Grommet } from "grommet";
import { HotelSearch } from "./HotelSearch";

function App() {
  const theme = {
    global: {
      colors: {
        brand: "#7D4CDB"
      },
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px"
      }
    },
    select: {
      icons: {
        color: "dark-3"
      }
    }
  };

  const AppBar = props => (
    <Box
      direction="row"
      align="center"
      justify="between"
      background="white"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      style={{ zIndex: "1" }}
      {...props}
    />
  );

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level="4" margin="none" color="dark-3">
            Random app for Digital Nomads
          </Heading>
        </AppBar>
        <Box
          flex
          overflow="auto"
          gap="medium"
          pad="medium"
          background="light-3"
        >
          <Box
            flex={false}
            overflow="auto"
            round="large"
            background="light-4"
            direction="row"
            align="center"
            pad={{ horizontal: "medium", vertical: "small" }}
            margin={{ horizontal: "medium", top: "medium" }}
            style={{ fontSize: "smaller" }}
          >
            Current API: Amadeus
          </Box>
          <HotelSearch />
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
