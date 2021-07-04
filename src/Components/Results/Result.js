import React, { useContext } from 'react';
import { countryContext } from '../../Context/CountyProvider';
import logo from '../../undraw_winners_ao2o 2.svg';
const Result = () => {
  const { answer, setAnswer, getData } = useContext(countryContext);
  const { score } = answer[0];

  return (
    <section className='result-container'>
      <img src={logo} alt='logo' className='result-img' />
      <p className='result-title'>Results</p>
      <p className='result-score'>
        You got <span className='result-score-num'>{score}</span> correct
        answers
      </p>
      <button
        onClick={() => {
          getData();
          answer[0].correct = null;
          answer[0].score = 0;
          setAnswer([...answer]);
        }}
        className='result-button'
      >
        Try again
      </button>
    </section>
  );
};

export default Result;
