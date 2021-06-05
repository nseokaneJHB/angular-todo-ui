import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { v4 as id } from 'uuid';

import { GatewayService } from "../../services/gateway.service";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	constructor(private __gate: GatewayService, private __spin: NgxSpinnerService) { }

	// Mock Data
	todoList: any [] = []

	task = {
		id: 0, 
		title: "",
		complete: false
	}

	error: any ={}
	invalid: any = {}
	loading: boolean = true
	updating: boolean = false
	success: boolean = false
	duplicate: boolean = false

	todoForm: any = new FormGroup({
		title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
	})

	ngOnInit(): void {
		this.loadingData(2000);
	}

	loadingData(seconds: number){
		this.__spin.show();

		setTimeout(() => {
			this.loading = false;
			this.load();
			this.__spin.hide();
		}, seconds);
	}

	load(){
		this.__gate.getTasks().subscribe((res: any) => {
			if (res.length < 1 ) return
			this.todoList = res.reverse()
		}, (error: any) => {
			this.error = {
				message: error.message, status: error.statusText
			}
		})
	}

	submit(){
		this.loadingData(3000);

		let invalid = this.todoForm.controls.title.errors;
		let value = this.todoForm.value;

		if (invalid) {
			this.invalid = invalid;
			setTimeout(() => {
				this.invalid = {};
			}, 2000);
		}else{
			if (!this.updating) {
				let exists = this.todoList.filter((task) => task.title.toLowerCase() === this.todoForm.value.title.toLowerCase())

				if (exists.length > 0) {
					this.errorAlert();
				}else{
					this.__gate.addTask({...this.task, id: id().slice(0, 6), title: value.title}).subscribe(res => {
						this.successAlert();
					})
				}
			}else{
				this.updateTodo(this.todoForm.value);
				this.successAlert();
				this.updating = false;
			}
		}

		this.todoForm.setValue({ title: "" });
	}

	update(todo: any){
		this.updating = true;
		this.__gate.getTask(todo).subscribe(res => {
			this.todoForm.setValue({ title: todo.title });
			this.task = todo;
		})
	}

	updateTodo(title: any){
		this.task.title = title.title;
		this.__gate.updateTask(this.task).subscribe(res => {
			this.successAlert();
		})
	}

	complete(todo: any){
		todo = {...todo, complete: !todo.complete}
		this.__gate.updateTask(todo).subscribe(res => {
			this.successAlert();
		})
	}

	remove(todo: any){
		this.__gate.removeTask(todo).subscribe(res => {
			this.successAlert();
		})
	}

	successAlert(){
		this.success = true
		this.load();

		setTimeout(() => {
			this.success = false;
		}, 3000);
	}

	errorAlert(){
		this.duplicate = true
		this.todoForm.setValue({title: ""})
		this.load();

		setTimeout(() => {
			this.duplicate = false;
		}, 3000);
	}
}
