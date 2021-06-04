// datatable
setTimeout(() => {
    $("#myTable").on("draw.dt", function() {
        $(this).find(".dataTables_empty").parents('tbody').empty();
    }).DataTable({
        "bSort": false,
        "aLengthMenu": [
            [5, 10, 20, -1],
            [5, 10, 20, "All"]
        ],
        "pageLength": 5
    });
}, 100)

// fetch all data
fetch('/api/all')
    .then(res => res.json())
    .then(data => {
        const dataArray = data.data.reverse();
        const tbody = document.getElementById('tbody');
        const totalRecords = dataArray.length;
        let totalSales = 0
        let totalPurchase = 0
        dataArray.forEach(dataObj => {
            const tr = document.createElement('tr');
            const td_date = document.createElement('td');
            const td_name = document.createElement('td');
            const td_transactionType = document.createElement('td');
            const td_unit = document.createElement('td');
            const td_cost = document.createElement('td');
            const td_total = document.createElement('td');
            const td_action = document.createElement('td');

            td_date.textContent = dataObj.date;
            td_name.textContent = dataObj.name;
            td_transactionType.textContent = dataObj.transactionType;
            td_unit.textContent = dataObj.unit;
            td_cost.textContent = dataObj.cost;
            td_total.textContent = dataObj.total;
            td_action.innerHTML = `<button id=${dataObj._id} class="btn btn-danger btn-sm">Delete</button>`

            tr.appendChild(td_date);
            tr.appendChild(td_name);
            tr.appendChild(td_transactionType);
            tr.appendChild(td_unit);
            tr.appendChild(td_cost);
            tr.appendChild(td_total);
            tr.appendChild(td_action);

            tbody.appendChild(tr);

            if (dataObj.transactionType == "Buy") {
                totalPurchase += dataObj.total;
            } else if (dataObj.transactionType == "Sell") {
                totalSales += dataObj.total;
            }
            return totalSales, totalPurchase
        });
        document.getElementById('totalRecords').innerText = totalRecords;
        document.getElementById('totalSales').innerText = totalSales;
        document.getElementById('totalPurchase').innerText = totalPurchase;
    });


// delete records
setTimeout(() => {
    const delBtns = document.querySelectorAll('button[class="btn btn-danger btn-sm"]');
    delBtns.forEach(delBtn => {
        delBtn.addEventListener('click', (el) => {
            const { id } = el.target;
            const action = confirm("Do you want to delete ?");
            if (action) {
                fetch(`/api/delete/${id}`, {
                        method: 'DELETE'
                    })
                    .then(res => {
                        res.json()
                    })
                    .then(data => alert(data.message));
                window.location.assign('/');
            } else {
                return
            }
        });
    });
}, 100);