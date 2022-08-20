import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mission } from 'src/app/models/Mission';
import { MissionService } from 'src/app/services/mission.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.page.html',
  styleUrls: ['./create-mission.page.scss'],
})
export class CreateMissionPage implements OnInit {

  form = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
    ]),
    endAmount: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    description: new FormControl(''),
  });;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'endAmount': [
      { type: 'required', message: 'endAmount is required.' },
    ],
  }

  constructor(private formBuilder: FormBuilder, private toastService: ToastService, private missionService: MissionService, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    let formValues = this.form.value;

    let mission: Mission = {
      name: formValues.name,
      endAmount: +formValues.endAmount,
      description: formValues.description,
      id: null,
      countersAmountTotal: null,
    };

    await this.missionService.createMission(mission);

    this.toastService.show('Successfully created!');

    this.router.navigate(['/missions']);
  }

}
