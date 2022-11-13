import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/services/toast.service";
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
    targetAmount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl(""),
  });

  validation_messages = {
    name: [{ type: "required", message: "Name is required." }],
    targetAmount: [{ type: "required", message: "targetAmount is required." }],
  };

  constructor(private formBuilder: FormBuilder, private toastService: ToastService, private missionService: MissionService, private router: Router) {}

  ngOnInit() {
    this.form.reset();
  }

  async submit() {
    let formValues = this.form.value;

    let mission = new Mission().init_insert(formValues.name, +formValues.targetAmount, formValues.description);

    this.missionService.insertMission(mission);

    this.toastService.showSuccessfullyCreated();

    this.router.navigate(["/missions"]);
  }
}
