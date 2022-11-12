import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { ToastService } from "src/app/services/toast.service";
import { MissionServant } from "src/app/models/mission/mission.servant";
import { Mission } from "src/app/models/mission/mission";
import { MissionService } from "src/app/models/mission/mission.service";

@Component({
  selector: "app-update-mission",
  templateUrl: "./update-mission.page.html",
  styleUrls: ["./update-mission.page.scss"],
})
export class UpdateMissionPage implements OnInit {
  mission: Mission;

  form = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    endAmount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl(""),
  });

  validation_messages = {
    name: [{ type: "required", message: "Name is required." }],
    endAmount: [{ type: "required", message: "endAmount is required." }],
  };

  constructor(private missionService: MissionService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) {}

  ngOnInit() {
    this.form.reset();
    this.activatedRoute.params.subscribe((params) => {
      this.initialize(+params["id"]);
    });
  }

  async initialize(missionId: number) {
    this.mission = await this.missionService.getMissionById(missionId);
    this.form.patchValue(this.mission);
  }

  async submit() {
    this.patchMission();

    await this.missionService.updateMission(this.mission);

    this.toastService.showSuccessFullyUpdated();

    this.router.navigate(["/missions"]);
  }

  private patchMission() {
    let formValues = this.form.value;

    this.mission.name = formValues.name;
    this.mission.endAmount = +formValues.endAmount;
    this.mission.description = formValues.description;
  }
}
