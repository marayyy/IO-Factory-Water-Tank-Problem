function fetchArr() {
  const inputElement = document.getElementById('inputArr');
  if (inputElement.value.trim() === '') {
    console.log('Please enter a valid input value');
    return;
  }
  const inputArr = inputElement.value.split(',');
  const parsedArr = inputArr.map((num) => parseInt(num));
  if (parsedArr.some((num) => isNaN(num))) {
    console.log('Please enter valid numbers only');
    return;
  }
  const bricks = waterAndBricks(parsedArr);
  const water = onlyWater(parsedArr);
  console.log('Bricks:', bricks);
  console.log('Water:', water);
}
function createTable(xaxisinput,outputArr,id) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    var option;
    option = {
    xAxis: {
        type: 'category',
        data: xaxisinput
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: outputArr,
        type: 'bar'
        }
    ]
    };
    if (option && typeof option === 'object') {
    myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
}

const countWaterUnits = (finalCase) => {
    let sum = 0
    for (let i = 0; i < finalCase.length; i++) {
        let element = finalCase[i];
        if (element != '-') {
            sum += +element
        }
    }
    return sum
}

function waterAndBricks(bricks) {
    let finalCase=[]
    let firstCase=[]
    let secondCase=[]
    let result=[]
    let lastValueForFirstCase=0
    let lastValueForSecondCase=0
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if (element == 0) {
            firstCase.push(lastValueForFirstCase)
        }else{
            firstCase.push('-')
            lastValueForFirstCase =element
        }
    }
    for (let  i = bricks.length - 1; i >= 0; i--) {
        let element = bricks[i];
        if (element == 0) {
            secondCase[i] = lastValueForSecondCase
        }else{
            secondCase[i]= '-'
            lastValueForSecondCase=element
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let fc=firstCase[i]
        let sc=secondCase[i]
        if (fc == '-') {
            finalCase[i]='-'
        }else{
            finalCase[i]=fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if(element == 0){
            result.push({
                value: finalCase[i],
                itemStyle: {
                    color: '#00CED1'
                }
            })
        }else{
            result.push({
                value: element,
                itemStyle: {
                    color: '#A52A2A'
                }
            })
        }
    }
    console.log(firstCase);
    console.log(secondCase);
    console.log(finalCase);
    console.log(result);
    console.log(countWaterUnits(finalCase));
    createTable(bricks,result,'chart-chamber')
    let outputSpan = document.getElementById('waterunit')
    outputSpan.innerHTML= `Total ${countWaterUnits(finalCase)} Units` 
}


function onlyWater(water) {
    let firstCase = [];
    let secondCase = [];
    let finalCase = [];
    let result = [];
    let lastValueForFirstCase = 0;
    let lastValueForSecondCase = 0;
    for (let i = 0; i < water.length; i++) {
      let element = water[i];
      if (element == 0) {
        firstCase.push(lastValueForFirstCase);
      } else {
        firstCase.push('-');
        lastValueForFirstCase = element;
      }
    }
    for (let i = water.length - 1; i >= 0; i--) {
      let element = water[i];
      if (element == 0) {
        secondCase[i] = lastValueForSecondCase;
      } else {
        secondCase[i] = '-';
        lastValueForSecondCase = element;
      }
    }
    for (let i = 0; i < water.length; i++) {
      let fc = firstCase[i];
      let sc = secondCase[i];
      if (fc == '-') {
        finalCase[i] = '-';
      } else {
        finalCase[i] = fc - sc > 0 ? sc : fc;
      }
    }
    for (let i = 0; i < water.length; i++) {
      let element = water[i];
      if (element == 0) {
        result.push({
          value: finalCase[i],
          itemStyle: {
            color: '#00CED1',
          },
        });
      } else {
        result.push({
          value: element - finalCase[i],
          itemStyle: {
            color: '#A52A2A',
          },
        });
      }
    }
    createTable(water, result, 'chart-chamber1');
  }  