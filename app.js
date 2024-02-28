const busSeat = document.querySelector('.bus-seat');
const selectedSeatContainer = document.getElementById('selected-seat-container');
let ticketsSelected = 0;
const selectedSeats = new Set();


const pricePerSeat = getConvertedValue("price-seat");
let totalPrice = getConvertedValue("total")
let grandTotal = getConvertedValue("grand-total");
const seatLeft = getConvertedValue("seat-left")

busSeat.addEventListener('click', function (event) {
    if (event.target.classList.contains('all-btn')) {
        if (ticketsSelected < 4) {
            const seatNumber = event.target.innerText;
            if (!selectedSeats.has(seatNumber)) {
                const category = 'Economy';

                const seatDiv = document.createElement('div');
                seatDiv.classList.add('selected-seat', 'flex', 'justify-between');

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name');
                nameDiv.innerText = seatNumber;

                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');
                categoryDiv.innerText = category;

                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                priceDiv.innerText = pricePerSeat;

                seatDiv.appendChild(nameDiv);
                seatDiv.appendChild(categoryDiv);
                seatDiv.appendChild(priceDiv);

                selectedSeatContainer.appendChild(seatDiv);
                event.target.classList.add('selected');
                selectedSeats.add(seatNumber);
                ticketsSelected++;
                const seatLeftElement = document.getElementById('seat-left');
                seatLeftElement.textContent = seatLeft - ticketsSelected;

                updateTotalPrice(pricePerSeat);
                calculateGrandTotal();

            } else {
                alert('This seat has already been selected.');
            }
        } else {
            alert('You can only select a maximum of four tickets.');
        }
    }
});

function updateTotalPrice(pricePerSeat) {

    const previousTotal = document.getElementById("total").innerText;
    const convertedTotal = parseInt(previousTotal);
    const convertedPrice = parseInt(pricePerSeat);
    const sum = convertedTotal + convertedPrice;
    document.getElementById("total").innerText = sum;

}

function calculateGrandTotal(control) {

    const previousTotal = document.getElementById("total").innerText;
    const convertedTotal = parseInt(previousTotal);
    const couponCode = document.getElementById("coupon-code").value;
    if (control) {
        if (couponCode == "NEW15") {
            const discount = parseInt(convertedTotal * 0.15);
            document.getElementById("grand-total").innerText =
                convertedTotal - discount;
        } else if (couponCode == "Couple 20") {
            const discount = parseInt(convertedTotal * 0.20);
            document.getElementById("grand-total").innerText =
                convertedTotal - discount;

        }
        else {
            alert("Invalid Coupon Code No Discount");
            return;
        }
    } else {
        document.getElementById("grand-total").innerText = convertedTotal;
    }
}

function getConvertedValue(id) {
    const price = document.getElementById(id).innerText;
    const convertPrice = parseInt(price);
    return convertPrice;
}

document.addEventListener('DOMContentLoaded', function () {
    const buyBtn = document.getElementById('buyBtn');

    buyBtn.addEventListener('click', function () {
        document.getElementById('purchase').scrollIntoView({
        });
    });
});