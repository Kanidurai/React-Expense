import { useEffect, useState } from "react";
import axios from "axios";

export default function Expense() {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [num, setNum] = useState("");
    const [view, setView] = useState([]);
    const [total, setTotal] = useState(0);
    const [showTable, setShowTable] = useState(false); // Initially hidden

    useEffect(() => {
        fetch("https://6530c2416c756603295efea7.mockapi.io/employeesalary")
            .then(res => res.json())
            .then((data) => {
                setView(data);
                let cal = data.reduce((a, b) => (a + parseFloat(b.item || 0)), 0);
                setTotal(cal);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate Inputs
        if (!value.trim() || !num.trim()) {
            alert("Please enter both item name and amount.");
            return;
        }

        // Save to API
        axios.post('https://6530c2416c756603295efea7.mockapi.io/employeesalary', { uvalue: value, item: num })
            .then(() => {
                alert("Data saved successfully");
                setValue("");
                setNum("");
                window.location.reload();
            })
            .catch((err) => alert("Error saving data"));
    };

    const handleDelete = (id) => {
        axios.delete(`https://6530c2416c756603295efea7.mockapi.io/employeesalary/${id}`)
            .then(() => {
                alert("Expense deleted successfully");
                setView(view.filter(item => item.id !== id));
            })
            .catch((err) => alert("Error deleting data"));
    };

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    return (
        <center>
            <h1>Expense Tracker</h1>
            <br />
            <div id="div1">
                <h4 id="income">INCOME</h4>
                <p id="p1">${name}</p>
                <h4>EXPENSE</h4>
                <p id="p2">${total}</p>
            </div>
            <br />
            <input 
                type="number" 
                placeholder="Enter Your Income" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <h3>TOTAL BALANCE: ${total - (parseFloat(name) || 0)}</h3>
            
            <form onSubmit={handleSubmit}>
                <h2>Item</h2>
                <input 
                    type="text" 
                    placeholder="Enter item" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                />
                <h3>Amount</h3>
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={num} 
                    onChange={(e) => setNum(e.target.value)}
                />
                <input type="submit" value="ADD EXPENSES" id="input1" />
            </form>

            <button className="toggle-btn" onClick={toggleTable}>
                {showTable ? "Hide Expenses" : "Show Expenses"}
            </button>

            {showTable && (
                <div id="table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {view.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.uvalue}</td>
                                    <td>${a.item}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(a.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </center>
    );
}
