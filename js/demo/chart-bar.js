;
(function () {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';
  Chart.defaults.global.responsive = true;

  const database = firebase.database();
  const rootRef = database.ref().child('polls');
  /*
  select1: "3"
  select2: "3"
  select3: "3"
  select4: "3"
  select5: "3"

  servicio
  calidad
  precio
  limpieza
  */

  console.log(rootRef);

  let select1 = 0;
  let select2 = 0;
  let select3 = 0;
  let select4 = 0;
  let select5 = 0;
  
  let total = 0;



  let data = [];
  rootRef.on("child_added", (snap) => {
    console.log(snap.val());
    if (snap.child('servicio'))  select1 += parseInt(snap.child('servicio').val(), 10);
    if (snap.child('calidad'))  select2 += parseInt(snap.child('calidad').val(), 10);
    if (snap.child('precio'))  select3 += parseInt(snap.child('precio').val(), 10);
    if (snap.child('limpieza'))  select4 += parseInt(snap.child('limpieza').val(), 10);
    // if (snap.child('select5'))  select5 += parseInt(snap.child('select5').val(), 10);
    total++;
    drawChart([
      (select1/total).toFixed(2), 
      (select2/total).toFixed(2), 
      (select3/total).toFixed(2),
      (select4/total).toFixed(2), 
      // (select5/total).toFixed(2)
    ]);
    
  })

  function drawChart(dataSet) {
    console.log(myLineChart);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'myBarChart');
    canvas.setAttribute('width', '100%')
    canvas.setAttribute('height', '50');
    document.getElementById("barChartContainer").innerHTML = '';
    document.getElementById("barChartContainer").appendChild(canvas);
    console.log(dataSet);
    var ctx = document.getElementById("myBarChart");
    ctx.html = '';
    
    var myLineChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ["Servicio", "Calidad", "Precio", "Limpieza", "Recomendación Conocidos"],
        datasets: [{
          label: "Promedio",
          backgroundColor: [
            "rgba(255,215,0,1)",
            "rgba(32,178,170)",
            "rgba(65,105,225,.7)",
            "rgba(176,196,222,1)",
            "rgba(236,196,222,1)"
          ],
          borderColor: "rgba(2,117,216,1)",
          data: dataSet,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: 1,
              max: 5,
              stepValue: 1,
              callback: function(value, index, values) {
                // return document.write('<img src="../../../images/confused.svg">');
                return value;
              }
            },
            gridLines: {
              offsetGridLines: true
            } 
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true
            },
          }],
        },
        legend: {
          display: false
        }
      }
      
    });
  }

})();


