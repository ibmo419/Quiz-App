import React ,{useState,useEffect}from 'react'
import {QuizData} from './QuizData'

function Quiz() {
    const [state, setstate] = useState(
        {
            userAnswer:null,
            score:0,     //current users answer
            currentIndex:0,  //current questions index
            options: [],       //the four options
            quizEnd: false, //True if it's the last question
            disabled: true,//the Score
        }
    )
    
    const LoadQuiz=()=>{
        const {currentIndex}=state;
        setstate({...state,
            question:QuizData[currentIndex].question,
            options:QuizData[currentIndex].options,
            answer:QuizData[currentIndex].answer,
           
        }  
        );
    }
    
    const checkAnswer=answer=>{
        setstate({...state,
            userAnswer:answer,
            disabled:false
        })
    }

    const nextQuestionHandler=()=>{
        const {userAnswer,answer,score,currentIndex}=state;
        if(userAnswer===answer){
            setstate({...state,
                       score:score+1,
                       currentIndex:currentIndex+1,
                       userAnswer:null})
                      
        }else{
        setstate({...state,
                  currentIndex:currentIndex+1,
                  userAnswer:null
                 })

        }
                 
    }
    
    const finishHandler =() => {
        const {userAnswer,answer,score}=state;
        if(state.currentIndex === QuizData.length -1){
            if(userAnswer===answer){
                setstate({...state,
                           score:score+1,
                           quizEnd:true})
                          
            }else{
                setstate({...state,
                    quizEnd:true
                })
            }
        }
    
    }
    useEffect(() => LoadQuiz()
    ,[state.currentIndex])

    return (
        <div>
            {
                state.quizEnd?
                <div>
                    <h1>Votre score is {state.score} points</h1>
                    <p>Les réponses correctes sont : </p>
                    <ul>
                        {QuizData.map((item,index)=>(
                            <li className="options" key={index} >{item.answer}</li>
                        ))}
                    </ul>
                </div>:
            <div>
            <h2>{state.question}</h2>
            <span>{`Question ${state.currentIndex+1} de ${QuizData.length}`}</span>
            {
                state.options.map((option,index)=>
                    <p  key={index} className={`options ${state.userAnswer===option? "selected":null}`}
                    onClick={()=>checkAnswer(option)}
                    >{option}</p>
                )
            }
            {
                state.currentIndex<QuizData.length-1 ?
                <button disabled={state.disabled} onClick={nextQuestionHandler}>
                    Suivant
                </button>:
                <button onClick={finishHandler} >
                    Finir
                </button>
            }
        </div>
        }
        </div>
    )
}

export default Quiz
