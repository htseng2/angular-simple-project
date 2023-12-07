import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';
import { Observable, from, map } from 'rxjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const tasksRef = collection(db, 'tasks');
    return from(getDocs(tasksRef)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task))
      )
    );
  }

  deleteTask(task: Task): Observable<void> {
    const docRef = doc(db, 'tasks', task.id!);
    return from(deleteDoc(docRef));
  }

  updateTaskReminder(task: Task): Observable<void> {
    const docRef = doc(db, 'tasks', task.id!);
    return from(updateDoc(docRef, { reminder: task.reminder }));
  }

  addTask(task: Task): Observable<Task> {
    const tasksRef = collection(db, 'tasks');
    return from(addDoc(tasksRef, task)).pipe(
      map((docRef) => {
        return { ...task, id: docRef.id } as Task;
      })
    );
  }
}
