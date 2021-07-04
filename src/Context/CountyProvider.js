import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const countryContext = createContext();

const CountyProvider = (props) => {
  const [mainCountry, setMainCountry] = useState([]);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState([
    {
      score: 0,
      correct: null,
    },
  ]);

  // Return a number randomly
  const randomNumber = (num) => {
    let numbersArray = [];
    for (let i = 0; i < num; i++) {
      numbersArray.push(i);
    }
    const shuffledArray = numbersArray.sort((a, b) => 0.5 - Math.random());
    return shuffledArray;
  };

  // Call Country Data
  const getData = async () => {
    try {
      let updatedStates = [];
      const get = await axios.get('https://restcountries.eu/rest/v2/all');
      const dataLength = get.data.length;
      const data = get.data;
      // Push countries
      randomNumber(dataLength).map((num, index) => {
        const { name, capital, flag, numericCode } = data[num];
        const updated = { name, capital, flag, numericCode, isCorrect: false };
        // Choose main country.
        if (index === 0) {
          updated.isCorrect = true;
          setMainCountry({
            updated,
          });
          // Push main country to the options
          updatedStates.push(updated);
          return;
        }
        // Choose options.
        if (index < 4) {
          // Push Random options
          updatedStates.push(updated);
        }
      });
      // Set all options into one
      setOptions(updatedStates.sort((a, b) => 0.5 - Math.random()));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <countryContext.Provider
      value={{
        mainCountry,
        setMainCountry,
        getData,
        options,
        answer,
        setAnswer,
      }}
    >
      {props.children}
    </countryContext.Provider>
  );
};

export default CountyProvider;
