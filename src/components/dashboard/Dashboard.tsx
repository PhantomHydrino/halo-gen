import styled from 'styled-components';
import React from 'react';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

interface Props{
    jokes: string[];
    children?: React.ReactNode
    deleteJoke: (index:number) => void;
}




const Dashboard:React.FC<Props> = ({jokes,children,deleteJoke}) =>{
    const notifyCopy = () => toast.success('Copied!');
    
    function CopyToClipboard(text:string) {
      
        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(text);
            notifyCopy();
          } catch (error) {
            console.error('Failed to copy: ', error);
          }
        };
      
        return (
            <div 
                style={{
                    marginTop:"10px",
                    backgroundColor:"Wheat",
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
                onClick={handleCopy}
            >
                Copy
            </div>
        );
    }
    
    return(
        <Container>
            {jokes.map((thought,index)=>{
                index=index+1;
                return(
                    <WidgetTile key={index}>
                        <div style={{
                            width:"100%",
                            height:"100%",
                            zIndex:1,
                            position:"relative",
                            display:"flex",
                            alignItems:"center"
                        }}>
                        
                        <TextThoughtContainer>
                            <TextThoughtBg>
                                {thought}
                                <span style={{
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                }}>
                                {CopyToClipboard(thought)}
                                <MdDelete 
                                    color="red" 
                                    size={30}
                                    alignmentBaseline='middle' 
                                    style={{
                                        marginLeft:"10px",
                                        paddingTop:10,
                                        cursor:'pointer'
                                    }}
                                    onClick={()=>{deleteJoke(index-1)}}
                                />
                                </span>
                            </TextThoughtBg>
                        </TextThoughtContainer>
                        
                        
                        <IndexBackground>{index}</IndexBackground>
                        </div>
                    </WidgetTile>
                )
            })}
            {children}
        </Container>
    )
}

export default Dashboard;

const Container = styled.div`
    flex:1;
    width:100vw;
    height:100vh;
    align-items:center;
    justify-content:center;
    display: flex;
    flex-wrap:wrap;
    @media (max-width: 768px) {
        flex-wrap:nowrap;
        flex-direction:column;
    }
`;


const IndexBackground = styled.div`
    font-size:9em;
    // transform-origin: 0 0;
    transform: rotate(5deg);
    opacity:20%;
    z-index:2;
    position:relative;
    display:flex;
    margin-left:10px;
    width:max-content;
    user-select: none;
`;



export const WidgetTile = styled.div`
    display:flex;
    flex: 1 1 20%;
    background-color:floralwhite;
    border-radius: 0.5em;
    align-items:center;
    height:30vh;
    margin:1.2em;
    color:sandybrown;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    @media (max-width: 768px) {
        width:90%;
        height:80vh;
        flex:none;
    }
    
`;

export const TextThoughtContainer = styled.div`
    z-index:3;
    position:absolute;
    flex-direction:column;
    display:flex;
    height:100%;
    width:100%;
    justify-content:center;
    align-items:center;
`;

const TextThoughtBg = styled.div`
    flex-direction:column;
    text-wrap:pretty;
    display:flex;
    width:80%;
    font-size:0.9em;
    padding:0.6em;
    justify-content:center;
    align-items:center;
    backdrop-filter: blur(0.2em);
    border:0.1em solid sandybrown;
    border-radius:0.5em;
    @media (max-width: 768px) {
        height:80%;
        text-align:left;
    }
`;

