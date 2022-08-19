import {Component} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup} from '@angular/forms';

interface Bar {
  test: FormControl<string | null>;
}

interface Foo {
  foo: FormControl<string>;
  bar?: FormGroup<Bar>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly untypedFormGroup = new UntypedFormGroup({
    foo: new UntypedFormControl('foo'),
    bar: new FormGroup({
      test: new FormControl('bubu')
    })
  })

  readonly typedFormGroup = new FormGroup<Foo>({
    foo: new FormControl('foo2', {nonNullable: true}),
    bar: new FormGroup({
      test: new FormControl('bubu2')
    })
  })

  constructor() {
    console.log('untyped.test.value', (this.untypedFormGroup.controls['bar'] as FormGroup).controls['test'].value)
    console.log('typed.test.value', this.typedFormGroup.controls.bar?.controls.test.value);
    this.typedFormGroup.removeControl('bar');
    console.log('untyped.value', this.untypedFormGroup.value.bar?.test);
    console.log('typed.value', this.typedFormGroup.value.bar?.test);
  }
}
