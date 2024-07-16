import React, { useState } from 'react'
import Style from "./Herosection.module.css"
import contractFuncs from '../../Hooks/contractFuncs'

const Herosection = () => {

    const [depositAmount, setDepositAmount] = useState()
    const [withdrawAmount, setWithdrawAmount] = useState()
    const [bankName, setBankName] = useState("")
    const [balance, setBalance] = useState(0)
    const [Name, setName] = useState("")
    const [owner, setOwner] = useState("")
    const [flag, setFlag] = useState(false)
    const { program, createBank, depositAmountToBank, withdrawAmountToBank, fetchBankData } = contractFuncs()
    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
    }

    const handleWithdrawChange = (e) => {
        setWithdrawAmount(e.target.value);
    }
    const handleBankNameChange = (e) => {
        setBankName(e.target.value);
    }

    const handleDeposit = async (e) => {
        await depositAmountToBank(depositAmount)
        console.log(depositAmount);
    }
    const handleWithdraw = async (e) => {
        await withdrawAmountToBank(withdrawAmount)
        console.log(withdrawAmount);
    }
    const handleBankName = async (e) => {
        // console.log("Program ======>>>>> " , program);
        await createBank(bankName);
        console.log(bankName);
    }
    const handleFatchBankData = async () => {
        const { balance, name, owner } = await fetchBankData();

        setBalance(balance);
        setName(name);
        setOwner(owner);

        setFlag(true)
        console.log("Bank Balance in lamport ==  >>> ", balance);
        console.log("Bank Name  ==  >?>> ", name);
        console.log("Bank owner  ==  >?>> ", owner);
    }


    return (
        <div>
            <div className={Style.deposit}>
                <div className={Style.iunputWraper}>

                    <h2> Initialize Bank : </h2>
                    <div className={Style.inputAm}>
                        <input type="text" name="bank" id="" placeholder='Enter ur bank name'
                            value={bankName}
                            onChange={handleBankNameChange} />
                    </div>
                </div>
                <button onClick={handleBankName}>INIT</button>
            </div>

            <div className={Style.deposit}>
                <div className={Style.iunputWraper}>

                    <h2> Deposit SOL : </h2>
                    <div className={Style.inputAm}>
                        <input type="number" name="deposit" id="" placeholder='Enter deposit Amount'
                            value={depositAmount}
                            onChange={handleDepositChange} />
                    </div>
                </div>
                <button onClick={handleDeposit}>Deposit</button>
            </div>

            <div className={Style.deposit}>
                <div className={Style.iunputWraper}>

                    <h2> Withdraw SOL : </h2>
                    <div className={Style.inputAm}>
                        <input type="number" name="withdraw" id="" placeholder='Enter withdraw Amount'
                            value={withdrawAmount}
                            onChange={handleWithdrawChange} />
                    </div>
                </div>
                <button onClick={handleWithdraw}>Withdraw</button>
            </div>

            <div className={Style.deposit}>
                <div className={Style.iunputWraper}>

                    <h2> Fatch Bank Data </h2>
                </div>
                <button onClick={handleFatchBankData}>Show Bank Data</button>
            </div>
            {flag && (
                <div>
                    <p>Balance : {balance} Lamport // {balance / 10 ** 9} SOL</p>
                    <p>Name : {Name}</p>
                    <p>Owner : {owner}</p>
                </div>
            )
            }

        </div>
    )
}

export default Herosection