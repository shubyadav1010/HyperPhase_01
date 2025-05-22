let transactions = [];
let totalBalance = 0;

function updateBalance() {
    document.getElementById("balance").textContent = totalBalance;
}

function renderTransactions() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach((tx, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.amount}</td>
      <td>${tx.type}</td>
      <td>${tx.category}</td>
      <td><button class="edit" onclick="editTransaction(${index})">Edit</button></td>
    `;
        list.appendChild(row);
    });
}

function editTransaction(index) {
    const tx = transactions[index];
    const newAmount = prompt("Enter new amount:", tx.amount);
    const newType = prompt("Enter new type (Credit/Debit):", tx.type);
    const newCategory = prompt("Enter new category:", tx.category);

    if (newAmount && newType && newCategory) {
        // Revert old balance
        if (tx.type === "Credit") totalBalance -= tx.amount;
        else totalBalance += tx.amount;

        // Apply new values
        tx.amount = parseInt(newAmount);
        tx.type = newType;
        tx.category = newCategory;

        if (tx.type === "Credit") totalBalance += tx.amount;
        else totalBalance -= tx.amount;

        renderTransactions();
        updateBalance();
    }
}

document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (!amount || !type || !category) return;

    const id = transactions.length + 1;
    transactions.push({ id, amount, type, category });

    if (type === "Credit") totalBalance += amount;
    else totalBalance -= amount;

    document.getElementById("transaction-form").reset();
    renderTransactions();
    updateBalance();
});
