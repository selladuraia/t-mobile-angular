import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  getAllBook$: Subscription;
  snackBar$: Subscription;

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.performSubscribtion();
  }

  performSubscribtion(): void {
    this.getAllBook$ = this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });
  }

  formatDate(date: void | string): string | undefined {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
    this.snackBar$ = this._snackbar
      .open('Added', 'Undo', {
        duration: 5000,
        panelClass: 'test-add-redo-action',
      })
      .onAction()
      .subscribe(() => {
        const item = { bookId: book.id, ...book };
        this.store.dispatch(removeFromReadingList({ item }));
      });
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.getAllBook$ ? this.getAllBook$.unsubscribe() : '';
    this.snackBar$ ? this.snackBar$.unsubscribe() : '';
  }
}