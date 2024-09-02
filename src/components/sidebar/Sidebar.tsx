import styled from "styled-components";
import { AiFillCloseSquare } from "react-icons/ai";


interface Props{
    ref?:React.RefObject<HTMLDivElement>
    addNewJoke?: (newJoke: string) => void;
    isOpen:boolean 
    onClose: () => void;
}

const JokeModal: React.FC<Props> = ({addNewJoke,ref,isOpen,onClose}) => {
    

    const handleSubmit = () =>{
        const newJoke = (document.querySelector('textarea') as HTMLTextAreaElement).value;
        if (newJoke.trim() !== "") {
            addNewJoke ? addNewJoke(newJoke) : console.log("noJokeHere");
            (document.querySelector('textarea') as HTMLTextAreaElement).value = '';
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const newJoke = event.currentTarget.value;
        if (event.key === 'Enter' && newJoke.trim() !== "") {
            addNewJoke?addNewJoke(newJoke):console.log("noJokeHere"); // Call the addNewJoke function from the custom hook
            event.currentTarget.value = '';
        }
    };

    const handleSidebarContentClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
    };

    return (
        <JokeModalContainer
        style={{
            visibility: isOpen ? "visible" : "hidden"
        }}
        onClick={onClose}
        >
            <JokeModalContent
                ref={ref}
                onClick={handleSidebarContentClick}
            >
                <div 
                    style={{
                        display:"flex",
                        alignSelf:"flex-end",
                        top:"-10%",
                        position:"relative",
                        margin:10,
                    }}
                    onClick={onClose}
                >
                    <AiFillCloseSquare color="red" size={40}/>
                </div>
                <InputStyle placeholder="Type your Joke!" onKeyDown={(e)=>{handleKeyDown(e);}}/>
                <div 
                    style={{
                        marginTop:"10px",
                        backgroundColor:"SeaGreen",
                        color:"MintCream",
                        padding:"0.5em",
                        fontWeight:"bold",
                        borderRadius:'10em',
                        width:"4em",
                        justifyContent:"center",
                        alignItems:"center",
                        textAlign:"center",
                        cursor:"pointer",
                        userSelect:"none"
                    }}
                    onClick={()=>{handleSubmit()}}
                >
                    Submit
                </div>
            </JokeModalContent>
        </JokeModalContainer>
    );
};

export default JokeModal;

const JokeModalContainer = styled.div`
    background:rgb(0,0,0,0.5);
    display:flex;
    flex:1;
    z-index:4;
    width:100%;
    height:100%;
    position:fixed;
    justify-content:center;
    align-items:center;
    backdrop-filter: blur(0.2em);
`;

const JokeModalContent = styled.div`
    width:40%;
    height:60%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:blanchedalmond;
    border-radius:1em;
    flex-direction:column;
    @media (max-width: 768px) {
        height:90%;
        width:90%;
    }
`;

const InputStyle = styled.textarea`
    width:90%;
    height:60%;
    border-radius:1em;
    padding:10px;
    &:focus{
        outline:solid 0.1em saddlebrown;
    }
`;