// Create BB/TB Chart (Berat Badan per Tinggi Badan)
function createWeightForHeightChart(data, currentHeight, currentWeight) {
    const ctx = document.getElementById('chartBBTB').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartBBTB) {
        chartBBTB.destroy();
    }
    
    // Prepare data for the chart
    const labels = data.map(d => d[0]); // Height in cm
    const minus3SD = data.map(d => d[1]);
    const minus2SD = data.map(d => d[2]);
    const minus1SD = data.map(d => d[3]);
    const median = data.map(d => d[4]);
    const plus1SD = data.map(d => d[5]);
    const plus2SD = data.map(d => d[6]);
    const plus3SD = data.map(d => d[7]);
    
    // Add current height if not in the data
    if (!labels.includes(currentHeight)) {
        const newLabels = [...labels, currentHeight].sort((a, b) => a - b);
        const newIndex = newLabels.indexOf(currentHeight);
        
        // Interpolate values for the current height
        const minus3SDValue = interpolateData(data, currentHeight, 1);
        const minus2SDValue = interpolateData(data, currentHeight, 2);
        const minus1SDValue = interpolateData(data, currentHeight, 3);
        const medianValue = interpolateData(data, currentHeight, 4);
        const plus1SDValue = interpolateData(data, currentHeight, 5);
        const plus2SDValue = interpolateData(data, currentHeight, 6);
        const plus3SDValue = interpolateData(data, currentHeight, 7);
        
        // Insert interpolated values
        minus3SD.splice(newIndex, 0, minus3SDValue);
        minus2SD.splice(newIndex, 0, minus2SDValue);
        minus1SD.splice(newIndex, 0, minus1SDValue);
        median.splice(newIndex, 0, medianValue);
        plus1SD.splice(newIndex, 0, plus1SDValue);
        plus2SD.splice(newIndex, 0, plus2SDValue);
        plus3SD.splice(newIndex, 0, plus3SDValue);
        
        // Update labels
        labels.splice(newIndex, 0, currentHeight);
    }
    
    // Add current child's data point
    const pointData = Array(labels.length).fill(null);
    // Find the closest height and set the point there
    const closestHeight = labels.reduce((prev, curr) => 
        Math.abs(curr - currentHeight) < Math.abs(prev - currentHeight) ? curr : prev
    );
    const closestHeightIndex = labels.indexOf(closestHeight);
    pointData[closestHeightIndex] = currentWeight;
    
    // Create the chart
    chartBBTB = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '-3SD',
                    data: minus3SD,
                    borderColor: '#d32f2f',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-2SD',
                    data: minus2SD,
                    borderColor: '#f44336',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-1SD',
                    data: minus1SD,
                    borderColor: '#ff7043',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Median',
                    data: median,
                    borderColor: '#2196f3',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+1SD',
                    data: plus1SD,
                    borderColor: '#4caf50',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+2SD',
                    data: plus2SD,
                    borderColor: '#388e3c',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+3SD',
                    data: plus3SD,
                    borderColor: '#1b5e20',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Nilai Anak',
                    data: pointData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 0,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tinggi Badan (cm)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Berat Badan (kg)'
                    }
                }
            }
        }
    });
}// Create TB/U Chart (Tinggi Badan per Umur)
function createHeightForAgeChart(data, currentAge, currentHeight) {
    const ctx = document.getElementById('chartTBU').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartTBU) {
        chartTBU.destroy();
    }
    
    // Prepare data for the chart
    const labels = data.map(d => d[0]); // Age in months
    const minus3SD = data.map(d => d[1]);
    const minus2SD = data.map(d => d[2]);
    const minus1SD = data.map(d => d[3]);
    const median = data.map(d => d[4]);
    const plus1SD = data.map(d => d[5]);
    const plus2SD = data.map(d => d[6]);
    const plus3SD = data.map(d => d[7]);
    
    // Add current age if not in the data
    if (!labels.includes(currentAge)) {
        const newLabels = [...labels, currentAge].sort((a, b) => a - b);
        const newIndex = newLabels.indexOf(currentAge);
        
        // Interpolate values for the current age
        const minus3SDValue = interpolateData(data, currentAge, 1);
        const minus2SDValue = interpolateData(data, currentAge, 2);
        const minus1SDValue = interpolateData(data, currentAge, 3);
        const medianValue = interpolateData(data, currentAge, 4);
        const plus1SDValue = interpolateData(data, currentAge, 5);
        const plus2SDValue = interpolateData(data, currentAge, 6);
        const plus3SDValue = interpolateData(data, currentAge, 7);
        
        // Insert interpolated values
        minus3SD.splice(newIndex, 0, minus3SDValue);
        minus2SD.splice(newIndex, 0, minus2SDValue);
        minus1SD.splice(newIndex, 0, minus1SDValue);
        median.splice(newIndex, 0, medianValue);
        plus1SD.splice(newIndex, 0, plus1SDValue);
        plus2SD.splice(newIndex, 0, plus2SDValue);
        plus3SD.splice(newIndex, 0, plus3SDValue);
        
        // Update labels
        labels.splice(newIndex, 0, currentAge);
    }
    
    // Add current child's data point
    const pointData = Array(labels.length).fill(null);
    // Find the closest age and set the point there
    const closestAge = labels.reduce((prev, curr) => 
        Math.abs(curr - currentAge) < Math.abs(prev - currentAge) ? curr : prev
    );
    const closestAgeIndex = labels.indexOf(closestAge);
    pointData[closestAgeIndex] = currentHeight;
    
    // Create the chart
    chartTBU = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '-3SD',
                    data: minus3SD,
                    borderColor: '#d32f2f',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-2SD',
                    data: minus2SD,
                    borderColor: '#f44336',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-1SD',
                    data: minus1SD,
                    borderColor: '#ff7043',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Median',
                    data: median,
                    borderColor: '#2196f3',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+1SD',
                    data: plus1SD,
                    borderColor: '#4caf50',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+2SD',
                    data: plus2SD,
                    borderColor: '#388e3c',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+3SD',
                    data: plus3SD,
                    borderColor: '#1b5e20',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Nilai Anak',
                    data: pointData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 0,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Umur (bulan)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tinggi Badan (cm)'
                    }
                }
            }
        }
    });
}// Fungsi-fungsi untuk membuat grafik

// Variables for charts
let chartBBU, chartTBU, chartBBTB;

// Create BB/U Chart (Berat Badan per Umur)
function createWeightForAgeChart(data, currentAge, currentWeight) {
    const ctx = document.getElementById('chartBBU').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartBBU) {
        chartBBU.destroy();
    }
    
    // Prepare data for the chart
    const labels = data.map(d => d[0]); // Age in months
    const minus3SD = data.map(d => d[1]);
    const minus2SD = data.map(d => d[2]);
    const minus1SD = data.map(d => d[3]);
    const median = data.map(d => d[4]);
    const plus1SD = data.map(d => d[5]);
    const plus2SD = data.map(d => d[6]);
    const plus3SD = data.map(d => d[7]);
    
    // Add current age if not in the data
    if (!labels.includes(currentAge)) {
        const newLabels = [...labels, currentAge].sort((a, b) => a - b);
        const newIndex = newLabels.indexOf(currentAge);
        
        // Interpolate values for the current age
        const minus3SDValue = interpolateData(data, currentAge, 1);
        const minus2SDValue = interpolateData(data, currentAge, 2);
        const minus1SDValue = interpolateData(data, currentAge, 3);
        const medianValue = interpolateData(data, currentAge, 4);
        const plus1SDValue = interpolateData(data, currentAge, 5);
        const plus2SDValue = interpolateData(data, currentAge, 6);
        const plus3SDValue = interpolateData(data, currentAge, 7);
        
        // Insert interpolated values
        minus3SD.splice(newIndex, 0, minus3SDValue);
        minus2SD.splice(newIndex, 0, minus2SDValue);
        minus1SD.splice(newIndex, 0, minus1SDValue);
        median.splice(newIndex, 0, medianValue);
        plus1SD.splice(newIndex, 0, plus1SDValue);
        plus2SD.splice(newIndex, 0, plus2SDValue);
        plus3SD.splice(newIndex, 0, plus3SDValue);
        
        // Update labels
        labels.splice(newIndex, 0, currentAge);
    }
    
    // Add current child's data point
    const pointData = Array(labels.length).fill(null);
    // Find the closest age and set the point there
    const closestAge = labels.reduce((prev, curr) => 
        Math.abs(curr - currentAge) < Math.abs(prev - currentAge) ? curr : prev
    );
    const closestAgeIndex = labels.indexOf(closestAge);
    pointData[closestAgeIndex] = currentWeight;
    
    // Create the chart
    chartBBU = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '-3SD',
                    data: minus3SD,
                    borderColor: '#d32f2f',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-2SD',
                    data: minus2SD,
                    borderColor: '#f44336',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '-1SD',
                    data: minus1SD,
                    borderColor: '#ff7043',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Median',
                    data: median,
                    borderColor: '#2196f3',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+1SD',
                    data: plus1SD,
                    borderColor: '#4caf50',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+2SD',
                    data: plus2SD,
                    borderColor: '#388e3c',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: '+3SD',
                    data: plus3SD,
                    borderColor: '#1b5e20',
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Nilai Anak',
                    data: pointData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 0,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Umur (bulan)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Berat Badan (kg)'
                    }
                }
            }
        }
    });
}