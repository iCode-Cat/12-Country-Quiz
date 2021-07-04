import Main from "./Components/Main/Main";
import CountyProvider from "./Context/CountyProvider";
import './global.scss'

const App = () => {
  return (
    <CountyProvider>
      <Main />
    </CountyProvider>
  );
};

export default App;
