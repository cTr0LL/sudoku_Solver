const sudokuGrid=document.querySelector('#sudoku')
const solveButton=document.querySelector('#solve-btn')
const display=document.querySelector('#output')
let submission=[]


for(let i =0;i<81;i++)
{
    const element=document.createElement('input');
    element.setAttribute('type','number')
    element.setAttribute('min',1)
    element.setAttribute('max',9)
    sudokuGrid.appendChild(element)
    if(
        ((i%9==0||i%9==1||i%9==2||i%9==6||i%9==7||i%9==8)&&i<21)||
        ((i%9==3||i%9==4||i%9==5)&&(i>27&&i<53))||
        ((i%9==0||i%9==1||i%9==2||i%9==6||i%9==7||i%9==8)&&i>53)
    )
    {
        element.classList.add('gray')
    }
}


const joinValues=()=> {
    const inputs=document.querySelectorAll('input')
    inputs.forEach(input=>{
        if(input.value)
        {
            submission.push(input.value)
        }
        else
            submission.push('.')
    })

}

function populateValues(response)
{
    const inputs=document.querySelectorAll('input')
    if(response.solvable&&response.solution)
    {
        inputs.forEach((input,i)=>{
            input.value=response.solution[i]
        })
        display.innerHTML="This is the solution"
    }
    else{
        display.innerHTML="There is no solution"
    }
}
    


async function solve()
{
    joinValues()
    const userinput={numbers:submission.join('')}

    fetch('http://localhost:8000/solve',{
        method:"POST",
        headers:{
            'content-type': 'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(userinput)
    }).then(response=>response.json())
    .then(data=>{
        console.log(data)
        populateValues(data)
        submission=[]
    })
    .catch((error)=>{
        console.error('Error:',error)
    })
}





solveButton.addEventListener('click',solve)