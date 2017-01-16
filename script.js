(function() {
  var width = 960,
      height = 500;

  var yScale = d3.scaleLinear()
    .range([height, 0]);

  var xScale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.025);

  var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

  d3.tsv("data.tsv", type, function(error, data) {
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
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", function(d) { return yScale(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return round(d.value, 2); });
  });

  function round(num, pos) {
    return +(Math.round(num + "e+" + pos)  + "e-" + pos);
}

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();
