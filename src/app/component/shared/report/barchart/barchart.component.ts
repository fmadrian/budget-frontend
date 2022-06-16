import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { generateRandomColors } from 'src/app/utils/color';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements OnInit, OnChanges {
  @Input() chartName = 'chart';
  @Input() reports: string = '';
  @Input() subgroups: string[] = [];
  @Input() maxY: number = 0;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  summary: any[] = [];
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.reports !== '') {
      // Creates the chart from the JSON file from the string sent.
      this.drawChart(JSON.parse(this.reports));
    }
  }

  private drawChart(data: any) {
    const extra_key = `_`; // A value that is added in the selector of each rectangle (NOT NECESSARY if you only use text subgroups. EX: 'water')
    // Create svg and append it to the chart.
    const svg: any = d3
      .select('#' + this.chartName)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 3} ${this.height + this.margin * 3}`
      )
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    // Groups and subgroups

    // const subgroups = data.columns.slice(1);
    const groups = data.map((d: any) => d.name); // Define the X axis as 'name' or  X axis = name
    // Create the X-axis band scale.
    const x = d3.scaleBand().range([0, this.width]).domain(groups).padding(0.2);

    // Draw the X-axis on the DOM.
    svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Create the Y-axis band scale.
    const y = d3.scaleLinear().domain([0, this.maxY]).range([this.height, 0]);

    // Draw the Y-axis on the DOM.
    svg.append('g').call(d3.axisLeft(y));

    // color palette - one color per subgroup
    const colors = generateRandomColors(this.subgroups.length); // Colors that will be used in the chart
    const colorPalette = d3
      .scaleOrdinal()
      .domain(this.subgroups)
      .range([...colors]);

    // stack the data per subgroup
    const stackedData = d3.stack().keys(this.subgroups)(data);
    // Create a tooltip
    const tooltip = d3
      .select('#' + this.chartName)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('position', 'absolute')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    // Create and fill the bars.
    svg
      .append('g')
      .selectAll('g')
      .data(stackedData)
      .join('g')
      .attr('fill', (d: any) => colorPalette(d.key))
      .attr('class', function (d: any) {
        return 'myRect ' + extra_key + d.key;
      }) // Add a class to each subgroup (name)
      .selectAll('rect')
      .data((data: any) => data)
      .join('rect')
      .attr('x', (d: any) => x(d.data.name)) // X axis = name
      .attr('y', (d: any) => y(d[1]))
      .attr('height', (d: any) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .attr('stroke', 'grey')
      .on('mouseover', (event: any, d: any) => {
        // Get parent's node datum to show information in the tooltip.
        let parentNodeDatum = d3.select(event.target.parentNode).datum() as any;
        const subgroupName = parentNodeDatum.key;
        const subgroupValue = d.data[subgroupName];
        tooltip
          .html(
            'subgroup: ' + subgroupName + '<br>' + 'Value: ' + subgroupValue
          )
          .style('opacity', 1);

        // Reduce opacity of all rect to 0.2
        d3.selectAll('.myRect').style('opacity', 0.2);
        // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
        d3.selectAll('.' + extra_key + subgroupName).style('opacity', 1);
      })
      // Set the mouse events.
      .on('mousemove', (event: any, d: any) => {
        tooltip
          .style('transform', 'translateY(-55%)')
          .style('left', event.pageX - 30 + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style('top', event.pageY - 90 + 'px');
      })
      .on('mouseleave', (event: any, d: any) => {
        // Hides tooltip.
        tooltip.style('opacity', 0);

        // Back to normal opacity: 0.8
        d3.selectAll('.myRect').style('opacity', 0.8);
      });
    // Build summary
    this.summary = this.buildSummary(this.subgroups, colors);
  }
  private buildSummary(subgroups: string[], colors: string[]) {
    let result = [];
    for (let i = 0; i < subgroups.length; i++) {
      result.push({ subgroup: subgroups[i], color: colors[i] });
    }
    return result;
  }
}
