import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription? : Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  // evento que genera salidas al presionar Enter
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  // evento que genera salidas después de ingresar texto en el cuadro
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    // almacena subscripción
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(3000))
      .subscribe(
        value => this.onDebounce.emit(value)
      );
  }

  ngOnDestroy(): void {
    // destruye subscripción
    this.debouncerSubscription?.unsubscribe();
  }

  // emisor de eventos después de presionar Enter para ingreso de texto
  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  // emisor de eventos después de ingresar texto
  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

}
