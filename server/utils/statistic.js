const { TWELVEMONTHS } = require("./constants");

const countStatistic = (array) => {
    return array.reduce((total, elem) => {
        let temp = JSON.stringify(elem.createdAt).split("-");
        [year, month] = temp;

        const groupKey = month + "-" + year.replace('"', "");

        total[groupKey] ? (total[groupKey] += 1) : (total[groupKey] = 1);

        return total;
    }, {});
};

const convertToArray = (dataJson) => {
    let result = [];
    for (var i in dataJson) result.push({ period: i, count: dataJson[i] });
    return result;
};

function check_exist_arr(ele, arr) {
    let count = i = 0;
    while (i < arr.length) {
        if (arr[i] === ele) {
            count++;
            break
        }
        ++i;
    }
    return (count > 0) ? true : false
}

const deduplicate = (arr) => {
    let isExist = (arr, x) => arr.indexOf(x) > -1;
    let ans = [];

    arr.forEach((element) => {
        if (!isExist(ans, element)) ans.push(element);
    });

    return ans;
};

const getYearArray = (arrData) => {
    const yearArray = [];
    arrData.map((r) => {
        let year = r.period.split("-")[1];

        yearArray.push(year);
    });
    return yearArray;
};

const getYearArrayNew = (arrData) => {
    const yearArray = [];
    arrData.map((r) => {
        let year = r._id.year;

        yearArray.push(year);
    });
    return yearArray;
};

const getDataByYear = (arrayData, year) => {
    let dataByYear = [];
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i].period.split("-").includes(year)) {
            dataByYear.push(arrayData[i]);
        }
    }
    const arrayMonthInYear = []
    dataByYear.map(r => arrayMonthInYear.push(r.period.split("-")[0]))
    console.log(arrayMonthInYear);
    TWELVEMONTHS.map(m => {
        if (check_exist_arr(m, arrayMonthInYear) === false) {
            dataByYear.push({ period: m + '-' + year, count: 0 })
        }
    })
    return dataByYear;
};

const getDataByYearNew = (arrayData, year) => {
    let dataByYear = []
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i]._id.year.toString() === year) {
            dataByYear.push(arrayData[i])
        }
    }
    dataByYear.map(t => {
        let newPeriod;
        if (t._id.month > 10) {
            newPeriod = t._id.month.toString() + '-' + t._id.year.toString()
        } else {
            newPeriod = '0' + t._id.month.toString() + '-' + t._id.year.toString()
        }
        // delete t._id;
        t.period = newPeriod

    })

    const arrayMonthInYear = []
    dataByYear.map(r => arrayMonthInYear.push(r.period.split("-")[0]))
    TWELVEMONTHS.map(m => {
        if (check_exist_arr(m, arrayMonthInYear) === false) {
            dataByYear.push({ period: m + '-' + year, total: 0 })
        }
    })
    return dataByYear
}

function comparePeriod(a, b) {
    if (a.period < b.period) {
        return -1;
    }
    if (a.period > b.period) {
        return 1;
    }
    return 0;
}

function compareNew(a, b) {
    if (a._id.month < b._id.month) {
        return -1;
    }
    if (a._id.month > b._id.month) {
        return 1;
    }
    return 0;
}

module.exports = {
    countStatistic,
    convertToArray,
    getYearArray,
    getDataByYear,
    deduplicate,
    comparePeriod,
    getYearArrayNew,
    getDataByYearNew,
    compareNew
};
