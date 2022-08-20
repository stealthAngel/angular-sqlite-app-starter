import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from 'src/app/models/Mission';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionService } from 'src/app/services/mission.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.page.html',
  styleUrls: ['./update-mission.page.scss'],
})
export class UpdateMissionPage implements OnInit {

  missionId: number;
  missionDto: MissionDto;

  form = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
    ]),
    endAmount: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
    description: new FormControl(''),
  });

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'endAmount': [
      { type: 'required', message: 'endAmount is required.' },
    ],
  }


  constructor(private missionService: MissionService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.missionId = +params.id;
    });

    this.missionService.getMissions()
      .subscribe(missions => {
        if (missions.length === 0) {
          this.router.navigate(['/missions']);
        }
        this.missionDto = missions.find(mission => mission.id == this.missionId);

        this.form.patchValue({
          name: this.missionDto.name,
          endAmount: this.missionDto.endAmount,
          description: this.missionDto.description,
        });
      });
  }

  async submit() {
    let formValues = this.form.value;

    let mission: MissionDto = {
      name: formValues.name,
      endAmount: +formValues.endAmount,
      description: formValues.description,
      id: this.missionId,
      countersAmountTotal: null,
    };

    await this.missionService.updateMission(mission);

    this.toastService.show('Successfully updated!');

    this.router.navigate(['/missions']);
  }
}
