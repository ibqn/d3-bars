(function() {
  var margin = {top: 20, right: 30, bottom: 30, left: 40};

  var svg = d3.select(".chart"),
      svgWidth  = +svg.attr("width"),
      svgHeight = +svg.attr("height"),
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;

  var chart = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var yScale = d3.scaleLinear()
    .range([height, 0]);

  var xScale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.025);

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
      .call(yAxis)
      .append("text")
      .classed('axis', true)
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();


(function() {
  var svg = d3.select(".circles"),
      width  = +svg.attr("width"),
      height = +svg.attr("height");

  // Let's create a mock visualization
  var circleSizeMax = 15;
  var rMax = math.min(width, height)/2 - circleSizeMax;


  var radius 	= d3.scaleLinear().range([0, rMax]);
  var angle 	= d3.scaleLinear().range([0,2 * math.pi]);
  var size 	= d3.scaleLinear().range([0, circleSizeMax]);
  var color 	= d3.scaleOrdinal().range([
    '#fcfb3c','#fcf900','#ff825a','#ffd2cb','#71d362',
    '#ffd16f','#ff3d5d','#ff7218','#04b3f3','#bce5ac',
    '#6e0215','#69D2E7','#A7DBDB','#E0E4CC','#F38630',
    '#E94C6F','#542733','#5A6A62','#C6D5CD','#DB3340',
    '#E8B71A','#F7EAC8','#1FDA9A','#588C73','#F2E394',
    '#F2AE72','#D96459','#D0C91F','#85C4B9','#008BBA',
    '#DF514C','#00C8F8','#59C4C5','#FFC33C','#FBE2B4',
    '#5E412F','#FCEBB6','#78C0A8','#F07818','#DE4D4E',
    '#DA4624','#DE593A','#FFD041','#B1EB00','#53BBF4',
    '#FF85CB','#FF432E','#354458','#3A9AD9','#29ABA4',
    '#E9E0D6','#4298B5','#ADC4CC','#92B06A','#E19D29',
    '#BCCF02','#5BB12F','#73C5E1','#9B539C','#FFA200',
    '#00A03E','#24A8AC','#0087CB','#260126','#59323C',
    '#F2EEB3','#BFAF80','#BFF073','#0DC9F7','#7F7F7F',
    '#F05B47','#3B3A35','#20457C','#5E3448','#FB6648',
    '#E45F56','#A3D39C','#7ACCC8','#4AAAA5','#DC2742',
    '#AFA577','#ABA918','#8BAD39','#F2671F','#C91B26',
    '#9C0F5F','#60047A','#0F5959','#17A697','#638CA6',
    '#8FD4D9','#83AA30','#1499D3','#4D6684','#3D3D3D',
    '#333333','#424242','#00CCD6','#EFEFEF','#CCC51C',
    '#FFE600','#F05A28','#B9006E','#F17D80','#737495',
    '#68A8AD','#C4D4AF','#AF97C2','#0A656E','#EEAA33',
  ]);

  var x = function(d) { return radius(d.r) * Math.cos(angle(d.angle)); };
  var y = function(d) { return radius(d.r) * Math.sin(angle(d.angle)); };

  var chart = svg.append('g')
    .attr('transform', 'translate(' + [width / 2, height / 2] + ')');

  var data = d3.range(150).map(function(d) {
    return {
      r: math.random(),
      angle: math.random(),
      size: math.random()
    };
  });

  chart.selectAll('g')
    .data(data).enter()
    .append('circle')
    .attr('class', 'blend-circle')
    .attrs({
      cx: x,
      cy: y,
      r: function(d) { return size(d.size); },
      fill: function(d, i) { return color(i); }
  });
})();
