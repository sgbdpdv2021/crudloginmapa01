import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { isNull } from 'util';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private longitude: any
  private latitude: any
  private office: any

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.longitude, this.latitude],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const marker = L.marker([this.longitude, this.latitude]);

    marker.bindPopup(`<b>Office: ${this.office}</b><br>${this.longitude},${this.latitude}.`).openPopup();
    marker.addTo(this.map);

    tiles.addTo(this.map);
  }

  // Usamos ActivatedRoute para recuperar parámetros
  constructor(private _Activatedroute: ActivatedRoute) { }
  // Ponemos valores iniciales del IES Punta del Verde venimos sin parámetros
  ngAfterViewInit(): void {
    let longitude = this._Activatedroute.snapshot.paramMap.get("longitude");
    let latitude = this._Activatedroute.snapshot.paramMap.get("latitude");
    let office = this._Activatedroute.snapshot.paramMap.get("office")
    if (isNull(latitude) || isNull(longitude)){
      this.longitude = 37.35500
      this.latitude = -5.98865
    }else{
      this.longitude = longitude
      this.latitude = latitude
      this.office = office
    }
    this.initMap();
  }
}