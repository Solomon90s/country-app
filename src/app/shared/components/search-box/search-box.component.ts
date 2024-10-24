import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  // Aquí creamos el debouncer, el subject es un tipo especial de observable, es como si creamos un observable manualmente
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;


  @Input()
  /*
  ? Así usaríamos el property binding
  ? placeholder que es de tipo string es igual a un string vacío
  ? Y en el componente html lo llamamos así
  ? [placeholder]= la propiedad placeholder que tenemos creada aquí
  ? [placeholder]="placeholder"

  */
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
      console.log('emitiendo valor');
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }


  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }


}
