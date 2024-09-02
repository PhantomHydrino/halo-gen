
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Dashboard, { TextThoughtContainer, WidgetTile } from './components/dashboard/Dashboard';
import JokeModal from './components/sidebar/Sidebar';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [jokes, setJokes] = useState<string[]>(() => {
    const storedJokes = localStorage.getItem('jokes');
    return storedJokes ? JSON.parse(storedJokes) : [];
  });


  useEffect(() => {
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }, [jokes]);
  
  const notify = () => toast.success('Joke Added!');


  const addNewJoke = (newJoke: string) => {
    setJokes(prevJokes => [...prevJokes, newJoke]);
    notify();
  }
  

  const deleteJoke = (index:number) => {
    setJokes(prevJokes => prevJokes.filter((_, i) => i !== index));
  }


  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
      setIsModalOpen(false);
  }



  return (
    <div className="App" 
    style={{
      
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      }}>
      <Dashboard 
      jokes={jokes}
      deleteJoke={deleteJoke}
      children={
          <WidgetTile
            style={{ cursor: "pointer" }}
            onClick={openModal}
          >
            <div style={{
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <TextThoughtContainer
                style={{
                  fontSize: "7em",
                  fontWeight: "bold",
                  userSelect: "none"
                }}
              >
                +
              </TextThoughtContainer>
            </div>
          </WidgetTile>
        }
      />
       
      <JokeModal addNewJoke={addNewJoke} ref={boxRef} isOpen={isModalOpen} onClose={closeModal}/>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />


    </div>
  );
}

export default App;
