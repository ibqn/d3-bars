(function() {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var yScale = d3.scaleLinear()
    .range([height, 0]);

  var xScale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.025);

  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.tsv("data.tsv", type, function(error, data) {
    if (error) throw error;

    xScale.domain(data.map(function(d) { return d.name; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + xScale(d.name) + ",0)"; });

    bar.append("rect")
      .attr("y", function(d) { return yScale(d.value); })
      .attr("height", function(d) { return height - yScale(d.value); })
      .attr("width", xScale.bandwidth());

    bar.append("text")
      .classed("bars", true)
      .attr("x", xScale.bandwidth() / 2)
      .classed("blue", function(d) {
        if ((height - yScale(d.value)) < 16) {
          return true;
        } else {
          return false;
        }
      })
      .attr("y", function(d) {
        var v = yScale(d.value),
            s = 3;
        if ((height - v) < 16) s = -13;

        return v + s;
      })
      .attr("dy", ".75em")
      .text(function(d) { return math.round(100 * d.value, 2); });

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale)
      .ticks(10, '%');

    // Add the x Axis
    chart.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the y Axis
    chart.append("g")
      .call(yAxis);
  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();
