var body = d3.select('body');
var svg = d3.select('body').select('svg');

var datasetTest = [{item: 'cats', value: 20}, {item:'dogs', value: 25}, {item: 'parakeet', value: 45}, {item: 'serval', value: 50}];

// var data = [4, 8, 15, 16, 23, 42];

var width = 420;
var barHeight = 20;

var x = d3.scale.linear()
  .range([0, 500]);

var chart = d3.select('.chart')
  .attr('width', width)

var type = function(d) {
  d.Number_of_Patients = +d.Number_of_Patients;
  return d;
}

d3.csv('data2.csv', type, function(error, data) {
  x.domain([0, d3.max(data, function(d) { return d.Number_of_Patients; })]);

  chart.attr('height', barHeight * data.length);

  var bar = chart.selectAll('g')
      .data(data)
    .enter().append('g')
      .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

  bar.append('rect')
    .attr('width', function (d) { return x(d.Number_of_Patients); })
    .attr('height', barHeight - 2)
    .style('fill', 'steelblue');

  bar.append('text')
    .attr('x', function(d) { return 2; }) //-3 is for spacing on the right side
    .attr('y', barHeight / 2) /// 2 is for spacing above and below
    .attr('dy', '.35em')
    .text(function(d) { return d.Number_of_Patients; });
  
});


var updateBarGraph = function(data) {
  // var graphStats = body.select('.chart').selectAll('.barStat');

  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([0, 500]);

    //update graphStats
    var graphStats = body.select('.chart').selectAll('.barStat')
      .data(data, 
        function(d) { return d.item; })
      .attr('width', function (d) { return x(d.value) + 'px' })
      .text(function(d) { return d.value });

    //create new graphStats
    graphStats
      // .data(data)
        .enter()
        .append('div')
          .attr('class', 'barStat')
          // .style('height', '10px')
          .style('width', function (d) { return x(d.value) + 'px' })
          .style('background-color', 'steelblue')
          .text(function(d) { return d.value });
    //delete unused graphStats
    graphStats
      // .data(data)
        .exit()
        .remove()
}

// updateBarGraph(datasetTest);

var createCircle = function(d, color) {
  var r = d / 2;

  selectBody.select('svg')
    // .enter()
      .append('circle')
        .data([color])
        // .data['blue']
        .attr('cx', r)
        .attr('cy', r)
        .attr('r', r)
        .style('fill', function(d) { return d; });
};

var createManyCircles = function(d, colors) {
  colors.forEach(function(color) {
    createCircle(d, color);
  });
};


// d3.select('body').append('svg')
//   .attr('width', 50)
//   .attr('height', 50)
// .append('circle')
//   .attr('cx', 25)
//   .attr('cy', 25)
//   .attr('r', 25)
//   .style('fill', 'orange');