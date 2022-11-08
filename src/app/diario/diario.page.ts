import { Component, OnInit } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { PhotoService } from '../services/photo.service';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Filesystem, Directory, Encoding, RecordingData } from '@capacitor/filesystem';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Camera } from '@capacitor/camera';
@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {
  //Section para el Voice Recorder//
  public status: string[];
  public audiofile: MediaObject;
  public recording = false;
  public storedfileNames = [];

  //Section para las tabla//
  public titulo: string[];
  public texto: string[];
  public fecha: Date[];
  public voice: string[];
  public camera: string[];

  Diario = new Array();
  AddDiario = {
    titulo: '',
    texto: '',
    fecha: '',
    Voice: '',
  }
  visibleUpdate: boolean = true;
  visibleEdit: boolean = false;
  constructor(private media: Media, private file: File, public photoService: PhotoService, private Nativeaudio: NativeAudio) { }

  add(diarios) {
    this.Diario.push(diarios);
    this.AddDiario = {
      titulo: '',
      texto: '',
      fecha: '',
      Voice: '',
    }
  }
  edit(diarios) {
    this.AddDiario = {
      titulo: diarios.titulo,
      texto: diarios.texto,
      fecha: diarios.fecha,
      Voice: diarios.Voice,

    }
  }
  update(DiarioEdit) {
    var i = this.Diario.indexOf(DiarioEdit);
    this.Diario.splice(i, 1);
    this.Diario.push(DiarioEdit);
    this.visibleUpdate = true;
    this.visibleEdit = false;

  }

  execute(DiarioEdit) {
    this.AddDiario = { titulo: "", texto: "", fecha: "", Voice: "", }
    this.update(DiarioEdit)
  }
  delete(nombredelete) {

    var i = this.Diario.indexOf(nombredelete);
    this.Diario.splice(i, 1);

  }

  //Codigo del Voice Recorder//


  ionViewWillEnter() {
    this.Nativeaudio.preloadSimple('num1', 'assets/audio/1.mp3')
    this.Nativeaudio.preloadSimple('num2', 'assets/audio/2.mp3')

  }

  play1() {
    this.Nativeaudio.play('num1')
  }

  play2() {
    this.Nativeaudio.play('num2')
  }

  IonViewWillLeave() {

    this.Nativeaudio.unload('num1');
    this.Nativeaudio.unload('num2');

  }

  ngOnInit() {
    this.loadFiles();
    VoiceRecorder.requestAudioRecordingPermission();
  }

  async loadFiles() {
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result => {
      console.log(result);
      this.storedfileNames = result.files;
    })
  }

  startRecording() {
    if (this.recording) {
      return;
    }
    this.recording = true;
    VoiceRecorder.startRecording();
  }

  stopRecording() {
    if (!this.recording) {
      return;
    }
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      this.recording = false;
      if (result.value && result.value.recordDataBase64) {
          const recordData = result.value.recordDataBase64;
          console.log("~file: diario.page.ts ~ line 124 ~ DiarioPage ~ VoiceRecording.stopRecording ~ recordData", recordData)
          const filename = new Date().getTime() + '.wav';
          await Filesystem.writeFile({
            path: filename,
            directory: Directory.Data,
            data: recordData
          });
          this.loadFiles();
      }
    })
  }
  async playFile(filename){
    const audioFile = await Filesystem.readFile({
      path: filename,
      directory: Directory.Data,
    });
    console.log("~file: diario.page.ts ~ line 148 ~ DiarioPage ~ playFile ~ audioFile", audioFile)
    const base64sound = audioFile.data;
    const audioRef= new Audio(`data:audio/aac;base64,${base64sound}`)
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  async DeleteRecording(filename){
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
    this.loadFiles();
  } 
  

  //CAMARA CODIGO
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
