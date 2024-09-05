
import {useRef, useState } from 'react';
import './App.css';
import Dashboard, { TextThoughtContainer, WidgetTile } from './components/dashboard/Dashboard';
import JokeModal from './components/sidebar/Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector } from 'react-redux';
import { addJoke, deleteJoke } from './components/reduxActions/ReduxActions';


type RootState = {
  jokes: {
    jokes: string[]; // Define the type of jokes state here
  };
}



function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  // const [jokes, setJokes] = useState<string[]>(() => {
  //   const storedJokes = localStorage.getItem('jokes');
  //   return storedJokes ? JSON.parse(storedJokes) : [];
  // });

  const addNewJoke = (newJoke: string) => {
    dispatch(addJoke(newJoke));
    notify(); // Assuming notify is a function to show a success message
  }

  const deleteaJoke = (index:number) => {
    dispatch(deleteJoke(index));
    // You can optionally notify or perform any other actions after deleting the joke
  }
  // useEffect(() => {
  //   localStorage.setItem('jokes', JSON.stringify(jokes));
  // }, [jokes]);
  
  const notify = () => toast.success('Joke Added!');

  const jokes = useSelector((state: RootState) => state.jokes.jokes);
  // const addNewJoke = (newJoke: string) => {
  //   setJokes(prevJokes => [...prevJokes, newJoke]);
  //   notify();
  // }
  

  // const deleteJoke = (index:number) => {
  //   setJokes(prevJokes => prevJokes.filter((_, i) => i !== index));
  // }


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
      deleteJoke={deleteaJoke}
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
