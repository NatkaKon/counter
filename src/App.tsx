import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.css';
import {Buttons} from './Buttons';


function App() {

    const [number, setNumber] = useState<any>(0)
    const [start, setStart] = useState<number>(0)
    const [max, setMax] = useState<number>(5)
    const [isDisabled, setDisabled] = useState(false);
    // const [error, setError]=useState<string|null>(null)

    // useEffect(()=> {
    //     let valueAsString = localStorage.getItem('startValue')
    //     if (valueAsString) {
    //         let newValue = JSON.parse(valueAsString)
    //         // setValue(newValue)
    //         // setMax(newValue)
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem('startValue', JSON.stringify(value))
    //
    // }, [value])


    const divStyle = number === max ? s.error : s.num

    const InputMaxStyle = max <= start ? s.inputError : s.input
    const InputStartStyle = start < 0 ? s.inputError : s.input

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (max <= start || start <0) {
            setNumber('Incorrect value!')
        } else {
            setStart(+e.currentTarget.value)
            setDisabled(false);
            console.log('handler', start)
            setNumber("Enter values and press 'set'")
        }
    }

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (max <= start || max<=0) {
            setNumber('Incorrect value!')
        } else {
            setMax(+e.currentTarget.value)
            setDisabled(false);
            setNumber("Enter values and press 'set'")
        }
    }

    const onClickSet = () => {
        setNumber(start)
        setDisabled(true);
    }
    const onClickReset = () => {
        if (max) setNumber(start)
        setDisabled(false);
    }

    const onClickInc = () => {
        const newNum = number + 1
        setNumber(newNum)
        if (number === max) {
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
                                   value={max}
                                   onChange={onChangeMaxHandler}/>
                        </span>
                    </div>
                    <div className={s.value}>start value:
                        <span>
                            <input className={InputStartStyle}
                                   type="number"
                                   value={start}
                                   onChange={onChangeStartHandler}/>
                        </span>
                    </div>
                </div>
                <div className={s.button}>
                    <Buttons disabled={isDisabled}
                             callBack={onClickSet}
                             name={'set'}/>
                </div>
            </div>

            <div className={s.divs}>
                <div className={divStyle}>{number}</div>
                <div className={s.button}>
                    <Buttons disabled={number === max}
                             callBack={onClickInc}
                             name={'inc'}/>
                    <Buttons disabled={number === start}
                             callBack={onClickReset}
                             name={'reset'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
