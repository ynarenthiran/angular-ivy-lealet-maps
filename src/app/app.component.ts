import {
  Component,
  VERSION,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";
declare var L: any;
import "leaflet";
import "@asymmetrik/leaflet-d3";

const data = [
  [7.030196, 43.979072],
  [2.350499, 48.862654],
  [5.998407, 43.562749],
  [7.45332, 43.791488],
  [7.425936, 43.77821],
  [7.311922, 43.742275],
  [7.261293, 43.707305]
];

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  map: any;
  @ViewChild("map") container: ElementRef;

  ngAfterViewInit() {
    this.map = new L.Map(this.container.nativeElement, {
      center: [2.349847, 47.279229],
      zoom: 2
    });
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(this.map);
    this.formHexagonLayer();
  }

  formHexagonLayer() {
    const options = {
      opacity: 0.5,
      duration: 500,
      colorRange: ["#f7fbff", "#f7fbff"],
      radiusScaleExtent: [1, 102]
    };
    var hexLayer = L.hexbinLayer(options).addTo(this.map);
    hexLayer.data(data);
    hexLayer
      .lng(d => {
        return d[0];
      })
      .lat(d => {
        return d[1];
      });
  }
}
