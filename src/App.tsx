import React from 'react';
import Header from './components/Header';
import PizzaMakerText from './components/PizzaMakerText';
// import AppDragDropDemo from './components/Sample';

function App() {
  return (
    <div className='font-[Arimo]'>
      <header >

        <Header />
        <PizzaMakerText/>
        {/* <AppDragDropDemo/> */}
      </header>
    </div>
  );
}

export default App;
