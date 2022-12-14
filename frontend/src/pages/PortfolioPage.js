import { useState } from 'react'

import Balance from '../components/Balance'
function PortfolioPage (){

    const [balance,setBalance] = useState()
    const [error,setError]=useState('')
    const [withdrawOrDeposit,setWithdrawOrDeposit]=useState('deposit funds')
    

    async function get(){
        const res = await fetch('/portfolio')
            
        const data = await res.json()
        data.portfolio[0] === undefined ? setBalance('notSet'):setBalance(data.portfolio[0].balance)

        
        
    }
    get() 
   
  
     
    async function uploadBalance(){

        // CHECK FOR VALID BALANCE INPUT
        let onlyDigits = true
       let balanceInput = document.querySelector('.balance').value
       let digits = [0,1,2,3,4,5,6,7,8,9]
        let arrToCheckforNonNums = balanceInput.split('')
        arrToCheckforNonNums.forEach(el=>{
            if(digits.includes(Number(el))===false){
                onlyDigits = false
            }
        })
        if(balanceInput.length<1){
            onlyDigits=false
        }
   

        if(onlyDigits === true){
        const res = await fetch ('/portfolio/addbalance',{
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              balance:balanceInput,
              
            })
        })
        const data = await res.json()
        setBalance(data.portfolio[0].balance)
        setError(undefined)
        }else{
            setError('Please enter a valid number, for example 123456')
           
        }
    }

    //FOR DEPOSITING AND WITHDRAWING MONEY
    async function editBalance(){
       
         // CHECK FOR VALID BALANCE INPUT
         let onlyDigits = true
         let depositOrWithdraw = document.querySelector('.editBalance').value
         let digits = [0,1,2,3,4,5,6,7,8,9]
          let arrToCheckforNonNums = depositOrWithdraw.split('')
          arrToCheckforNonNums.forEach(el=>{
              if(digits.includes(Number(el))===false){
                  onlyDigits = false
              }
          })
          if(depositOrWithdraw.length<1){
              onlyDigits=false
          }


          if(onlyDigits===true){
        if(withdrawOrDeposit==='deposit funds'){
            //PUT REQUESTS TO DEPOSIT FUNDS
           let newBalance = Number(depositOrWithdraw)+Number(balance)
           const res = await fetch ('/portfolio/editbalance',{
            method:'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              balance:newBalance
              
            })
        })
        const data = await res.json()
        setBalance(data.portfolio[0].balance)
           setError(undefined)
        }else if(withdrawOrDeposit==='withdraw funds'){
            //CHECK TO MAKE SURE THE NEW BALANCE IS >= 0
            let newBalance = Number(balance)-Number(depositOrWithdraw)
            //PUT REQUEST TO WITHDRAW FUNDS
            if(newBalance>=0){
                const res = await fetch ('/portfolio/editbalance',{
                    method:'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                      balance:newBalance
                      
                    })
                })
                const data = await res.json()
                setBalance(data.portfolio[0].balance)
                setError(undefined)
            }else{
                setError('Balance cannot be less than 0')
            }
        }
        }else{
            setError('Please enter a valid number, for example 123456')
        }
    }

   
    //MAKE BALANCE AND PORTFOLIO BOTH INDIVIDUAL COMPONENTS
   

    
    return (
       <div>
       
        <h1>Portfolio</h1>
        <Balance balance = {balance} setBalance = {setBalance} uploadBalance = {uploadBalance} error = {error} setWithdrawOrDeposit = {setWithdrawOrDeposit} withdrawOrDeposit = {withdrawOrDeposit} editBalance = {editBalance}/>
        
        <h2>Owned tickers</h2>
            <p>Avg cost, quantity, total value</p>
        </div>
    
    )
  
     
}

export default PortfolioPage