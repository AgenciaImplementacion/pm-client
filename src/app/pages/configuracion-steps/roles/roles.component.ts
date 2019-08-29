import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  idStep: string;
  idProcess: string;
  nameStep: string;
  stepRoles: any;
  allSteps: any;
  idStepSelect: any;

  constructor(
    private services: ManageServicesService,
    private servicesp: ParameterizationServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idStep = response.idStep;
        this.idProcess = response.idProceso;
        this.nameStep = response.nameStep;
        //console.log("route response", response);
      }
    );
    let promise1 = new Promise((resolve, reject) => {
      this.services.GetRolesProcess(this.idProcess).subscribe(
        response => {
          this.stepRoles = response;
          for (let i in this.stepRoles) {
            this.stepRoles[i].status = false;
          }
          //console.log("this.roles: ", this.roles);
          resolve()
        }
      );
    });
    let promise2 = new Promise((resolve, reject) => {
      this.services.GetStepsProcess(this.idProcess).subscribe(
        data => {
          this.allSteps = data;
          this.idStepSelect = this.allSteps.find((item) => {
            return item.typeStep._id == this.idStep;
          })
          resolve()
        }
      );
    });
    Promise.all([promise1, promise2]).then(values => {
      console.log("this.idStepSelect: ", this.idStepSelect);
      this.idStepSelect.roles.find((item) => {
        this.stepRoles.filter(rol => {
          if (rol._id === item) {
            rol.status = true;
          }
        })
      })
      console.log("ROl: ", this.stepRoles);

    });
  }
  volver() {
    this.router.navigate(['procesos/' + this.idProcess + '/configuracion/']);
  }
  addRolToStep(rol: any, status: boolean) {
    console.log("rol: ", rol, " Estado: ", status);
    if (status === false) {
      let data = {
        'role': rol._id
      }
      this.services.AddRoleToStep(this.idStepSelect._id, data).subscribe(
        data => {
          console.log(data);
          this.toastr.success("Se a agregado el Rol")
        }
      )
    } else if (status === true) {
      this.services.RemoveRoleToStep(this.idStepSelect._id, rol._id).subscribe(
        data => {
          this.toastr.info("Se a eliminado el Rol")
        }
      )
    }
  }

}
