let customers = JSON.parse(localStorage.getItem("customers")) || [];

function addCustomer() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let amount = Number(document.getElementById("amount").value);

    if (!name || !phone || !amount) {
        alert("Fill all fields");
        return;
    }

    let today = new Date();
    let due = new Date();
    due.setDate(today.getDate() + 30);

    customers.push({
        name,
        phone,
        total: amount,
        balance: amount,
        dueDate: due.toDateString()
    });

    save();
}

function makePayment(index) {
    let pay = prompt("Enter payment amount:");
    pay = Number(pay);

    if (!pay || pay <= 0) return;

    customers[index].balance -= pay;
    if (customers[index].balance < 0) customers[index].balance = 0;

    save();
}

function save() {
    localStorage.setItem("customers", JSON.stringify(customers));
    display();
}

function display() {
    let t = document.getElementById("table");
    t.innerHTML = "";

    let today = new Date();

    customers.forEach((c, i) => {
        let due = new Date(c.dueDate);
        let status = "OK";
        let cls = "";

        if (c.balance === 0) {
            status = "CLEARED";
            cls = "cleared";
        } else if (today > due) {
            status = "OVERDUE ⚠ Alert Sent";
            cls = "overdue";
        }

        t.innerHTML += `
        <tr class="${cls}">
            <td>${c.name}</td>
            <td>${c.phone}</td>
            <td>Rs ${c.total}</td>
            <td>Rs ${c.balance}</td>
            <td>${c.dueDate}</td>
            <td>${status}</td>
            <td><button onclick="makePayment(${i})">Pay</button></td>
        </tr>`;
    });
}

display();
