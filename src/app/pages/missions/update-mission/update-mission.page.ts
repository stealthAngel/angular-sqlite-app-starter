import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { Mission } from "src/app/database/models/database-models";
import { MapperService } from "src/app/services/mapper.service";
import { ToastService } from "src/app/services/toast.service";
import { MissionGate } from "src/app/gate/mission.servant";
import { MissionClass } from "src/app/models/mission";

@Component({
  selector: "app-update-mission",
  templateUrl: "./update-mission.page.html",
  styleUrls: ["./update-mission.page.scss"],
})
export class UpdateMissionPage implements OnInit {
  missionId: number;
  mission: MissionClass;

  form = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    endAmount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl(""),
  });

  validation_messages = {
    name: [{ type: "required", message: "Name is required." }],
    endAmount: [{ type: "required", message: "endAmount is required." }],
  };

  constructor(private missionRepository: MissionRepository, private missionGate: MissionGate, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) {}

  ngOnInit() {
    this.form.reset();
    this.activatedRoute.params.subscribe((params) => {
      this.missionId = +params.id;
    });

    this.getMission();
  }

  async getMission() {
    var mission = await this.missionRepository.getMissionById(this.missionId);
    if (!mission) {
      this.router.navigate(["/missions"]);
    }
    this.mission = this.missionGate.toClass(mission);
    this.form.patchValue(this.mission);
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

    this.toastService.show("Successfully updated!");

    this.router.navigate(["/missions"]);
  }
}
