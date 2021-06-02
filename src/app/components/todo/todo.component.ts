import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { v4 as id } from 'uuid';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	constructor() { }

	// Mock Data
	todoList: any [] = [
		{
			id: id().slice(0, 3),
			title: "eat",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "drink",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "Chow",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "Sleep",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "Listen to music",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "Finish the food",
			complete: true
		},
		{
			id: id().slice(0, 3),
			title: "Excrete the food",
			complete: true
		}
	]

	todoForm: any = new FormGroup({
		title: new FormControl('')
	})

	ngOnInit(): void {}

	submit(){
		console.log(this.todoForm.value);
	}
}
