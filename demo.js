var body = d3.select('body');
var svg = d3.select('body').select('svg');


var updateBarGraph = function(data) {
  var graphStats = body.select('.chart').selectAll('.barStat');

  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 500]);

    //update graphStats
    graphStats
      .data(data)
          .attr('width', function (d) { return x(d) + 'px' })
          .text(function(d) { return d });

    //create new graphStats
    graphStats
      .data(data)
        .enter()
        .append('div')
          .attr('class', 'barStat')
          // .style('height', '10px')
          .style('width', function (d) { return x(d) + 'px' })
          .style('background-color', 'blue')
          .text(function(d) { return d });
    //delete unused graphStats
    graphStats
      .data(data)
        .exit()
        .remove()
}

updateBarGraph([20, 25, 45, 50]);

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