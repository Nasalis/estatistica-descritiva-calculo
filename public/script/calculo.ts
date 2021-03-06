// VARIABLES
const form = document.querySelector('form')
const btn = document.querySelector('#btn')
const tableData = document.querySelector('#tableData')
const tableLimitI = document.querySelector('#tableLimitI')
const tableLimitS = document.querySelector('#tableLimitS')
const mp = document.querySelector('#mediumPoint')
const frequency = document.querySelector('#frequency')
const frequencyRelative = document.querySelector('#frequencyRelative')
const frequencyAccumulate = document.querySelector('#frequencyAccumulate')

type Dados = Array<number>
type maxMin = {
    min: number,
    max: number
}
type Limits = {
    InferiorLimit: Array<number>,
    UpperLimit:Array<number>,
}

type AL = {
    amplitude: number,
    large: number
}

function relativeAndAcumulateFrequency(frequency: Dados) {
    let sum = 0;
    let relativeFreq: Dados
    let accumulateFreq: Dados
    relativeFreq = []
    accumulateFreq = []

    frequency.map(value => accumulateFreq.push(sum += value));

    
    frequency.map(value => relativeFreq.push(value/sum))

    return {relativeFreq, accumulateFreq};
}

function mediumPoint(InferiorLimit: Dados, UpperLimit: Dados, classes: number) {
    let pointsM: Dados
    pointsM = []

    for(let i = 0; i < classes; i++) {
        let calc = (InferiorLimit[i] + UpperLimit[i])/2
        pointsM.push(calc)
    }

    return pointsM
}

function calcFrequency(InferiorLimit: Dados, UpperLimit: Dados, values: Dados, classes: number) {
    let frequency: Dados;
    frequency = [];
    let cont: number;

    for(let i = 0; i < classes; i++) {
        cont = 0;
        values.filter(value => {
            if(value >= InferiorLimit[i] && value <= UpperLimit[i]){
                cont++;
            }
        })
        frequency.push(cont);
    }

    return frequency;
}

function makeLimits(maxMin: maxMin, large: number, classes: number) {
    let InferiorLimit: Dados
    let UpperLimit: Dados
    let limits: Limits;
    InferiorLimit = []
    UpperLimit = []

    for(let i = 0; i < classes; i++) {
        if(i === 0) {
            InferiorLimit.push(maxMin.min)
        }else{
            InferiorLimit.push(large + InferiorLimit[i-1])
        }
    }

    for(let j = 0; j < classes; j++) {
        UpperLimit.push(InferiorLimit[j] + large - 1 )
    }

    limits  = {
        InferiorLimit: InferiorLimit,
        UpperLimit: UpperLimit
    }

    return limits
}

function calcAmplitudeAndLarge(maxMin: maxMin, classes: number) {
    let amplitude= maxMin.max - maxMin.min;
    let large = Math.ceil((amplitude + 1)/classes);

    return {amplitude, large}
}

function valuesMinAndMax(values: Dados) {
    let min: number
    let max: number

    min = Math.min.apply(Math, values);
    max = Math.max.apply(Math, values);

    return {min, max}
}

function makeTableData(classes: number, maxMin: maxMin , amplitudeAndLarge: AL) {
    tableData.innerHTML = `
        <table id="tableData">
            <tr>
                <th>Classes</th>
                <td>${classes}</td>
            </tr>

            <tr>
                <th>Mínimo</th>
                <td>${maxMin.min}</td>
            </tr>

            <tr>
                <th>Máximo</th>
                <td>${maxMin.max}</td>
            </tr>

            <tr>
                <th>Amplitude</th>
                <td>${amplitudeAndLarge.amplitude}</td>
            </tr>

            <tr>
                <th>Largura</th>
                <td>${amplitudeAndLarge.large}</td>
            </tr>
        </table>
    `
}

function makeOthersTables(data: Dados, table: Element) {
    data.forEach(value => {
        let tr = document.createElement('tr');
        table.appendChild(tr)
        tr.innerHTML = `
            <tr>
                <td>${value}</td>
            </tr>
        `
    })
}


btn.addEventListener("click", () => {

    const data = document.querySelector('#data') as HTMLInputElement
    const classesAmout = document.querySelector('#classes') as HTMLInputElement
    const classes = Number(classesAmout.value)

    // const valores = [38, 32, 34, 39, 40, 54, 32, 17, 29, 33, 57, 40, 25, 36, 33, 24, 42, 16, 31, 33];
    const values = data.value.split(',')
    let values2: Array<number>
    values2 = []

    values.map(value => values2.push(Number(value)))
    
    let maxMin: maxMin
    maxMin = valuesMinAndMax(values2);

    let amplitudeAndLarge: AL
    amplitudeAndLarge = calcAmplitudeAndLarge(maxMin, classes)

    let limitsValues: Limits
    limitsValues = makeLimits(maxMin, amplitudeAndLarge.large, classes)

    let freq = calcFrequency(limitsValues.InferiorLimit, limitsValues.UpperLimit, values2, classes)
    let points = mediumPoint(limitsValues.InferiorLimit, limitsValues.UpperLimit, classes)
    let freqRA = relativeAndAcumulateFrequency(freq)

    makeTableData(classes, maxMin, amplitudeAndLarge);

    makeOthersTables(limitsValues.InferiorLimit, tableLimitI);
    makeOthersTables(limitsValues.UpperLimit, tableLimitS);
    makeOthersTables(points, mp);
    makeOthersTables(freq, frequency);
    makeOthersTables(freqRA.relativeFreq, frequencyRelative);
    makeOthersTables(freqRA.accumulateFreq, frequencyAccumulate);
    
})
