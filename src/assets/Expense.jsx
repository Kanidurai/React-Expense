
import { useEffect, useState } from "react";
import axios from "axios";
export default function Expense() {
    let [name, setName] = useState(0)
    let [value, setValue] = useState("");
    let [num, setNum] = useState(0);
    let [view, setView] = useState([]);
    let [total, setTotal] = useState(0)

    function names(e) {
        setName(e.target.value)
    }
    function nums(e) {
        setNum(e.target.value)
    }
    function values(e) {
        setValue(e.target.value)
    }

    useEffect(() => {
        fetch("https://6530c2416c756603295efea7.mockapi.io/employeesalary")
            .then(res => res.json())
            .then((data) => {
                setView(data)
                let cal = data.reduce((a, b) => (a + parseFloat(b.item)), 0)
                setTotal(cal)
            })
    }, [])

    return (
        <>
            <center>
                <h1>Expense Tracker</h1>
                <br />
                <div id="div1">
                    <h4 id="income">INCOME</h4>
                    <br />
                    <p id="p1">
                        ${name}
                    </p>
                    <h4>EXPENSE</h4>
                    <br />
                    <p id="p2">
                        ${total}
                    </p>
                </div>
                <br />
                <input type="number" placeholder="Enter Your Income" value={name} onChange={names}></input>

                <br />

                <h3>TOTAL BALANCE:${total - name}</h3>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        axios.post('https://6530c2416c756603295efea7.mockapi.io/employeesalary', { uvalue: value, item: num })
                        alert("data saved");
                        setValue("")
                        setNum("")
                        window.location.reload()
                    }}>

                        <h2>Item</h2>

                        <input id="input2" type="text" placeholder="Enter item" value={value} onChange={values}></input>

                        <h3 id="h3">Amount</h3>
                        <br />
                        <input id="input3" type="number" placeholder="enter amount" value={num} onChange={nums} />
                        <input type="submit" value="ADD EXPENSES" id="input1" />
                    </form>
                </div>
                <div id="table">
                    <table className="table">
                        <tr>
                            {/* <th>Topic</th>
                            <th>Item</th> */}
                        </tr>
                        {view.map((a) => (
                            <tr>
                                <td>{a.uvalue}</td>
                                <td>{a.item}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </center>
        </>
    )
}