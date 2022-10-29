import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/models/Mission';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { MapperService } from 'src/app/services/mapper.service';
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


  constructor(private missionRepository: MissionRepository, private mapperService: MapperService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.form.reset();
    this.activatedRoute.params.subscribe(params => {
      this.missionId = +params.id;
    });

    this.missionRepository.getMissionById(this.missionId).then(mission => {
      if (!mission) {
        this.router.navigate(['/missions']);
      }
      this.missionDto = this.mapperService.mapDtoToMission(mission);
      this.form.patchValue(this.missionDto);
    });
  }

  async submit() {
    let formValues = this.form.value;

    let mission: Mission = {
      name: formValues.name,
      endAmount: +formValues.endAmount,
      description: formValues.description,
      id: this.missionId,
      countersAmountTotal: null,
    };

    await this.missionRepository.updateMission(mission);

    this.toastService.show('Successfully updated!');

    this.router.navigate(['/missions']);
  }
}
