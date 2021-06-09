import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GatewayService {

	constructor(private __http: HttpClient) { }

	url = "http://localhost:3000/todos";

	getTasks(){
		return this.__http.get(this.url)
	}

	addTask(task: any){
		return this.__http.post(`${this.url}/`, task)
	}

	getTask(task: any){
		return this.__http.get(`${this.url}/${task.id}`)
	}

	updateTask(task: any){
		return this.__http.put(`${this.url}/${task.id}/`, task)
	}

	removeTask(task: any){
		return this.__http.delete(`${this.url}/${task.id}`)
	}
}
