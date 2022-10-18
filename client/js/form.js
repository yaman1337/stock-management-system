let date = document.getElementById('date');
let name = document.getElementById('name');
let transactionType = document.getElementById('floatingSelect');
let unit = document.getElementById('unit');
let cost = document.getElementById('cost');
let btn = document.getElementById('btn');

async function postData(date1, name1, transactionType1, unit1, cost1) {
    fetch('/api/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                date: date1,
                name: name1,
                transactionType: transactionType1,
                unit: unit1,
                cost: cost1
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                return alert(data.error)
            }
            alert(data.message);
            window.location.assign('/');
        });
};

btn.addEventListener('click', () => {
    const date1 = date.value;
    const name1 = name.value;
    const transactionType1 = transactionType.value;
    const unit1 = unit.value;
    const cost1 = cost.value;
    postData(date1, name1, transactionType1, unit1, cost1);
});