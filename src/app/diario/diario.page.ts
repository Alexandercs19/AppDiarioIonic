import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Media, MediaObject } from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";


@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage{
  //Section para el Voice Recorder//
  status:string="";
  audiofile:MediaObject = this.media.create(this.file.externalRootDirectory+'/audiofile.mp3');

  //Section para las tabla//
  Diario = new Array();
  AddDiario = {
    titulo: '',
    texto: '',
    fecha: '',
  }
  visibleUpdate: boolean= true;
  visibleEdit: boolean = false;
  constructor(private media:Media, private file:File) { }

  add(diarios) {
    this.Diario.push(diarios);
    this.AddDiario = {
      titulo: '',
      texto: '',
      fecha: '',
    }
  }
  edit(diarios) {
    this.AddDiario = {
      titulo: diarios.titulo,
      texto: diarios.texto,
      fecha: diarios.fecha,

    }
  }
  update(DiarioEdit){
    var i = this.Diario.indexOf(DiarioEdit);
      this.Diario.splice(i,1);
      this.Diario.push(DiarioEdit);
      this.visibleUpdate=true;
      this.visibleEdit= false;

  }

  execute(DiarioEdit){
    this.AddDiario = {titulo: "", texto:"", fecha: "",}
    this.update(DiarioEdit)
  }
  delete(nombredelete) {

    var i = this.Diario.indexOf(nombredelete);
    this.Diario.splice(i , 1);

  }

  //Codigo del Voice Recorder//
  RecordAudio(){
    this.audiofile.startRecord();
    this.status = "Grabando...";

  }

  StopRecording(){
    this.audiofile.stopRecord();
    this.status = "Grabado"
  }


}
