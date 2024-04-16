// radar
const cfg = {
    w: 400, 
    h: 400, 
    maxValue: 10, 
    levels: 10, 
    ExtraWidthX: 100 
  };
  
  // value
  let d = [
    {axis: "Happy", value: 5, order: 0},
    {axis: "Bored", value: 3, order: 1},
    {axis: "Love It", value: 4, order: 2},
    {axis: "Want to Dance", value: 7, order: 3},
    {axis: "Sad", value: 2, order: 4},
    {axis: "Anxious", value: 6, order: 5}
  ];
  
  const svg = d3.select('#radarChart').append('svg')
    .attr('width', cfg.w + cfg.ExtraWidthX)
    .attr('height', cfg.h + cfg.ExtraWidthX)
    .attr('class', 'radar')
    .attr('viewBox', `0 0 ${cfg.w + cfg.ExtraWidthX} ${cfg.h + cfg.ExtraWidthX}`)
    .append('g')
    .attr('transform', `translate(${cfg.w / 2 + cfg.ExtraWidthX / 2},${cfg.h / 2 + cfg.ExtraWidthX / 2})`);
  
  const angleSlice = Math.PI * 2 / d.length;
  
  // background
  const levelFactor = cfg.h / 2 / cfg.levels;
  for (let i = 0; i < cfg.levels; i++) {
    let r = levelFactor * (i + 1);
    svg.append('circle')
      .attr('class', 'grid-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', r)
      .style('fill', 'none')
      .style('stroke', 'grey')
      .style('stroke-opacity', '0.5')
      .style('stroke-width', '0.5px');
  }
  
  const radarLine = d3.radialLine()
    .curve(d3.curveLinearClosed)
    .radius(d => d.value * (cfg.h / 2) / cfg.maxValue)
    .angle((d, i) => i * angleSlice);
  
  function initRadar() {
    svg.append('path')
      .datum(d)
      .attr('class', 'radarArea')
      .attr('d', radarLine)
      .style('fill', '#cc333f')
      .style('fill-opacity', 0.7);
  

    d.forEach((dataPoint, i) => {
      const lineCoords = calculateLineCoords(i, cfg.maxValue);
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineCoords.x)
        .attr('y2', lineCoords.y)
        .style('stroke', 'black')
        .style('stroke-width', '1px');
    
      const x = (cfg.w / 2 * Math.cos(angleSlice * i - Math.PI / 2)) * 1.1; 
      const y = (cfg.h / 2 * Math.sin(angleSlice * i - Math.PI / 2)) * 1.1; 
      svg.append('text')
        .attr('class', 'legend')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('x', x)
        .attr('y', y)
        .text(dataPoint.axis);
    });
  }
  
  // drag function
  function addDragAndSave() {
    const radarArea = svg.selectAll('.radarArea');
    const dragHandler = d3.drag()
      .on('start', function() { d3.select(this).raise(); })
      .on('drag', function(event, d) {
        const r = Math.sqrt(event.x * event.x + event.y * event.y);
        const angle = Math.atan2(event.y, event.x);
        const angleIdx = d.order;
        const newAngle = angleSlice * angleIdx - Math.PI / 2;
        const distance = Math.min(cfg.maxValue, Math.max(0, r / (cfg.w / 2) * cfg.maxValue));
        d.value = distance;
        d3.select(this)
          .attr('cx', distance * (cfg.w / 2) * Math.cos(newAngle) / cfg.maxValue)
          .attr('cy', distance * (cfg.h / 2) * Math.sin(newAngle) / cfg.maxValue);
        radarArea.attr('d', radarLine);
      });
  
    svg.selectAll('.nodes')
      .data(d)
      .enter()
      .append('circle')
      .attr('class', 'radarChartNode')
      .attr('r', 5)
      .attr('cx', (d, i) => d.value * cfg.w / 2 / cfg.maxValue * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => d.value * cfg.h / 2 / cfg.maxValue * Math.sin(angleSlice * i - Math.PI / 2))
      .style('fill', 'red')
      .call(dragHandler);
  

    document.getElementById('save-chart').addEventListener('click', () => {
      const newData = JSON.parse(JSON.stringify(d)); 
      svg.append('path')
        .datum(newData)
        .attr('class', 'radarArea')
        .attr('d', radarLine)
        .style('fill', () => `hsla(${Math.random() * 360}, 100%, 70%, 0.7)`) // color
        .style('fill-opacity', 0.7);
    });
  }
  
  function calculateLineCoords(index, length) {
    return {
      x: length * (cfg.w / 2 / cfg.maxValue) * Math.cos(angleSlice * index - Math.PI / 2),
      y: length * (cfg.h / 2 / cfg.maxValue) * Math.sin(angleSlice * index - Math.PI / 2)
    };
  }
  
  initRadar();
  addDragAndSave();
  