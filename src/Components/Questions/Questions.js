import React, { useContext, useState, useEffect } from 'react';
import { countryContext } from '../../Context/CountyProvider';

const optionAlphabets = [
  {
    alphabet: 'A',
  },
  {
    alphabet: 'B',
  },
  {
    alphabet: 'C',
  },
  {
    alphabet: 'D',
  },
];

const Questions = () => {
  const { getData, options, setAnswer, answer, loading } =
    useContext(countryContext);
  const question = options.find((option) => option.isCorrect);

  const [result, setResult] = useState([null]);
  const [random, setRandom] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const questionHandler = () => {
    const randomNumber = Math.floor(Math.random() * 2);
    setRandom(randomNumber);
  };

  useEffect(() => {
    questionHandler();
  }, []);
  return (
    <>
      {question !== undefined && (
        <section className='main-questions'>
          {random === 0 ? (
            <div className='question-capital'>
              <div className='flag-gap'></div>
              <h1 className='question-text'>
                {question.capital} is the capital of
              </h1>
            </div>
          ) : (
            <div className='question-flag'>
              <img
                width='100px'
                src={question.flag}
                className='question-flag'
                alt='flag'
              />
              <h1 className='question-text'>
                Which country does this flag belong to?
              </h1>
            </div>
          )}
          {options.map((option, index) => (
            <div key={index} className={`main-question-box`}>
              <div
                onClick={() => {
                  setResult({
                    status: true,
                    finished: true,
                    index,
                  });
                  if (option.isCorrect === question.isCorrect) {
                    answer[0].score = answer[0].score + 1;
                    setAnswerCorrect(true);
                    return;
                  }
                  setAnswerCorrect(false);
                }}
                className={`main-question ${
                  option.isCorrect && result.status && 'correct'
                } ${
                  !option.isCorrect &&
                  result.status &&
                  result.index === index &&
                  'incorrect'
                }
            ${result.finished && 'disable-events'}
            `}
              >
                <p className='main-question-alphabet'>
                  {optionAlphabets[index].alphabet}
                </p>
                <p className='main-question-option'>{option.name}</p>
              </div>
            </div>
          ))}
          <button
            className={`next-button ${
              answerCorrect !== null ? 'active' : 'disable'
            }`}
            onClick={() => {
              if (answerCorrect) {
                getData();
                questionHandler();
              }
              setResult([null]);
              setAnswerCorrect(null);
              answer[0].correct = answerCorrect;
              setAnswer([...answer]);
            }}
          >
            NEXT
          </button>
        </section>
      )}
    </>
  );
};

export default Questions;
