import React, { useContext } from 'react';
import MainHeader from '../Header/MainHeader';
import Questions from '../Questions/Questions';
import { countryContext } from '../../Context/CountyProvider';
import './main.scss';
import Result from '../Results/Result';
const Main = () => {
  const { answer } = useContext(countryContext);
  const correct = answer[0].correct;
  return (
    <>
      <main className='main'>
        <article className='main-article'>
          <MainHeader correct={correct} />
          <section className={`main-questions-container`}>
            {correct === false ? <Result /> : <Questions />}
          </section>
        </article>
      </main>
      <footer>created by iCode-Cat - devChallenges.io</footer>
    </>
  );
};

export default Main;
