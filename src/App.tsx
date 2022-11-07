import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.css';
import {Buttons} from './Buttons';

function App() {

    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(5)
    const [number, setNumber] = useState<any>(0)
    const [btnDisabled, setBtnDisabled] = useState(true);

    const getFromLocalStorage = () => {
        let valueAsString = localStorage.getItem('startValue')
        let valueMaxAsString = localStorage.getItem('maxValue')

        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setStartValue(newValue)
        }
        if (valueMaxAsString) {
            let newValue = JSON.parse(valueMaxAsString)
            setMaxValue(newValue)
        }
    }

    useEffect(() => {
        getFromLocalStorage()
    }, [])

    const setToLocalStorage = () => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }

    const divStyle = number === maxValue ? s.error : s.num

    const InputMaxStyle = maxValue <= startValue ? s.inputError : s.input
    const InputStartStyle = startValue < 0 ? s.inputError : s.input

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const startValue = +e.currentTarget.value
        if (maxValue <= startValue || startValue < 0) {
            setNumber('Incorrect value!')
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
            console.log('handler', startValue)
            setNumber('Enter values and press \'set')
        }
        setStartValue(startValue)
    }

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const maxValue = +e.currentTarget.value
        if (maxValue <= startValue || maxValue <= 0) {
            setNumber('Incorrect value!')
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
            setNumber('Enter values and press \'set')
        }
        setMaxValue(maxValue)
    }

    const onClickSet = () => {                         //  localstorage
        setNumber(startValue)
        setBtnDisabled(true);
        setToLocalStorage()
    }
    const onClickReset = () => {
        if (maxValue) setNumber(startValue)
        setBtnDisabled(false);
    }

    const onClickInc = () => {
        const newNum = number + 1
        setNumber(newNum)
        if (number === maxValue) {
            onClickReset()
        }
    }

    return (
        <div className={s.App}>
            <div className={s.divs}>
                <div className={s.set}>
                    <div className={s.value}>
                        max value:
                        <span>
                            <input className={InputMaxStyle}
                                   type="number"
                                   value={maxValue}
                                   onChange={onChangeMaxHandler}/>
                        </span>
                    </div>
                    <div className={s.value}>start value:
                        <span>
                            <input className={InputStartStyle}
                                   type="number"
                                   value={startValue}
                                   onChange={onChangeStartHandler}/>
                        </span>
                    </div>
                </div>
                <div className={s.button}>
                    <Buttons disabled={btnDisabled}
                             callBack={onClickSet}
                             name={'set'}/>
                </div>
            </div>

            <div className={s.divs}>
                <div className={divStyle}>{number}</div>
                <div className={s.button}>
                    <Buttons disabled={number === maxValue}
                             callBack={onClickInc}
                             name={'inc'}/>
                    <Buttons disabled={number === startValue}
                             callBack={onClickReset}
                             name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
