import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PersonalspacePage } from './personalspace.page';

describe('PersonalspacePage', () => {
  let component: PersonalspacePage;
  let fixture: ComponentFixture<PersonalspacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
