// Fungsi-fungsi perhitungan untuk aplikasi Perhitungan Gizi

// Interpolasi data standar untuk umur atau tinggi badan spesifik
function interpolateData(values, targetValue, columnIndex) {
    // Mencari nilai standar terdekat
    let lowerIndex = 0;
    let upperIndex = values.length - 1;

    for (let i = 0; i < values.length; i++) {
        if (values[i][0] <= targetValue && (i === values.length - 1 || values[i + 1][0] > targetValue)) {
            lowerIndex = i;
            upperIndex = i < values.length - 1 ? i + 1 : i;
            break;
        }
    }

    // Jika nilai target sama dengan nilai tabel
    if (values[lowerIndex][0] === targetValue) {
        return values[lowerIndex][columnIndex];
    }

    // Interpolasi linear
    const lowerValue = values[lowerIndex][0];
    const upperValue = values[upperIndex][0];
    const lowerStandard = values[lowerIndex][columnIndex];
    const upperStandard = values[upperIndex][columnIndex];

    // Menghindari pembagian dengan 0
    if (lowerValue === upperValue) {
        return lowerStandard;
    }

    return lowerStandard + ((targetValue - lowerValue) / (upperValue - lowerValue)) * (upperStandard - lowerStandard);
}

// Konversi z-score ke persentil
function zscoreToPercentile(zscore) {
    // Ini adalah estimasi sederhana untuk konversi z-score ke persentil
    // menggunakan error function (erf)
    const percentile = Math.round(100 * (0.5 + 0.5 * Math.erf(zscore / Math.sqrt(2))));
    return Math.max(0, Math.min(100, percentile));
}

// Error function (erf) untuk perhitungan persentil
// Implementasi dari https://stackoverflow.com/questions/14846767/std-normal-cdf-normal-cdf-or-error-function
Math.erf = Math.erf || function(x) {
    var t = 1.0 / (1.0 + 0.5 * Math.abs(x));
    var tau = t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 +
        t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
        t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
        t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? 1 - tau : tau - 1;
};

// Menghitung z-score
function calculateZscore(value, median, sd) {
    return (value - median) / sd;
}

// Menghitung status berdasarkan z-score
function getStatus(zscore, type) {
    if (type === 'weight-for-age') {
        if (zscore < -3) return 'Berat Badan Sangat Kurang';
        if (zscore < -2) return 'Berat Badan Kurang';
        if (zscore <= 1) return 'Berat Badan Normal';
        if (zscore <= 2) return 'Risiko Berat Badan Lebih';
        return 'Berat Badan Lebih';
    } else if (type === 'height-for-age') {
        if (zscore < -3) return 'Sangat Pendek';
        if (zscore < -2) return 'Pendek';
        if (zscore <= 2) return 'Normal';
        return 'Tinggi';
    } else if (type === 'weight-for-height') {
        if (zscore < -3) return 'Gizi Buruk';
        if (zscore < -2) return 'Gizi Kurang';
        if (zscore <= 1) return 'Gizi Baik';
        if (zscore <= 2) return 'Berisiko Gizi Lebih';
        if (zscore <= 3) return 'Gizi Lebih';
        return 'Obesitas';
    }
    return 'Tidak Diketahui';
}

// Mencari SD dari z-score
function findSDFromZscore(zscore) {
    if (zscore <= -3) return "-3 SD";
    if (zscore <= -2) return "-2 SD";
    if (zscore <= -1) return "-1 SD";
    if (zscore <= 1) return "Median";
    if (zscore <= 2) return "+1 SD";
    if (zscore <= 3) return "+2 SD";
    return "+3 SD";
}