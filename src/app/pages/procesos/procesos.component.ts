import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  listaprocesos = true;
  updateprocess = false;
  process = []
  nomProcessCreate: string;
  ipProcessUpdate: string;
  dataUpdate: any;
  constructor(
    private services: ManageServicesService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.services.GetProcesos().subscribe(
      response => {
        for (let i in response) {
          this.process.push({
            'process': response[i]
          })
        }
        //console.log("response get this.procesos: ", this.process);
      }
    );
  }

  viewProcess() {
    this.listaprocesos = false;
  }
  CreateProcess() {
    this.services.CreateProcess(this.nomProcessCreate).subscribe(
      data => {
        this.process.push({ 'process': data });
        this.listaprocesos = true;
        this.toastr.success("Haz registrado el proceso: " + this.nomProcessCreate)
      }
    );
  }
  volver() {
    this.listaprocesos = true;
    this.updateprocess = false;
  }
  ConfigProcess(id: string) {
    this.route.navigate(['procesos/' + id + '/configuracion/']);
  }
  viewupdateProcess(nomProcess: string, id: number) {
    this.updateprocess = true;
    this.nomProcessCreate = nomProcess;
    this.ipProcessUpdate = this.process[id].process._id;
  }
  updateProcess() {
    this.dataUpdate = {
      "process": this.ipProcessUpdate,
      "processName": this.nomProcessCreate
    }
    this.services.UpdateaProcess(this.ipProcessUpdate, this.dataUpdate).subscribe(
      response => {
        setTimeout(function () { window.location.reload(); }, 1000);
        this.toastr.success("Haz Actualizado un proceso")
      }
    )
  }

  deleteProcess(idProcess: string, id) {
    this.services.RemoveaProcess(idProcess).subscribe(
      paramName => {
        this.toastr.success("Se a eliminado un proceso")
        this.process.splice(id, 1);
      });
  }

}
