// Main application logic

// Function to prepare chart data and display results
function prepareChartData() {
    const nama = document.getElementById('nama').value;
    const age = parseFloat(document.getElementById('umur').value);
    const weight = parseFloat(document.getElementById('berat').value);
    const height = parseFloat(document.getElementById('tinggi').value);
    const gender = document.getElementById('jenisKelamin').value;

    if (!gender || age <= 0 || weight <= 0 || height <= 0) {
        alert('Mohon lengkapi semua data dengan benar!');
        return;
    }

    // Set nama balita di hasil
    document.getElementById('namaBayi').textContent = ': ' + nama;

    const standardData = gender === 'male' ? standardDataBoys : standardDataGirls;
    const weightForAgeData = gender === 'male' ? standardData.weightForAgeBoys.values : standardData.weightForAgeGirls.values;
    const heightForAgeData = gender === 'male' ? standardData.heightForAgeBoys.values : standardData.heightForAgeGirls.values;
    const weightForHeightData = gender === 'male' ? standardData.weightForHeightBoys.values : standardData.weightForHeightGirls.values;

    // Menghitung z-score dan status gizi
    const weightForAgeMedian = interpolateData(weightForAgeData, age, 4);
    const weightForAgeSD = (interpolateData(weightForAgeData, age, 5) - weightForAgeMedian);
    const weightForAgeZscore = calculateZscore(weight, weightForAgeMedian, weightForAgeSD);
    
    const heightForAgeMedian = interpolateData(heightForAgeData, age, 4);
    const heightForAgeSD = (interpolateData(heightForAgeData, age, 5) - heightForAgeMedian);
    const heightForAgeZscore = calculateZscore(height, heightForAgeMedian, heightForAgeSD);
    
    const weightForHeightMedian = interpolateData(weightForHeightData, height, 4);
    const weightForHeightSD = (interpolateData(weightForHeightData, height, 5) - weightForHeightMedian);
    const weightForHeightZscore = calculateZscore(weight, weightForHeightMedian, weightForHeightSD);

    // Display the results
    document.getElementById('bbu-zscore').textContent = weightForAgeZscore.toFixed(2);
    document.getElementById('bbu-percentile').textContent = zscoreToPercentile(weightForAgeZscore);
    document.getElementById('bbu-status').textContent = getStatus(weightForAgeZscore, 'weight-for-age');
    document.getElementById('bbu-sd').textContent = findSDFromZscore(weightForAgeZscore);

    document.getElementById('tbu-zscore').textContent = heightForAgeZscore.toFixed(2);
    document.getElementById('tbu-percentile').textContent = zscoreToPercentile(heightForAgeZscore);
    document.getElementById('tbu-status').textContent = getStatus(heightForAgeZscore, 'height-for-age');
    document.getElementById('tbu-sd').textContent = findSDFromZscore(heightForAgeZscore);

    document.getElementById('bbtb-zscore').textContent = weightForHeightZscore.toFixed(2);
    document.getElementById('bbtb-percentile').textContent = zscoreToPercentile(weightForHeightZscore);
    document.getElementById('bbtb-status').textContent = getStatus(weightForHeightZscore, 'weight-for-height');
    document.getElementById('bbtb-sd').textContent = findSDFromZscore(weightForHeightZscore);

    // Show the results
    document.getElementById('hasilPerhitungan').classList.remove('d-none');

    // Create charts
    createWeightForAgeChart(weightForAgeData, age, weight);
    createHeightForAgeChart(heightForAgeData, age, height);
    createWeightForHeightChart(weightForHeightData, height, weight);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formGizi').addEventListener('submit', function(e) {
        e.preventDefault();
        prepareChartData();
    });
});