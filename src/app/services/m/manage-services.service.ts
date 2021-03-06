import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GetStepsProcess } from 'src/app/interface/get-steps-process';

@Injectable({
  providedIn: 'root'
})
export class ManageServicesService {
  url: string = environment.back_mongo;
  constructor(private httpClient: HttpClient) { }

  /**
 * CreateProcess
 */
  public CreateProcess(nombre: string) {
    return this.httpClient.post(this.url + '/api/m/processes', { processName: nombre });
  }
  // INICIO M/Processes
  /**
  * GetProcesos
  */
  public GetProcesos() {
    return this.httpClient.get<any>(this.url + '/api/m/processes');
  }

  /**
   * Update a Process
   */
  public UpdateaProcess(ipProcess: string, data: any) {
    return this.httpClient.put(this.url + '/api/m/processes/' + ipProcess, data);
  }
  /**
   * Remove a Process
   */
  public RemoveaProcess(idProcess: string) {
    return this.httpClient.delete(this.url + '/api/m/processes/' + idProcess);
  }
  /**
  * Add role to process
 */
  public AddRolProcess(idProcess: string, rol: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/roles', { role: rol });
  }
  /**
  * GetRolesProcess
  */
  public GetRolesProcess(id: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + id + '/roles');
  }
  /**
  * Update role to process
  */
  public UpdateRolProcess(idProcess: string, idRol: string, nombrerol: string) {
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/roles/' + idRol, { name: nombrerol });
  }
  /**
   * Remove Role From Process
   */
  public RemoveRoleFromProcess(idprocess: string, idrule: string) {
    return this.httpClient.delete(this.url + '/api/m/processes/' + idprocess + '/roles/' + idrule);
  }
  /**
   * Add step to process
   */
  public AddStepProcess(idProcess: string, steps: string) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/steps', { step: steps });
  }
  /**
   * Get steps from process
   */
  public GetStepsProcess(id: string) {
    return this.httpClient.get<GetStepsProcess>(this.url + '/api/m/processes/' + id + '/steps');
  }
  /**
   * Remove Step To Process
   */
  public RemoveStepToProcess(idProcess: string, stepsSelect: string) {
    return this.httpClient.delete(this.url + '/api/m/processes/' + idProcess + '/steps/' + stepsSelect);
  }
  /**
   * Add variable to process
   */
  public AddVariableToProcess(idProcess: string, data: any) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/variables', data);
  }
  /**
   * Get Variables From Process
   */
  public GetVariablesFromProcess(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + idProcess + '/variables');
  }
  /**
   * Update Variables From Process
   */
  public UpdateVariablesFromProcess(idProcess: string, idVariable: string, data: any) {
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/variables/' + idVariable, data);
  }
  /**
   * Remove Variable From Process
   */
  public RemoveVariableFromProcess(idProcess: string, idVariable: string) {
    return this.httpClient.delete(this.url + '/api/m/processes/' + idProcess + '/variables/' + idVariable);
  }
  /**
   * Add Users To Process
   */
  public AddUsersToProcess(idProcess: string, data: any) {
    return this.httpClient.post(this.url + '/api/m/processes/' + idProcess + '/users', data);
  }
  /**
   * Get Users To Process
   */
  public GetUsersToProcess(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + idProcess + '/users');
  }
  /**
   * Update User To Process
   */
  public UpdateUserToProcess(idProcess: string, idUser: string, data: any) {
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/users/' + idUser, data);
  }
  /**
   * Remove User From Process
   */
  public RemoveUserFromProcess(idProcess: string, idUser: string) {
    return this.httpClient.delete(this.url + '/api/m/processes/' + idProcess + '/users/' + idUser);
  }
  /**
   * Deploy Process
   */
  public DeployProcess(idProcess: string) {
    return this.httpClient.put(this.url + '/api/m/processes/' + idProcess + '/deploy', {})
  }
  /**
   * Get Steps Flow
   */
  public GetStepsFlow(idProcess: string) {
    return this.httpClient.get<any>(this.url + '/api/m/processes/' + idProcess + '/flow')
  }

  // FIN M/Processes


  //INICIO M/Steps

  /**
   * Add Field To Step
   */
  public AddFieldToStep(idstep: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.post(this.url + '/api/m/steps/' + idstep + '/fields', data);
  }

  /**
   * Get Fields From Step
   */
  public GetFieldsFromStep(idstep: string) {
    return this.httpClient.get<any>(this.url + '/api/m/steps/' + idstep + '/fields');
  }
  /**
   * Update Field From Step
   */
  public UpdateFieldFromStep(idStep: string, idField: string, formData: any) {
    let data = formData
    //console.log("data: ", data);
    return this.httpClient.put(this.url + '/api/m/steps/' + idStep + '/fields/' + idField, data);
  }
  /**
   * Remove Field From Step
   */
  public RemoveFieldFromStep(idStep: string, idField: string) {
    return this.httpClient.delete(this.url + '/api/m/steps/' + idStep + '/fields/' + idField);
  }
  /**
   * Add Rule To Step
   */
  public AddRuleToStep(idStep: string, data: any) {
    return this.httpClient.post(this.url + '/api/m/steps/' + idStep + '/rules', data);
  }
  /**
   * Remove rule to step
   */
  public RemoveRuleToStep(idStep: string, idRule: string) {
    return this.httpClient.delete(this.url + '/api/m/steps/' + idStep + '/rules/' + idRule);
  }
  /**
   * Add Role To Step
   */
  public AddRoleToStep(idStep: string, data: any) {
    return this.httpClient.post(this.url + '/api/m/steps/' + idStep + '/roles', data);
  }
  /**
   * Remove Role To Step
   */
  public RemoveRoleToStep(idStep: string, idRol: string) {
    return this.httpClient.delete(this.url + '/api/m/steps/' + idStep + '/roles/' + idRol);
  }
  /**
   * Set Origin Step
   */
  public SetOriginStep(idStep: string) {
    return this.httpClient.put(this.url + '/api/m/steps/' + idStep + '/origin', {})
  }
  //FIN M/Steps
}
