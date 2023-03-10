import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actionRoutes, controllerRoutes } from '../constants/url.constants';
import { NoteDesign } from '../models/note-design.model';
import { NoteText } from '../models/note-text.model';
import { Note } from '../models/note.model';
import { BaseDataService } from './base.data.service';

@Injectable({ providedIn: 'root' })
export class NoteDataService extends BaseDataService {
  public constructor(protected readonly httpClient: HttpClient) {
    super(httpClient, controllerRoutes.note);
  }

  public getNote(noteID: number): Observable<Note> {
    return this.sendGetRequest({noteID}, actionRoutes.notesGet);
  }

  public updateNote(note: Note): Observable<Note> {
    console.log(note);
    return this.sendPostRequest(JSON.stringify(note), actionRoutes.noteUpdate);
  }

  public updateNoteText(noteText: NoteText): Observable<NoteText> {
    return this.sendPostRequest(JSON.stringify(noteText), actionRoutes.noteTextUpdate);
  }

  public deleteNote(noteID: number): Observable<any> {
    return this.sendPostRequest(noteID, actionRoutes.noteDelete);
  }

  public createNote(order: number): Observable<Note> {
    return this.sendPostRequest(order, actionRoutes.noteCreate);
  }

  public updateNoteDesign(
    noteDesign: NoteDesign,
    noteID: number
  ): Observable<NoteDesign> {
    return this.sendPostRequest(
      JSON.stringify({ ...noteDesign, noteID }),
      actionRoutes.noteDesignUpdate
    );
  }

  public getSharedUsersEmails(noteTextID: number): Observable<string[]> {
    return this.sendGetRequest(
      { noteTextID },
      actionRoutes.notesSharedUsersEmails
    );
  }

  shareNoteWithUser(email: string, noteTextID: number): Observable<any> {
    return this.sendPostRequest(
      JSON.stringify({ email, noteTextID}),
      actionRoutes.requestSharedNote
    );
  }

  acceptSharedNote(noteTextID: number, notificationID: number): Observable<any> {
    return this.sendPostRequest(
      JSON.stringify({ noteTextID, notificationID}),
      actionRoutes.acceptSharedNote
    );
  }

  declineSharedNote(noteTextID: number, notificationID: number): Observable<any> {
    return this.sendPostRequest(
      JSON.stringify({ noteTextID, notificationID}),
      actionRoutes.declineSharedNote
    );
  }

  deleteSharedUser(email: string, noteTextID: number): Observable<any> {
        return this.sendPostRequest(
      JSON.stringify({ email, noteTextID}),
      actionRoutes.notesDeleteSharedUser
    );
  }
}
