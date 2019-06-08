// Firebase config in index.html file
// todo: Mejora meter todos los checkboxes en un subnodo "checkboxes/questions"

function index(startDate, endDate) {
  const database = firebase.database();
  const rootRef = database.ref().child('polls');
  let capitanMesaYes = 0;
  let capitanMesaNo = 0;
  let ofrecieronVinoYes = 0;
  let ofrecieronVinoNo = 0;
  let cartaPostresYes = 0;
  let cartaPostresNo = 0;
  let recomendacionConocidosYes = 0;
  let recomendacionConocidosNo = 0;
  let recibirPromosYes = 0;
  let recibirPromosNo = 0;
  let servicio1 = 0;
  let servicio2 = 0;
  let servicio3 = 0;
  let servicio4 = 0;
  let servicio5 = 0;
  let calidad1 = 0;
  let calidad2 = 0;
  let calidad3 = 0;
  let calidad4 = 0;
  let calidad5 = 0;
  let precio1 = 0;
  let precio2 = 0;
  let precio3 = 0;
  let precio4 = 0;
  let precio5 = 0;
  let limpieza1 = 0;
  let limpieza2 = 0;
  let limpieza3 = 0;
  let limpieza4 = 0;
  let limpieza5 = 0;

  rootRef
    .orderByChild("date")
    .startAt(startDate)
    .endAt(endDate)
    .on("child_added", snap => {

      switch (snap.child('servicio').val()) {
        case 1:
          servicio1++;
          break;
        case 2:
          servicio2++;
          break;
        case 3:
          servicio3++;
          break;
        case 4:
          servicio4++;
          break;
        case 5:
          servicio5++;
          break;
      }

      switch (snap.child('calidad').val()) {
        case 1:
          calidad1++;
          break;
        case 2:
          calidad2++;
          break;
        case 3:
          calidad3++;
          break;
        case 4:
          calidad4++;
          break;
        case 5:
          calidad5++;
          break;
      }
      switch (snap.child('precio').val()) {
        case 1:
          precio1++;
          break;
        case 2:
          precio2++;
          break;
        case 3:
          precio3++;
          break;
        case 4:
          precio4++;
          break;
        case 5:
          precio5++;
          break;
      }
      switch (snap.child('limpieza').val()) {
        case 1:
          limpieza1++;
          break;
        case 2:
          limpieza2++;
          break;
        case 3:
          limpieza3++;
          break;
        case 4:
          limpieza4++;
          break;
        case 5:
          limpieza5++;
          break;
      }

      if (snap.child('group1').val() === 'SI') capitanMesaYes++;
      else capitanMesaNo++;
      if (snap.child('group2').val() === 'SI') ofrecieronVinoYes++;
      else ofrecieronVinoNo++;
      if (snap.child('group3').val() === 'SI') cartaPostresYes++;
      else cartaPostresNo++;
      if (snap.child('group4').val() === 'SI') recomendacionConocidosYes++;
      else recomendacionConocidosNo++;
      if (snap.child('group5').val() === 'SI') recibirPromosYes++;
      else recibirPromosNo++;


      drawChart([capitanMesaYes, capitanMesaNo], "pieChart1");
      drawChart([ofrecieronVinoYes, ofrecieronVinoNo], "pieChart2");
      drawChart([cartaPostresYes, cartaPostresNo], "pieChart3");
      drawChart([recomendacionConocidosYes, recomendacionConocidosNo], "pieChart4");
      drawChart([recibirPromosYes, recibirPromosNo], "pieChart5");
      drawEmojiChart([servicio1, servicio2, servicio3, servicio4, servicio5], "servicioChart");
      drawEmojiChart([calidad1, calidad2, calidad3, calidad4, calidad5], "calidadChart");
      drawEmojiChart([precio1, precio2, precio3, precio4, precio5], "precioChart");
      drawEmojiChart([limpieza1, limpieza2, limpieza3, limpieza4, limpieza5], "limpiezaChart");
    });
}

function drawChart(dataSet, id) {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';

  const ctx = document.getElementById(id);
  const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Si", "No"],
      datasets: [{
        data: dataSet,
        backgroundColor: ['#f44336', '#40c4ff'],
      }],
    },
    options: {
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {

            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            return (value * 100 / sum).toFixed(2) + `% (${value})`;

          },
          color: '#fff',
        }
      },
      events: []
    }

  });
}

function drawEmojiChart(dataSet, id) {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';
  const ctx = document.getElementById(id);
  const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [{
        data: dataSet,
        backgroundColor: ['#f44336', '#40c4ff', '#ff9800', '#9575cd ', '#795548'],
      }],
    },
    options: {
      legend: {
        labels: {
          fontSize: 10
        }
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {

            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            return (value * 100 / sum).toFixed(2) + `% (${value})`;

          },
          display: function (context) {
            return context.dataset.data[context.dataIndex] !== 0;
          },
          color: '#fff',
        }
      },
      events :[]
    }
  });
}








