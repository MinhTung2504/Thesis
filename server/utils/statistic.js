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
    return dataByYear;
};

const getDataByYearNew = (arrayData, year) => {
    let dataByYear = []
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i]._id.year.toString() === year) {
            dataByYear.push(arrayData[i])
        }
    }
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
