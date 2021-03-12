import React, { useState, useEffect } from "react";
import { Box, Select, Text, Heading } from "grommet";
import Loader from "react-loader-spinner";

const availableCities = {
  London: { name: "London", code: "LON" },
  Nice: { name: "Nice", code: "NCE" },
  Paris: { name: "Paris", code: "PAR" },
  Sydney: { name: "Sydney", code: "SYD" },
  "New York": { name: "New York", code: "NYC" },
  Bangkok: { name: "Bangkok", code: "BKK" }
};

export const HotelSearch = () => {
  const [selectedCity, setSelectedCity] = useState(availableCities["London"]);
  const [offers, setOffers] = useState();
  const Amadeus = require("amadeus");

  const amadeus = new Amadeus({
    clientId: "TWq9Diwwhfw24MGXZkPRqxj0k6fXqyyc",
    clientSecret: "gTRrTEiXfyNpR31S"
  });

  const fetchHotelsData = cityData => {
    setOffers(null);
    // Get list of Hotels by city code
    amadeus.shopping.hotelOffers
      .get({
        cityCode: cityData.code
      })
      .then(function (response) {
        console.log(response.data);
        setOffers(response.data);
      })
      .catch(function (response) {
        console.error(response);
      });
  };

  useEffect(() => {
    fetchHotelsData(availableCities["London"]);
  }, []);

  return (
    <Box
      direction="row-responsive"
      flex
      overflow={{ horizontal: "hidden" }}
      background="light-3"
    >
      <Box
        height="225px"
        width="25vw"
        overflow="auto"
        round="medium"
        background="white"
        direction="column"
        align="center"
        pad={{ horizontal: "medium", vertical: "medium" }}
        margin={{ horizontal: "medium", top: "medium" }}
      >
        <Box pad={{ horizontal: "medium", vertical: "medium" }}>
          <Text>Select a city</Text>
        </Box>
        <Select
          options={Object.keys(availableCities)}
          value={selectedCity.name}
          onChange={({ option }) => {
            console.log(availableCities[option]);
            setSelectedCity(availableCities[option]);
            fetchHotelsData(availableCities[option]);
          }}
          color="light-4"
        />
      </Box>
      <Box width="75vw" align="center">
        {!offers && (
          <Box flex align="center" justify="center">
            <Loader type="TailSpin" color="#CBCBCB" height={80} width={80} />
          </Box>
        )}
        {offers && (
          <Box flex={false} direction="row-responsive" wrap>
            {offers.map(offer => (
              <Box
                height="225px"
                flex="grow"
                gap="small"
                margin="medium"
                background="white"
                round="medium"
                pad={{ horizontal: "medium", vertical: "medium" }}
              >
                <Heading level="4" color="dark-2" margin="none">
                  {offer.hotel.name}
                </Heading>
                <br />
                <Text size="small" color="dark-6">
                  Offers Available
                </Text>
                <Text size="small" color="dark-4" weight="bold">
                  {offer.offers[0].checkInDate} - {offer.offers[0].checkOutDate}
                </Text>
                <Text size="medium" color="dark-2" weight="bold">
                  {offer.offers[0].price.currency +
                    " " +
                    offer.offers[0].price.total}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
