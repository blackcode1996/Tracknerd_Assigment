import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import AllRoutes from './Pages/AllRoute/AllRoute';
import { ReactComponent as MySVG } from "./logo.svg";
import ScrollToTop from 'react-scroll-to-top';

function App() {
  return (
    <div className="App">
     <ChakraProvider>
     <ScrollToTop style={{background:"gray",borderRadius:"20px"}} smooth  component={<MySVG />}/>
        <AllRoutes/>
     </ChakraProvider>
    </div>
  );
}

export default App;
