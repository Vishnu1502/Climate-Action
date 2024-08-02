function calculateCarbonFootprint() {
  const electricBill = parseFloat(document.getElementById('electric-bill').value);
  const gasBill = parseFloat(document.getElementById('gas-bill').value);
  const oilBill = parseFloat(document.getElementById('oil-bill').value);
  const carMileage = parseFloat(document.getElementById('yearly-mileage').value);
  const bikeMileage = parseFloat(document.getElementById('bike-mileage').value);
  const meatConsumption = parseFloat(document.getElementById('meat-consumption').value);
  const shortFlights = parseFloat(document.getElementById('short-flights').value);
  const longFlights = parseFloat(document.getElementById('long-flights').value);
  const recycleNewspaper = document.getElementById('recycle-newspaper').checked;
  const recycleAluminum = document.getElementById('recycle-aluminum').checked;

  let footprint = 0;

  footprint += electricBill * 105;
  footprint += gasBill * 105;
  footprint += oilBill * 113;
  footprint += carMileage * 0.79;
  footprint += bikeMileage * 0.29; // Assumed factor for bike/two-wheeler mileage
  footprint += meatConsumption * 52 * 11; // Assumed factor for weekly meat consumption
  footprint += shortFlights * 1100;
  footprint += longFlights * 4400;
  if (!recycleNewspaper) footprint += 184;
  if (!recycleAluminum) footprint += 166;

  // Convert to kg
  footprint = footprint / 2.20462;

  document.getElementById('footprint-value').textContent = footprint.toFixed(2);

  let status = '';
  let suggestions = '';
  if (footprint < 16000) {
    status = 'Low';
    suggestions = 'Your carbon footprint is quite low. Great job! Continue to implement eco-friendly practices to keep it that way.';
  } else if (footprint >= 16000 && footprint <= 20000) {
    status = 'Average';
    suggestions = 'Your carbon footprint is average. Consider taking steps to reduce it, such as recycling and reducing energy consumption.';
  } else {
    status = 'High';
    suggestions = 'Your carbon footprint is higher than average. Consider adopting more green practices, such as using public transport and reducing waste.';
  }
  document.getElementById('status').textContent = status;
  document.getElementById('suggestions-text').textContent = suggestions;

  // Chart.js
  const ctx = document.getElementById('footprint-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Carbon Footprint'],
      datasets: [{
        label: 'Carbon Footprint (kg/year)',
        data: [footprint],
        backgroundColor: '#00b300',
        borderColor: '#008f00',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
