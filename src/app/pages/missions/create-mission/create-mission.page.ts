import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { Mission_DB } from "src/app/database/models/database-models";
import { ToastService } from "src/app/services/toast.service";
import { MissionServant } from "src/app/models/mission/mission.servant";
import { MissionService } from "src/app/models/mission/mission.service";
import { Mission } from "src/app/models/mission/mission";

@Component({
  selector: "app-create-mission",
  templateUrl: "./create-mission.page.html",
  styleUrls: ["./create-mission.page.scss"],
})
export class CreateMissionPage implements OnInit {
  form = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    endAmount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl(""),
  });

  validation_messages = {
    name: [{ type: "required", message: "Name is required." }],
    endAmount: [{ type: "required", message: "endAmount is required." }],
  };

  constructor(private formBuilder: FormBuilder, private toastService: ToastService, private missionService: MissionService, private router: Router) {}

  ngOnInit() {
    this.form.reset();
  }

  async submit() {
    let formValues = this.form.value;

    let mission = new Mission();
    mission.name = formValues.name;
    mission.endAmount = +formValues.endAmount;
    mission.description = formValues.description;

    this.missionService.insertMission(mission);

    this.toastService.showSuccessfullyCreated();

    this.router.navigate(["/missions"]);
  }
}
