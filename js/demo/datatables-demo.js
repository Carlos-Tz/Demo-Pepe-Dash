
function chartDatatable(startDate, endDate, table) {
  const database = firebase.database();
  const rootRef = database.ref().child('polls');

  rootRef
  .orderByChild("date")
  .startAt(startDate)
  .endAt(endDate)
  .on("child_added", snap => {
    var date = parseInt(snap.child("date").val());
    var datef = new Date(date);
    var options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
    };

    var result = datef.toLocaleDateString('es', options);
    
    const dataSet = [
      snap.child("name").val(),
      snap.child("email").val(),
      snap.child("fecha").val(),
      snap.child("telefono").val(),
      snap.child("group5").val(),
      snap.child("comentarios").val(),
      result
    ];
    table.rows.add([dataSet]).draw();
  });
}
