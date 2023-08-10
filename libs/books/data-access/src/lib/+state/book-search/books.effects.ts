import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Book } from '@tmo/shared/models';
import * as BooksActions from './books.actions';
import API from '../../constants';

@Injectable()
export class BooksEffects {
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      switchMap((action) =>
        this.http.get<Book[]>(`${API.searchQuery}${action.term}`).pipe(
          map((data) => BooksActions.searchBooksSuccess({ books: data })),
          catchError((error) => of(BooksActions.searchBooksFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
