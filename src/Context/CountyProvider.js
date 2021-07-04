import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const countryContext = createContext();

const CountyProvider = (props) => {
  const [mainCountry, setMainCountry] = useState([]);
  const [callData, setCallData] = useState([]);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState([
    {
      score: 0,
      correct: null,
    },
  ]);
  const [answered, setAnswered] = useState([]);
  let numbersArray = [];
  // Return a number randomly
  const randomNumber = (num) => {
    for (let i = 0; i < num; i++) {
      if (!answered.find((past) => past === i) && i !== 0) {
        numbersArray.push(i);
      }
    }
    const shuffledArray = numbersArray.sort((a, b) => 0.5 - Math.random());
    return shuffledArray;
  };

  // Call Country Data
  const getData = async () => {
    if (callData.length < 1) return;
    try {
      let updatedStates = [];
      const dataLength = callData.data.length;
      const data = callData.data;
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
      setAnswered([...answered, numbersArray[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  const dataHandler = async () => {
    try {
      const get = await axios.get(
        'https://restcountries.eu/rest/v2/region/europe'
      );
      setCallData(get);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [callData]);

  useEffect(() => {
    dataHandler();
  }, [0]);

  return (
    <countryContext.Provider
      value={{
        callData,
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
