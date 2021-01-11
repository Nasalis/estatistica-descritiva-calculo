// VARIABLES
var form = document.querySelector('form');
var btn = document.querySelector('#btn');
var tableData = document.querySelector('#tableData');
var tableLimitI = document.querySelector('#tableLimitI');
var tableLimitS = document.querySelector('#tableLimitS');
var mp = document.querySelector('#mediumPoint');
var frequency = document.querySelector('#frequency');
var frequencyRelative = document.querySelector('#frequencyRelative');
var frequencyAccumulate = document.querySelector('#frequencyAccumulate');
function relativeAndAcumulateFrequency(frequency) {
    var sum = 0;
    var relativeFreq;
    var accumulateFreq;
    relativeFreq = [];
    accumulateFreq = [];
    frequency.map(function (value) { return accumulateFreq.push(sum += value); });
    frequency.map(function (value) { return relativeFreq.push(value / sum); });
    return { relativeFreq: relativeFreq, accumulateFreq: accumulateFreq };
}
function mediumPoint(InferiorLimit, UpperLimit, classes) {
    var pointsM;
    pointsM = [];
    for (var i = 0; i < classes; i++) {
        var calc = (InferiorLimit[i] + UpperLimit[i]) / 2;
        pointsM.push(calc);
    }
    return pointsM;
}
function calcFrequency(InferiorLimit, UpperLimit, values, classes) {
    var frequency;
    frequency = [];
    var cont;
    var _loop_1 = function (i) {
        cont = 0;
        values.filter(function (value) {
            if (value >= InferiorLimit[i] && value <= UpperLimit[i]) {
                cont++;
            }
        });
        frequency.push(cont);
    };
    for (var i = 0; i < classes; i++) {
        _loop_1(i);
    }
    return frequency;
}
function makeLimits(maxMin, large, classes) {
    var InferiorLimit;
    var UpperLimit;
    var limits;
    InferiorLimit = [];
    UpperLimit = [];
    for (var i = 0; i < classes; i++) {
        if (i === 0) {
            InferiorLimit.push(maxMin.min);
        }
        else {
            InferiorLimit.push(large + InferiorLimit[i - 1]);
        }
    }
    for (var j = 0; j < classes; j++) {
        UpperLimit.push(InferiorLimit[j] + large - 1);
    }
    limits = {
        InferiorLimit: InferiorLimit,
        UpperLimit: UpperLimit
    };
    return limits;
}
function calcAmplitudeAndLarge(maxMin, classes) {
    var amplitude = maxMin.max - maxMin.min;
    var large = Math.ceil((amplitude + 1) / classes);
    return { amplitude: amplitude, large: large };
}
function valuesMinAndMax(values) {
    var min;
    var max;
    min = Math.min.apply(Math, values);
    max = Math.max.apply(Math, values);
    return { min: min, max: max };
}
function makeTableData(classes, maxMin, amplitudeAndLarge) {
    tableData.innerHTML = "\n        <table id=\"tableData\">\n            <tr>\n                <th>Classes</th>\n                <td>" + classes + "</td>\n            </tr>\n\n            <tr>\n                <th>M\u00EDnimo</th>\n                <td>" + maxMin.min + "</td>\n            </tr>\n\n            <tr>\n                <th>M\u00E1ximo</th>\n                <td>" + maxMin.max + "</td>\n            </tr>\n\n            <tr>\n                <th>Amplitude</th>\n                <td>" + amplitudeAndLarge.amplitude + "</td>\n            </tr>\n\n            <tr>\n                <th>Largura</th>\n                <td>" + amplitudeAndLarge.large + "</td>\n            </tr>\n        </table>\n    ";
}
function makeOthersTables(data, table) {
    data.forEach(function (value) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        tr.innerHTML = "\n            <tr>\n                <td>" + value + "</td>\n            </tr>\n        ";
    });
}
btn.addEventListener("click", function () {
    var data = document.querySelector('#data');
    var classesAmout = document.querySelector('#classes');
    var classes = Number(classesAmout.value);
    // const valores = [38, 32, 34, 39, 40, 54, 32, 17, 29, 33, 57, 40, 25, 36, 33, 24, 42, 16, 31, 33];
    var values = data.value.split(',');
    var values2;
    values2 = [];
    values.map(function (value) { return values2.push(Number(value)); });
    var maxMin;
    maxMin = valuesMinAndMax(values2);
    var amplitudeAndLarge;
    amplitudeAndLarge = calcAmplitudeAndLarge(maxMin, classes);
    var limitsValues;
    limitsValues = makeLimits(maxMin, amplitudeAndLarge.large, classes);
    var freq = calcFrequency(limitsValues.InferiorLimit, limitsValues.UpperLimit, values2, classes);
    var points = mediumPoint(limitsValues.InferiorLimit, limitsValues.UpperLimit, classes);
    var freqRA = relativeAndAcumulateFrequency(freq);
    makeTableData(classes, maxMin, amplitudeAndLarge);
    makeOthersTables(limitsValues.InferiorLimit, tableLimitI);
    makeOthersTables(limitsValues.UpperLimit, tableLimitS);
    makeOthersTables(points, mp);
    makeOthersTables(freq, frequency);
    makeOthersTables(freqRA.relativeFreq, frequencyRelative);
    makeOthersTables(freqRA.accumulateFreq, frequencyAccumulate);
});
