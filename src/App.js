// import logo from './logo.svg';
// import './App.css';
// import Navbar from './components/Neavbar';
// import Hero from './components/Herosection';
// import ImageSlider from './components/imageslider';
// import ExperienceAndSkills from './components/experience';
// import BannerSlider from './components/BannerImages';
// import Footer from './components/Footer';
// function App() {
//   return (
//     <>
      
//       <div className='bg-black min-h-screen'>
//         <Navbar/>
//           <Hero/>
//           <BannerSlider />
//           <ImageSlider/>
//           <ExperienceAndSkills/>
//           <Footer/>
//       </div>
      
//     </>
//   );
// }

// export default App;



import './App.css';
import Navbar from './components/Neavbar';
import Hero from './components/Herosection';
import ImageSlider from './components/imageslider';
import ExperienceAndSkills from './components/experience';
import BannerSlider from './components/BannerImages';
import Footer from './components/Footer';

// 1. Import the floating chat widget component here
import FloatingChatWidget from './components/FloatingChatWidget';

function App() {
  return (
    <>
      <div className='bg-black min-h-screen relative'>
        <Navbar/>
        <Hero/>
        <BannerSlider />
        <ImageSlider/>
        <ExperienceAndSkills/>
        <Footer/>

        {/* 2. Place the widget here inside the main wrapper */}
        <FloatingChatWidget />
      </div>
    </>
  );
}

export default App;